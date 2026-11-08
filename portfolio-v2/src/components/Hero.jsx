import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import ParticleField from './ParticleField'

const words = ['Software', 'Data', 'AI']
const stack = ['React', 'TypeScript', 'Python', 'FastAPI', 'Node.js', 'Kafka', 'PostgreSQL', 'Docker', 'AWS', 'LLMs', 'RAG', 'Multi-Agent']

// Each letter drifts away from the cursor, then springs back.
function Letter({ char, mx, my }) {
  const ref = useRef(null)
  const shift = (axis) => (m) => {
    const el = ref.current
    if (!el) return 0
    const r = el.getBoundingClientRect()
    const dx = r.left + r.width / 2 - m.x
    const dy = r.top + r.height / 2 - m.y
    const d = Math.hypot(dx, dy)
    if (d > 220) return 0
    const push = (1 - d / 220) * 40
    return ((axis === 'x' ? dx : dy) / (d || 1)) * push
  }
  const pos = useMotionValue({ x: -9999, y: -9999 })
  useEffect(() => mx.on('change', () => pos.set({ x: mx.get(), y: my.get() })), [mx, my, pos])
  const x = useSpring(useTransform(pos, shift('x')), { stiffness: 180, damping: 14 })
  const y = useSpring(useTransform(pos, shift('y')), { stiffness: 180, damping: 14 })
  return <motion.span ref={ref} style={{ x, y, display: 'inline-block' }}>{char}</motion.span>
}

export default function Hero() {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const spot = useTransform([sx, sy], ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(var(--accent-rgb),.10), transparent 60%)`)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200)
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => { clearInterval(t); window.removeEventListener('mousemove', move) }
  }, [mx, my])

  return (
    <section className="hero" ref={ref}>
      <ParticleField />
      <motion.div className="spotlight" style={{ background: spot }} aria-hidden="true" />
      <motion.div className="hero-inner" style={{ y, opacity }}>
        <h1 aria-label="Pranay Reddy">
          {['Pranay', 'Reddy.'].map((word, wi) => (
            <span className="mask" key={word} aria-hidden="true">
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2 + wi * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {[...word].map((c, ci) => <Letter key={ci} char={c} mx={mx} my={my} />)}
                {wi === 0 && ' '}
              </motion.span>
            </span>
          ))}
        </h1>
        <div className="role">
          <motion.span layout className="role-word">
            <AnimatePresence mode="wait">
              <motion.span
                key={i}
                initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.45 }}
              >
                {words[i]}
              </motion.span>
            </AnimatePresence>
          </motion.span>
          <motion.span layout>Engineer.</motion.span>
        </div>
        <p className="lead">Building scalable systems, robust data pipelines and intelligent AI.</p>
      </motion.div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...stack, ...stack].map((s, n) => <span key={n}>{s}<i>✦</i></span>)}
        </div>
      </div>
      <span className="scroll-hint">SCROLL ↓</span>
    </section>
  )
}
