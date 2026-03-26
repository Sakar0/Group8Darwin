import React from 'react';

const PERSONAS = [
  {
    id: 'young-person',
    icon: '🧑',
    title: 'Young Person',
    subtitle: 'Aged 10–17',
    desc: 'Know your rights, find support, and understand what happens if you get in trouble.',
    color: '#2b6cb0',
  },
  {
    id: 'parent',
    icon: '👨‍👩‍👦',
    title: 'Parent / Guardian',
    subtitle: 'Supporting your child',
    desc: 'How to help your child, navigate the justice system, and access legal support.',
    color: '#276749',
  },
  {
    id: 'worker',
    icon: '🤝',
    title: 'Community / Social Worker',
    subtitle: 'Professional resources',
    desc: 'Intervention programs, referral pathways, data, and tools for practitioners.',
    color: '#553c9a',
  },
  {
    id: 'researcher',
    icon: '📊',
    title: 'Researcher / Student',
    subtitle: 'Data & policy',
    desc: 'Australian statistics, academic resources, policy frameworks, and research links.',
    color: '#c53030',
  },
];

export default function LandingPage({ onSelectPersona }) {
  return (
    <div>
      <div className="landing-hero">
        <span className="hero-badge">🇦🇺 Australia</span>
        <h1>Youth Justice &amp; Crime<br />Information Hub</h1>
        <p className="hero-lead">
          A trusted, personalised resource on youth justice in Australia. Get information
          tailored to your role and needs.
        </p>

        <p className="persona-prompt">Who are you? Select your role to get started:</p>

        <div className="persona-grid">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              className="persona-card"
              style={{ '--card-color': p.color }}
              onClick={() => onSelectPersona(p.id)}
              aria-label={`I am a ${p.title}: ${p.desc}`}
            >
              <span className="card-icon" aria-hidden="true">{p.icon}</span>
              <div className="card-title">{p.title}</div>
              <div style={{ fontSize: '0.78rem', color: p.color, fontWeight: 600, marginBottom: 6 }}>
                {p.subtitle}
              </div>
              <div className="card-desc">{p.desc}</div>
              <div className="card-arrow">
                View my info <span aria-hidden="true">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="callout info" role="note">
          <span className="callout-icon" aria-hidden="true">ℹ️</span>
          <div>
            <strong>About this resource:</strong> This site provides general information about the
            Australian youth justice system. It is not legal advice. If you need legal help,
            contact a youth legal service in your state or territory.
          </div>
        </div>

        <div className="callout warning" style={{ marginTop: 12 }} role="note">
          <span className="callout-icon" aria-hidden="true">⚠️</span>
          <div>
            <strong>In an emergency</strong>, always call <strong>000</strong>.
            For crisis support, call Lifeline on <strong>13 11 14</strong> (24/7).
          </div>
        </div>
      </div>
    </div>
  );
}
