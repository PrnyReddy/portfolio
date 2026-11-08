import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GitHubCalendar from 'react-github-calendar'
import Hero from './components/Hero'
import { applyTheme, heatScale, themes } from './theme'
import { LeetCodeHeatmap } from './components/LeetCodeHeatmap'

gsap.registerPlugin(ScrollTrigger)

applyTheme('lime')
const heat = { light: heatScale(themes.lime.accent), dark: heatScale(themes.lime.accent) }

const EMAIL = 'prnyreddy@gmail.com' // single place to change the contact email


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
    desc: 'Multi-agent LLM orchestration that analyses course material, writes summaries and generates quizzes.',
    tech: ['Python', 'Multi-Agent Systems', 'Streamlit'],
    href: 'https://github.com/Prnyreddy/ai-summarizer',
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
  const hue = useTransform(scrollYProgress, [0, 1], ['hue-rotate(0deg)', 'hue-rotate(50deg)'])

  const trackRef = useRef(null)
  const pinRef = useRef(null)

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
      const mag = document.querySelector('.magnet')
      const onMove = (e) => {
        const r = mag.getBoundingClientRect()
        gsap.to(mag, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 })
      }
      const onLeave = () => gsap.to(mag, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' })
      mag.addEventListener('mousemove', onMove)
      mag.addEventListener('mouseleave', onLeave)
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
      <motion.div className="aurora" style={{ filter: hue }} aria-hidden="true"><span /><span /><span /></motion.div>
      <div className="grain" aria-hidden="true" />
      <motion.div className="progress" style={{ scaleX: progress }} />

      <nav className="nav">
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
              <p className="eyebrow">{p.type}</p>
              <h3>{p.title}</h3>
              <p className="desc">{p.desc}</p>
              <ul>{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              <a href={p.href} target="_blank" rel="noopener noreferrer">{p.cta} ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="skills">
        <h2>Stack</h2>
        <div className="skills-grid">
        {skills.map(([k, v]) => (
          <div className="skill-row" key={k}>
            <span>{k}</span>
            <p>{v}</p>
          </div>
        ))}
        </div>
      </section>

      <section id="activity" className="activity">
        <h2>Activity</h2>
        <div className="heat">
          <p className="eyebrow">GitHub</p>
          <GitHubCalendar username="prnyreddy" colorScheme="dark" blockSize={13} blockMargin={4} fontSize={12} theme={heat} />
        </div>
        <div className="heat leetcode-wrapper">
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
        <a className="magnet" href={`mailto:${EMAIL}`}>{EMAIL} <span>↗</span></a>
        <div className="links">
          <a href="https://github.com/Prnyreddy" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/prnyreddy" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>
    </>
  )
}
