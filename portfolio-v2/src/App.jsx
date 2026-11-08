import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GitHubCalendar from 'react-github-calendar'
import Hero from './components/Hero'
import ContactForm from './components/ContactForm'
import { applyPalette, heatScale, palette } from './theme'
import { LeetCodeHeatmap } from './components/LeetCodeHeatmap'

gsap.registerPlugin(ScrollTrigger)


applyPalette()
const heat = { light: heatScale(palette.accent), dark: heatScale(palette.accent) }

const projects = [
  {
    n: '01',
    hueVar: '--h1',
    title: 'Collaborative Whiteboard',
    type: 'Full-Stack Application',
    desc: 'Real-time collaborative whiteboard: multiple users draw and brainstorm together over socket communication.',
    tech: ['React', 'Node.js', 'Socket.io', 'Express'],
    href: 'https://board.prny.tech',
    cta: 'Live demo',
  },
  {
    n: '02',
    hueVar: '--h2',
    title: 'Multi-Agent Course Summarizer',
    type: 'AI & GenAI System',
    desc: 'Multi-agent LLM pipeline that turns YouTube videos or text into summaries, quizzes and glossaries, with model routing, retries and Redis caching.',
    tech: ['FastAPI', 'LangChain', 'Whisper', 'Redis', 'Streamlit'],
    href: 'https://github.com/Prnyreddy/ai-summarizer',
    cta: 'Source code',
  },
  {
    n: '03',
    hueVar: '--h1',
    title: 'Jupiter Router Explorer',
    type: 'Hackathon Project',
    desc: 'Visualizes and compares Jupiter token-swap routes on Solana, with route graphs, price impact and slippage details. Built for the Namaste Jupiverse hackathon.',
    tech: ['Next.js', 'ReactFlow', 'Solana Web3.js', 'Tailwind'],
    href: 'https://github.com/Prnyreddy/token_routes',
    cta: 'Source code',
  },
]

const skills = [
  ['Languages', 'JavaScript, TypeScript, Python, C++, SQL'],
  ['Frontend', 'React.js, Redux'],
  ['Backend', 'Node.js, Express.js, FastAPI, Kafka, REST, JWT'],
  ['AI & GenAI', 'LLMs, RAG, LangChain, AutoGen, Azure OpenAI, AWS Bedrock'],
  ['Data', 'PostgreSQL, Elasticsearch, Redis, Databricks'],
  ['DevOps', 'Docker, Kubernetes, Jenkins, AWS, GitHub Actions'],
]

export default function App() {


  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const hue = useTransform(scrollYProgress, [0, 1], ['hue-rotate(0deg)', 'hue-rotate(0deg)'])

  const trackRef = useRef(null)
  const pinRef = useRef(null)

  useEffect(() => {
    // specular highlight follows the pointer across any glass surface
    const onMove = (e) => {
      const el = e.target.closest?.('.glass')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      const track = trackRef.current
      // pinned horizontal scroll: move the track left by its overflow
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 0.6,
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      })
      gsap.to('.work-progress', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: pinRef.current, start: 'top top', end: () => '+=' + (track.scrollWidth - window.innerWidth), scrub: true },
      })
      gsap.utils.toArray('.project .num').forEach((n) =>
        gsap.to(n, { xPercent: -25, ease: 'none', scrollTrigger: { trigger: pinRef.current, scrub: true, start: 'top top', end: () => '+=' + (track.scrollWidth - window.innerWidth) } })
      )
      gsap.from('.skills h2, .activity h2', {
        yPercent: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.skills', start: 'top 80%' },
      })
      gsap.from('.heat', {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.activity', start: 'top 70%' },
      })
      gsap.from('.skill-row', {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills', start: 'top 75%' },
      })
      gsap.from('.contact h2 span', {
        yPercent: 110, stagger: 0.12, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.contact', start: 'top 70%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="lg" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <motion.div className="aurora" style={{ filter: hue }} aria-hidden="true"><span /><span /><span /></motion.div>
      <div className="grain" aria-hidden="true" />
      <motion.div className="progress" style={{ scaleX: progress }} />

      <nav className="nav glass glass-lens">
        <span>PR</span>
        <div>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#activity">Activity</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <Hero />

      <section id="work" className="pin" ref={pinRef}>
        <div className="work-progress" aria-hidden="true" />
        <div className="track" ref={trackRef}>
          <div className="panel intro">
            <h2>Selected<br />Work</h2>
            <p>Scroll →</p>
          </div>
          {projects.map((p) => (
            <article className="panel project" key={p.n} style={{ '--h': `var(${p.hueVar})` }}>
              <span className="num">{p.n}</span>
              <div className="project-card glass">
                <p className="eyebrow">{p.type}</p>
                <h3>{p.title}</h3>
                <p className="desc">{p.desc}</p>
                <ul>{p.tech.map((t) => <li key={t} className="glass-chip">{t}</li>)}</ul>
                <a className="glass-btn" href={p.href} target="_blank" rel="noopener noreferrer">{p.cta} ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="skills">
        <h2>Stack</h2>
        <div className="skills-grid">
        {skills.map(([k, v]) => (
          <div className="skill-row glass" key={k}>
            <span>{k}</span>
            <p>{v}</p>
          </div>
        ))}
        </div>
      </section>

      <section id="activity" className="activity">
        <h2>Activity</h2>
        <div className="heat glass">
          <p className="eyebrow">GitHub</p>
          <GitHubCalendar username="prnyreddy" colorScheme="dark" blockSize={13} blockMargin={4} fontSize={12} theme={heat} />
        </div>
        <div className="heat glass leetcode-wrapper">
          <p className="eyebrow">LeetCode</p>
          <LeetCodeHeatmap username="prnyreddy" blockSize={13} blockMargin={4} fontSize={12} theme={heat} />
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="big-marquee" aria-hidden="true">
          <div>{Array.from({ length: 8 }, (_, n) => <span key={n}>Open to work ✦ </span>)}</div>
        </div>
        <h2>
          <span className="mask"><span>Let&apos;s build</span></span>
          <span className="mask"><span style={{ color: 'var(--accent)' }}>something.</span></span>
        </h2>
        <ContactForm />
        <div className="links">
          <a href="https://github.com/Prnyreddy" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/prnyreddy" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>
    </>
  )
}
