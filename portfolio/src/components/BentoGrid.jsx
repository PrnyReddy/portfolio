import React from 'react';
import { BentoCard } from './BentoCard';
import { MapPin, Terminal, Code2, LineChart } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';
import { LeetCodeHeatmap } from './LeetCodeHeatmap';

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
                Bridging the gap between software, data, and AI.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '90%' }}>
                A versatile engineer dedicated to building scalable backend systems, deploying data-intensive pipelines, and integrating state-of-the-art LLMs into production.
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Card 2: Tech Stack / Terminal Window (2x2) */}
        <BentoCard colSpan={2} rowSpan={2} delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <Terminal size={16} color="var(--text-muted)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>pranay@build ~ % cat skills.json</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: '110px' }}>Languages:</span>
                <span style={{ color: 'var(--text-main)' }}>JavaScript, TypeScript, Python, C++, SQL, HTML/CSS</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: '110px' }}>Frontend:</span>
                <span style={{ color: 'var(--text-main)' }}>React.js, Redux</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: '110px' }}>Backend:</span>
                <span style={{ color: 'var(--text-main)' }}>Node.js, Express.js, FastAPI, Apache Kafka, REST APIs, JWT</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: '110px' }}>AI & GenAI:</span>
                <span style={{ color: 'var(--text-main)' }}>LLMs, AutoGen, RAG, LangChain, Azure OpenAI, AWS Bedrock, Vector Search, Multi-Agent Orchestration</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: '110px' }}>Databases:</span>
                <span style={{ color: 'var(--text-main)' }}>PostgreSQL, Elasticsearch, Redis, SQL Server, Databricks</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: '110px' }}>DevOps/Tools:</span>
                <span style={{ color: 'var(--text-main)' }}>Docker, Kubernetes, Jenkins, AWS, Git, GitHub Actions</span>
              </div>

            </div>
          </div>
        </BentoCard>

        {/* Card 3: Location (2x1) */}
        <BentoCard colSpan={2} rowSpan={1} delay={0.3}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <MapPin size={32} strokeWidth={1} color="var(--text-main)" />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>HOMEBASE</p>
              <p style={{ fontWeight: 500 }}>India / Remote</p>
            </div>
          </div>
        </BentoCard>

        {/* Card 4: Quick Overview Stats (2x1) */}
        <BentoCard colSpan={2} rowSpan={1} delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <LineChart size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>5+</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Major Systems Shipped</p>
          </div>
        </BentoCard>

        {/* Card 5: Full Width GitHub Heatmap (4x1) */}
        <BentoCard colSpan={4} rowSpan={1} delay={0.5}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', padding: '1rem 0' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              GITHUB
            </p>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
               <GitHubCalendar 
                username="prnyreddy" 
                colorScheme="dark" 
                blockSize={14}
                blockMargin={5}
                fontSize={12}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                }}
              />
            </div>
          </div>
        </BentoCard>

        {/* Card 6: Full Width LeetCode Heatmap (4x1) */}
        <BentoCard colSpan={4} rowSpan={1} delay={0.6}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={16} />LEETCODE
            </p>
            <div className="leetcode-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <LeetCodeHeatmap 
                username="prnyreddy" 
                blockSize={14}
                blockMargin={5}
                fontSize={12}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                }}
              />
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
};
