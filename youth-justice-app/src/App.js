import React, { useState } from 'react';
import LandingPage from './LandingPage';
import YoungPersonPage from './YoungPersonPage';
import ParentPage from './ParentPage';
import WorkerPage from './WorkerPage';
import ResearcherPage from './ResearcherPage';

const PERSONA_META = {
  'young-person': {
    label: 'Young Person (10–17)',
    icon: '🧑',
    color: '#2b6cb0',
  },
  parent: {
    label: 'Parent / Guardian',
    icon: '👨‍👩‍👦',
    color: '#276749',
  },
  worker: {
    label: 'Community / Social Worker',
    icon: '🤝',
    color: '#553c9a',
  },
  researcher: {
    label: 'Researcher / Student',
    icon: '📊',
    color: '#c53030',
  },
};

function Header({ persona, onChangePersona }) {
  return (
    <header className="site-header" role="banner">
      <div className="header-brand">
        <span className="header-logo" aria-hidden="true">⚖️</span>
        <div>
          <div className="header-title">Youth Justice Australia</div>
          <div className="header-subtitle">Information &amp; Support Resource</div>
        </div>
      </div>
      <nav className="header-nav" aria-label="Site navigation">
        {persona && (
          <>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span aria-hidden="true">{PERSONA_META[persona]?.icon}</span>
              {PERSONA_META[persona]?.label}
            </span>
            <button className="nav-btn change-persona" onClick={onChangePersona} aria-label="Change your persona">
              Change role
            </button>
          </>
        )}
        {!persona && (
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
            Select your role to begin
          </span>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <strong>Youth Justice &amp; Crime — Information Hub</strong>
      <br />
      Created for educational purposes. Not legal advice.
      For legal advice, contact Legal Aid in your state or territory.
      <br />
      <strong>Emergency: 000 &nbsp;|&nbsp; Kids Helpline: 1800 55 1800 &nbsp;|&nbsp; Lifeline: 13 11 14</strong>
      <div className="footer-group">
        Group 8 Darwin — University Assignment | Team: Sakar (Project Coordinator) &bull;
        Samir (Research &amp; Backend Lead) &bull; Aryan (UI/UX Designer) &bull; Rohan (Technical Lead)
      </div>
    </footer>
  );
}

export default function App() {
  const [persona, setPersona] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <div className="emergency-banner" role="note" aria-label="Emergency contacts">
        <strong>Emergency: call 000</strong> &nbsp;|&nbsp;
        Kids Helpline: <a href="tel:1800551800">1800 55 1800</a> &nbsp;|&nbsp;
        Lifeline: <a href="tel:131114">13 11 14</a>
      </div>

      <Header persona={persona} onChangePersona={() => setPersona(null)} />

      <main id="main-content" style={{ flex: 1 }}>
        {!persona ? (
          <LandingPage onSelectPersona={setPersona} />
        ) : (
          <div className="main-content">
            {persona === 'young-person' && <YoungPersonPage />}
            {persona === 'parent' && <ParentPage />}
            {persona === 'worker' && <WorkerPage />}
            {persona === 'researcher' && <ResearcherPage />}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
