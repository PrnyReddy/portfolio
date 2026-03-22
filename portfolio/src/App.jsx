import React from 'react';
import { BentoGrid } from './components/BentoGrid';
import { ProjectsStack } from './components/ProjectsStack';
import './index.css';

function App() {
  return (
    <>
      <div className="bg-mesh"></div>
      
      <main style={{ padding: '5vh 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '10vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <div style={{ width: '12px', height: '12px', background: '#fff', borderRadius: '2px' }}></div>
             Pranay Reddy
          </div>
          <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <a href="#about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>ABOUT</a>
            <a href="#projects" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>PROJECTS</a>
            <a href="#contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>CONTACT</a>
          </nav>
        </header>

        <section style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '10vh' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1, maxWidth: '1000px' }}>
            Software Engineer.<br/>AI & Backend Systems.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '2rem', maxWidth: '600px', lineHeight: 1.6 }}>
            I build scalable digital products, specializing in API development, workflow automation, and clean frontend architecture.
          </p>
        </section>

        <BentoGrid />
        <ProjectsStack />
        
        <footer id="contact" style={{ padding: '10vh 0', borderTop: '1px solid var(--border)', marginTop: '5vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            © 2025 PRANAY REDDY. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
             <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>GITHUB</a>
             <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>LINKEDIN</a>
             <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>EMAIL</a>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
