import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Collaborative Whiteboard",
    type: "Full-Stack Application",
    desc: "A real-time collaborative whiteboard application allowing multiple users to draw, brainstorm, and interact simultaneously using socket communication and dynamic UI components.",
    tech: ["React", "Node.js", "Socket.io", "Express"],
    status: "LIVE",
    link: "https://board.prny.tech"
  },
  {
    title: "Multi-Agent Course Summarizer",
    type: "AI & GenAI System",
    desc: "An advanced multi-agent orchestration system that leverages LLMs to autonomously analyze extensive course materials, synthesize comprehensive summaries, and generate interactive quizzes.",
    tech: ["Python", "Multi-Agent Systems", "Streamlit"],
    status: "OPEN SOURCE",
    github: "https://github.com/Prnyreddy/ai-summarizer"
  }
];

const ProjectCard = ({ project, index, totalProjects }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ 
        position: 'sticky', 
        top: `calc(15vh + ${index * 30}px)`, 
        marginBottom: index === totalProjects - 1 ? '10vh' : '50vh', 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        scale,
        opacity
      }}
    >
      <div 
        className="glass-panel"
        style={{ 
          width: '100%', 
          maxWidth: '1000px', 
          backgroundColor: '#050505', 
          border: '1px solid var(--border)', 
          borderRadius: '24px', 
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          boxShadow: '0 -20px 40px rgba(0,0,0,0.8)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Real Content (Removed Classified Blur) */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>
                0{index + 1} / {project.type}
              </span>
              <h3 style={{ fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
                {project.title}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '80%', lineHeight: 1.6 }}>
            {project.desc}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {project.tech.map(t => (
              <span key={t} style={{ padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'var(--surface-hover)', border: '1px solid var(--border)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                {t}
              </span>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '8px', backgroundColor: 'var(--text-main)', color: 'var(--bg-color)', textDecoration: 'none', fontWeight: 600, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '8px', backgroundColor: 'var(--surface-hover)', color: 'var(--text-main)', border: '1px solid var(--border)', textDecoration: 'none', fontWeight: 600, transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}>
                <Github size={18} />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsStack = () => {
  return (
    <section id="projects" style={{ padding: '10vh 0' }}>
      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
          Selected Works
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
          Recent projects focusing on full-stack development and AI.
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} totalProjects={projects.length} />
        ))}
      </div>
    </section>
  );
};
