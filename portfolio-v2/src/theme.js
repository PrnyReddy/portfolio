// Monochrome with a tiny red pop. accent = white used for buttons/headings/heatmaps; pop = red used only for small details.
export const palette = { accent: '#f4f1ea', pop: '#ff3b3b', g1: '#3f3f46', g2: '#a1a1aa', g3: '#27272a', h1: 0, h2: 0, sat: '0%' }

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, t) => '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('')

export const heatScale = (accent) => {
  const a = hex(accent), base = [22, 22, 22]
  return [0, 0.25, 0.5, 0.75, 1].map((t) => mix(base, a, t))
}

export const applyPalette = () => {
  const t = palette
  const r = document.documentElement.style
  r.setProperty('--accent', t.accent)
  r.setProperty('--accent-rgb', hex(t.accent).join(','))
  r.setProperty('--g1', t.g1); r.setProperty('--g2', t.g2); r.setProperty('--g3', t.g3)
  r.setProperty('--pop', t.pop); r.setProperty('--pop-rgb', hex(t.pop).join(',')); r.setProperty('--sat', t.sat)
  r.setProperty('--h1', t.h1); r.setProperty('--h2', t.h2)
}
