import { useState } from 'react'

const KEY = import.meta.env.VITE_WEB3FORMS_KEY // public by design; Web3Forms restricts it to your email
const EMAIL = 'prnyreddy@gmail.com'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('botcheck')) return // honeypot: bots fill the hidden field

    if (!KEY) {
      // no key configured: fall back to the visitor's mail app
      const body = `${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio message from ' + f.get('name'))}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: KEY,
          subject: `Portfolio message from ${f.get('name')}`,
          from_name: 'prny.tech',
          name: f.get('name'),
          email: f.get('email'),
          message: f.get('message'),
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      e.currentTarget.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        <span>Name</span>
        <input name="name" required maxLength={80} autoComplete="name" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required maxLength={120} autoComplete="email" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" required rows={5} maxLength={2000} />
      </label>
      <input name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      <button type="submit" className="interactive glass-btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message ↗'}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status === 'sent' && 'Thanks! Your message is on its way.'}
        {status === 'error' && `Something went wrong. Please email ${EMAIL} directly.`}
      </p>
    </form>
  )
}
