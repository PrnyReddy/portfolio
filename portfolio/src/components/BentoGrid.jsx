import React from 'react';
import { BentoCard } from './BentoCard';
import { MapPin, Terminal, Code2, LineChart } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

export const BentoGrid = () => {
  return (
    <section id="about" style={{ padding: '5vh 0', marginBottom: '10vh' }}>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: 'minmax(250px, auto)',
          gap: '1.5rem',
        }}
      >
        {/* Card 1: Main Identity (2x2) */}
        <BentoCard colSpan={2} rowSpan={2} delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1rem' }}>
                Bridging complex logic and seamless design.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '85%' }}>
                I am a Software Engineer focused on building robust backend systems, integrating practical AI tools, and delivering clean, responsive frontend applications that prioritize user experience.
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Card 2: Tech Stack / Terminal Window (2x1) */}
        <BentoCard colSpan={2} rowSpan={1} delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <Terminal size={16} color="var(--text-muted)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>pranay@build ~ % skills.sh</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignContent: 'flex-start' }}>
              {['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Docker', 'AWS', 'Redis'].map(skill => (
                <span key={skill} style={{ padding: '0.4rem 0.8rem', background: 'var(--surface-hover)', borderRadius: '6px', fontSize: '0.9rem', border: '1px solid var(--border)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Card 3: Location (1x1) */}
        <BentoCard colSpan={1} rowSpan={1} delay={0.3}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <MapPin size={48} strokeWidth={1} color="var(--text-main)" />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>HOMEBASE</p>
              <p style={{ fontWeight: 500 }}>India / Remote</p>
            </div>
          </div>
        </BentoCard>

        {/* Card 4: Quick Overview Stats (1x1) */}
        <BentoCard colSpan={1} rowSpan={1} delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <LineChart size={32} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <p style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>5+</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Major Systems Shipped</p>
          </div>
        </BentoCard>

        {/* Card 5: Full Width GitHub Heatmap (4x1) */}
        <BentoCard colSpan={4} rowSpan={1} delay={0.5}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', padding: '1rem 0' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              OPEN SOURCE REPOSITORY / GITHUB
            </p>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
               <GitHubCalendar 
                username="prnyreddy" 
                colorScheme="dark" 
                blockSize={14}
                blockMargin={5}
                fontSize={12}
                theme={{
                  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  dark: ['#ffffff0a', '#ffffff20', '#ffffff40', '#ffffff80', '#ffffff']
                }}
              />
            </div>
          </div>
        </BentoCard>

        {/* Card 6: Full Width LeetCode Heatmap (4x1) */}
        <BentoCard colSpan={4} rowSpan={1} delay={0.6}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={16} /> ALGORITHMIC PROBLEM SOLVING / LEETCODE
            </p>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {/* LeetCode SVG Widget - Dark Theme + Heatmap + Inter Font for premium match */}
              <img 
                src="https://leetcard.jacoblin.cool/prnyreddy?theme=dark&font=Inter&ext=heatmap" 
                alt="LeetCode Stats & Heatmap" 
                style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px', opacity: 0.9 }} 
              />
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
};
