import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "CareerKineo",
    type: "AI Optimization Platform",
    desc: "A specialized resume optimization engine powered by Gemini AI. Full-stack implementation featuring scalable backend processing and seamless user workflows.",
    tech: ["React", "FastAPI", "Gemini AI", "TailwindCSS"],
    link: "#"
  },
  {
    title: "Research Agent",
    type: "Autonomous Workflow",
    desc: "Multi-step reasoning agents built with LangChain and Python to synthesize complex technical documents autonomously.",
    tech: ["Python", "LangChain", "OpenAI", "Docker"],
    link: "#"
  },
  {
    title: "Live Whiteboard",
    type: "Real-time Collaboration",
    desc: "A distributed drawing engine utilizing WebSockets for zero-latency collaboration across multiple concurrent sessions.",
    tech: ["TypeScript", "React", "WebSockets", "Node.js"],
    link: "https://board.prnyreddy.tech"
  }
];

export const ProjectsStack = () => {
  return (
    <section id="projects" style={{ padding: '10vh 0' }}>
      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
          Projects
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
          Recent work and personal applications.
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        {projects.map((project, index) => {
          return (
            <div 
              key={index} 
              style={{ 
                position: 'sticky', 
                top: `calc(15vh + ${index * 40}px)`, 
                marginBottom: index === projects.length - 1 ? '10vh' : '50vh', 
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div 
                className="glass-panel"
                style={{ 
                  width: '100%', 
                  maxWidth: '1000px', 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid var(--border)', 
                  borderRadius: '24px', 
                  padding: '4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  boxShadow: '0 -20px 40px rgba(0,0,0,0.5)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>
                      0{index + 1} / {project.type}
                    </span>
                    <h3 style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
                      {project.title}
                    </h3>
                  </div>
                  <a href={project.link} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', transition: 'background 0.2s' }}>
                    <ArrowUpRight size={24} />
                  </a>
                </div>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '80%', lineHeight: 1.6 }}>
                  {project.desc}
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{ padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'var(--surface-hover)', border: '1px solid var(--border)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
