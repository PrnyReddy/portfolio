import React, { useState, useEffect } from 'react';
import { BentoGrid } from './components/BentoGrid';
import { ProjectsStack } from './components/ProjectsStack';
import { CustomCursor } from './components/CustomCursor';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';
import './index.css';

const PREFIXES = [
  "Software",
  "Data",
  "AI"
];

function App() {
  const [prefixIndex, setPrefixIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrefixIndex((prev) => (prev + 1) % PREFIXES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <CustomCursor />
      <div className="bg-mesh"></div>
      
      <main style={{ padding: '5vh 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '10vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="interactive" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-main)' }}>
             <Code2 size={28} aria-label="Home" />
          </div>
          <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <a href="#about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>ABOUT</a>
            <a href="#projects" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>PROJECTS</a>
            <a href="#contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>CONTACT</a>
          </nav>
        </header>

        <section style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '10vh' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1, maxWidth: '1000px', marginBottom: '1rem' }}>
            Pranay Reddy.
          </h1>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1, maxWidth: '1000px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '1.2em', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={prefixIndex}
                  className="text-gradient"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'nowrap' }}
                >
                  {PREFIXES[prefixIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="text-gradient">Engineer.</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '2rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Building scalable software architectures, robust data pipelines, and intelligent AI systems.
          </p>
          <div className="hero-cta" style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
             <a href="https://github.com/Prnyreddy" target="_blank" rel="noopener noreferrer" className="interactive btn-primary" style={{ padding: '0.8rem 2rem', background: 'var(--text-main)', color: 'var(--bg-color)', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, transition: 'transform 0.2s' }}>GitHub</a>
             <a href="https://linkedin.com/in/prnyreddy" target="_blank" rel="noopener noreferrer" className="interactive btn-secondary" style={{ padding: '0.8rem 2rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, transition: 'background 0.2s' }}>LinkedIn</a>
             <a href="mailto:prnyreddy@gmail.com" className="interactive btn-secondary" style={{ padding: '0.8rem 2rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, transition: 'background 0.2s' }}>Email</a>
          </div>
        </section>

        <BentoGrid />
        <ProjectsStack />
        
        <section id="contact" style={{ padding: '10vh 0', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1rem' }}>GET IN TOUCH</p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Let&apos;s build something.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
            Open to software, data and AI engineering opportunities and interesting collaborations.
          </p>
          <a href="mailto:prnyreddy@gmail.com" className="interactive btn-primary" style={{ display: 'inline-block', padding: '0.9rem 2.4rem', background: 'var(--text-main)', color: 'var(--bg-color)', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, transition: 'transform 0.2s' }}>Say hello</a>
        </section>

        <footer className="site-footer" style={{ padding: '5vh 0', borderTop: '1px solid var(--border)', marginTop: '5vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} PRANAY REDDY. ALL RIGHTS RESERVED.
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '2rem' }}>
             <a href="https://github.com/Prnyreddy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>GITHUB</a>
             <a href="https://linkedin.com/in/pranay-reddy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>LINKEDIN</a>
             <a href="mailto:hello@prny.tech" style={{ color: 'var(--text-main)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>EMAIL</a>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
