import { useEffect, useRef } from 'react'

// Constellation of drifting dots; links form between neighbours and the cursor pulls them in.
export default function ParticleField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let w, h, dpr, parts, raf
    const pop = getComputedStyle(document.documentElement).getPropertyValue('--pop-rgb') || '255,59,59'
    let rgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb') || '244,241,234'

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(110, Math.floor((w * h) / 14000))
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        const dx = mouse.x - p.x, dy = mouse.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < 180 && d > 1) { p.vx += (dx / d) * 0.012; p.vy += (dy / d) * 0.012 }
        p.vx *= 0.99; p.vy *= 0.99
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(244,241,234,.7)'
        ctx.fill()
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j]
          const l = Math.hypot(p.x - q.x, p.y - q.y)
          if (l < 120) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - l / 120) * 0.35})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        if (d < 160) {
          ctx.strokeStyle = `rgba(${pop},${(1 - d / 160) * 0.8})`
          ctx.lineWidth = 0.8
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const leave = () => { mouse.x = mouse.y = -9999 }

    init(); draw()
    window.addEventListener('resize', init)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseout', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', init)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseout', leave)
    }
  }, [])

  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
