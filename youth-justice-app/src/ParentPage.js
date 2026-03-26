import React, { useState } from 'react';

function Accordion({ question, children }) {
  const [open, setOpen] = useState(false);
  const id = question.replace(/\s+/g, '-').toLowerCase().slice(0, 30);

  return (
    <div className="accordion">
      <button
        className="accordion-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`pacc-${id}`}
      >
        {question}
        <span className="accordion-icon" aria-hidden="true">▼</span>
      </button>
      {open && (
        <div className="accordion-body" id={`pacc-${id}`} role="region">
          {children}
        </div>
      )}
    </div>
  );
}

const TABS = [
  { id: 'support', label: '💙 Supporting Your Child' },
  { id: 'system', label: '⚖️ The Justice System' },
  { id: 'legal', label: '📋 Legal Processes' },
  { id: 'help', label: '🤝 Getting Help' },
];

export default function ParentPage() {
  const [activeTab, setActiveTab] = useState('support');

  return (
    <div className="content-page">
      <div className="content-hero" style={{ background: 'linear-gradient(135deg, #1c4532, #276749)' }}>
        <span className="hero-icon" aria-hidden="true">👨‍👩‍👦</span>
        <h1>Supporting Your Child</h1>
        <p>
          If your child is involved with the justice system, it can be overwhelming and frightening.
          You are not alone — and your support makes a real difference.
        </p>
      </div>

      <div className="callout warning" role="note">
        <span className="callout-icon" aria-hidden="true">📞</span>
        <div>
          <strong>Immediate help:</strong> If your child has been arrested or is in custody,
          contact Legal Aid in your state immediately. Most have 24-hour emergency lines.
          Do not let your child speak to police without a lawyer present.
        </div>
      </div>

      <div className="tabs-container" style={{ '--tab-color': '#276749', marginTop: 24 }}>
        <div className="tabs-list" role="tablist" aria-label="Parent and guardian sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              className={`tab-btn${activeTab === t.id ? ' active' : ''}`}
              aria-selected={activeTab === t.id}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel" aria-label={TABS.find(t => t.id === activeTab)?.label}>
        {activeTab === 'support' && <SupportTab />}
        {activeTab === 'system' && <SystemTab />}
        {activeTab === 'legal' && <LegalTab />}
        {activeTab === 'help' && <HelpTab />}
      </div>
    </div>
  );
}

function SupportTab() {
  return (
    <div>
      <h2 className="section-heading">How to Support Your Child</h2>

      <div className="section-grid">
        <div className="info-card">
          <h3>💬 Keep Communication Open</h3>
          <p>
            Even when you are angry, frightened, or disappointed — your child needs to know
            you still love them. Young people who feel supported by their parents are significantly
            less likely to reoffend.
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>Listen without immediately judging</li>
            <li>Ask open questions: "What happened? How are you feeling?"</li>
            <li>Avoid blaming or shaming in public</li>
            <li>Acknowledge their feelings before your own</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🏠 Stability at Home</h3>
          <p>
            A stable, safe home environment is one of the strongest protective factors against
            ongoing youth crime. This means:
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>Clear, consistent household rules and expectations</li>
            <li>Positive routines (meals together, regular sleep)</li>
            <li>Reduced exposure to other people in trouble</li>
            <li>Removing access to alcohol, drugs, or weapons</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>📚 School and Engagement</h3>
          <p>
            Keeping your child connected to education significantly reduces reoffending risk.
            If your child has been excluded or is not attending, contact:
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>The school principal or welfare coordinator</li>
            <li>Your state's Education Department inclusion team</li>
            <li>TAFE for flexible pathway options for older teens</li>
            <li>Youth workers who can support school re-engagement</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🧠 Mental Health Matters</h3>
          <p>
            Many young people in the justice system have experienced trauma, depression, anxiety,
            or substance use issues. Getting professional support is critical — not a sign of failure.
          </p>
          <p style={{ marginTop: 10 }}>
            Talk to your GP about a Mental Health Care Plan (up to 20 subsidised sessions).
            headspace (12–25 years) offers free or low-cost support nationwide.
          </p>
        </div>
      </div>

      <div className="callout success" style={{ marginTop: 8 }}>
        <span className="callout-icon" aria-hidden="true">💚</span>
        <div>
          <strong>Look after yourself too.</strong> Parenting a child in the justice system
          is incredibly stressful. Parenting helplines, peer support groups, and counselling
          are available for you — not just your child.
          Call <strong>Parentline: 1300 30 1300</strong>
        </div>
      </div>

      <h2 className="section-heading" style={{ marginTop: 28 }}>Common Parenting Concerns</h2>

      <Accordion question="My child won't talk to me. What can I do?">
        <p>
          This is very common. Avoid interrogating — try side-by-side activities (driving, cooking,
          walking) where conversation feels less confrontational. A family counsellor or youth worker
          can sometimes bridge the gap. Keep saying "I love you and I'm here" even when they push back.
        </p>
      </Accordion>

      <Accordion question="Should I let my child face consequences or protect them?">
        <p>
          There's a balance. Natural and legal consequences can be part of learning, but make sure:
        </p>
        <ul>
          <li>Your child has proper legal representation</li>
          <li>You understand what penalties they face</li>
          <li>You advocate for diversion or rehabilitation options</li>
          <li>You don't abandon them in the process</li>
        </ul>
        <p>
          Supporting your child through legal processes is different from protecting them from
          all consequences.
        </p>
      </Accordion>

      <Accordion question="My child is using drugs or alcohol. What do I do?">
        <p>
          Substance use among young people is often connected to underlying issues like trauma or
          mental health. Rather than punishment alone, seek professional help:
        </p>
        <ul>
          <li>Family Drug Support: <strong>1300 368 186</strong></li>
          <li>ADIS (Alcohol and Drug Information Service) in your state</li>
          <li>headspace for co-occurring mental health support</li>
          <li>Your GP for referral to youth-appropriate treatment</li>
        </ul>
      </Accordion>

      <Accordion question="I'm worried about my child's safety at home or online">
        <p>
          If you believe your child is in danger — from gangs, exploitation, or online predators —
          contact police (000 for immediate danger) or the Child Protection Helpline in your state.
          Youth-specific services like Bravehearts (sexual abuse: 1800 272 831) and ReachOut
          (reachout.com) can help.
        </p>
      </Accordion>
    </div>
  );
}

function SystemTab() {
  return (
    <div>
      <h2 className="section-heading">Understanding the Australian Youth Justice System</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">🏛️</span>
        <div>
          Youth justice in Australia is mainly a <strong>state and territory responsibility</strong>.
          The system varies between states, but all share the same core principle: young people
          should be rehabilitated, not just punished.
        </div>
      </div>

      <div className="section-grid" style={{ marginTop: 20 }}>
        <div className="info-card">
          <h3>📅 Age Thresholds</h3>
          <ul>
            <li><strong>Under 10:</strong> No criminal responsibility (all states)</li>
            <li><strong>10–13:</strong> Presumed not criminally responsible (doli incapax) unless proven otherwise</li>
            <li><strong>14–17:</strong> Dealt with in Children's/Youth Courts</li>
            <li><strong>18+:</strong> Adult criminal justice system</li>
          </ul>
          <div className="callout info" style={{ marginTop: 12 }}>
            <span className="callout-icon" aria-hidden="true">📢</span>
            <div>ACT and Victoria have raised the minimum age to 14. Queensland, NSW, WA and SA are considering changes.</div>
          </div>
        </div>

        <div className="info-card">
          <h3>🔄 Diversion First</h3>
          <p>Most cases involving young people never reach a formal court hearing. Police and prosecutors have many diversion options:</p>
          <ul style={{ marginTop: 10 }}>
            <li><strong>Police caution</strong> — verbal or written warning</li>
            <li><strong>Youth justice caution</strong> — formal, structured caution</li>
            <li><strong>Youth justice conference</strong> — restorative process involving victim and family</li>
            <li><strong>Community-based programs</strong> — specific to the offence</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>⚖️ Children's / Youth Court</h3>
          <p>
            These specialised courts are closed to the public. Judges or magistrates trained in
            youth justice preside. Your child has the right to a lawyer. The court considers:
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>The young person's background and circumstances</li>
            <li>Impact on any victim</li>
            <li>What is most likely to prevent reoffending</li>
            <li>Community safety</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>📂 Records and Confidentiality</h3>
          <p>
            Youth court proceedings are generally confidential. Your child's name cannot be
            published in the media. Records may be spent (wiped) after a period of good behaviour —
            typically 3–5 years for minor offences.
          </p>
          <p style={{ marginTop: 10 }}>
            Serious offences may result in permanent criminal records. Ask your lawyer about
            your child's specific situation.
          </p>
        </div>
      </div>

      <h2 className="section-heading" style={{ marginTop: 28 }}>Custody and Detention</h2>

      <div className="section-grid">
        <div className="info-card">
          <h3>🔐 Remand vs. Sentenced Detention</h3>
          <p>
            Your child may be held on <strong>remand</strong> (while waiting for their case to
            be heard) or as a <strong>sentence</strong> after conviction. Remand should only be used
            when bail is refused for specific legal reasons.
          </p>
          <p style={{ marginTop: 10 }}>
            Concerningly, many young people on remand are never ultimately sentenced to detention —
            meaning they were held unnecessarily.
          </p>
        </div>

        <div className="info-card">
          <h3>👋 Your Rights as a Parent in Detention</h3>
          <ul>
            <li>You should be informed promptly when your child is in custody</li>
            <li>You have the right to visit (within facility rules)</li>
            <li>You can contact the facility's case manager about your child's welfare</li>
            <li>You can raise complaints with the state Ombudsman</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function LegalTab() {
  return (
    <div>
      <h2 className="section-heading">Navigating Legal Processes</h2>

      <div className="callout danger">
        <span className="callout-icon" aria-hidden="true">⚠️</span>
        <div>
          <strong>Do not let your child speak to police without a lawyer.</strong> Even well-meaning
          statements can harm their case. Ask for Legal Aid immediately — it is free for young people
          in most circumstances.
        </div>
      </div>

      <div className="section-grid" style={{ marginTop: 20 }}>
        <div className="info-card">
          <h3>📞 First Steps When Arrested</h3>
          <ol style={{ paddingLeft: 18, lineHeight: 1.8, fontSize: '0.9rem', color: '#4a5568' }}>
            <li>Contact Legal Aid (emergency numbers below)</li>
            <li>Do not consent to police interviews without a lawyer</li>
            <li>Ask to be present during any questioning</li>
            <li>Write down everything you remember: time, officer names, what was said</li>
            <li>Contact a youth advocacy service if you need extra support</li>
          </ol>
        </div>

        <div className="info-card">
          <h3>📅 Court Dates and Hearings</h3>
          <p>
            Attend all court dates with your child. If you cannot attend, inform the lawyer immediately.
            Missing court dates can result in a warrant for your child's arrest.
          </p>
          <p style={{ marginTop: 10 }}>
            Before court, meet with the lawyer to understand:
          </p>
          <ul>
            <li>What charge(s) your child faces</li>
            <li>What the possible outcomes are</li>
            <li>Whether to plead guilty or not guilty</li>
            <li>What character references or reports might help</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>📝 Character References and Reports</h3>
          <p>
            Courts consider character references from teachers, coaches, employers, community
            leaders, and family members. A good reference can significantly influence the outcome.
          </p>
          <p style={{ marginTop: 10 }}>
            A <strong>pre-sentence report</strong> from a youth justice officer may also be prepared,
            assessing your child's circumstances and making recommendations.
          </p>
        </div>

        <div className="info-card">
          <h3>🔄 Bail Conditions</h3>
          <p>
            If your child is granted bail, conditions might include:
          </p>
          <ul>
            <li>Curfew (must be home by a certain time)</li>
            <li>Report to police regularly</li>
            <li>Not contact specific people or go to certain places</li>
            <li>Attend school or programs</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            Breaching bail conditions is a serious offence. Help your child understand and meet them.
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 24, marginBottom: 12, color: '#1a365d', fontWeight: 700 }}>
        Legal Aid — State &amp; Territory Contacts
      </h3>
      <ul className="resource-list">
        <li>
          <div><div className="resource-name">Legal Aid NSW</div></div>
          <div className="resource-phone">1300 888 529</div>
        </li>
        <li>
          <div><div className="resource-name">Victoria Legal Aid</div></div>
          <div className="resource-phone">1300 792 387</div>
        </li>
        <li>
          <div><div className="resource-name">Legal Aid Queensland</div></div>
          <div className="resource-phone">1300 651 188</div>
        </li>
        <li>
          <div><div className="resource-name">Legal Aid WA</div></div>
          <div className="resource-phone">(08) 9261 6222</div>
        </li>
        <li>
          <div><div className="resource-name">Legal Services Commission SA</div></div>
          <div className="resource-phone">1300 366 424</div>
        </li>
        <li>
          <div><div className="resource-name">Legal Aid ACT</div></div>
          <div className="resource-phone">(02) 6243 3411</div>
        </li>
        <li>
          <div><div className="resource-name">Northern Territory Legal Aid</div></div>
          <div className="resource-phone">1800 019 343</div>
        </li>
        <li>
          <div><div className="resource-name">Legal Aid Tasmania</div></div>
          <div className="resource-phone">1300 366 611</div>
        </li>
      </ul>
    </div>
  );
}

function HelpTab() {
  return (
    <div>
      <h2 className="section-heading">Getting Help — For You and Your Family</h2>

      <div className="callout success">
        <span className="callout-icon" aria-hidden="true">💚</span>
        <div>
          There is no shame in seeking help. Families going through this need support too.
          The services below are for parents and caregivers.
        </div>
      </div>

      <div className="section-grid" style={{ marginTop: 20 }}>
        <div className="info-card">
          <h3>📞 Parenting Support Lines</h3>
          <ul style={{ lineHeight: 1.9 }}>
            <li><strong>Parentline:</strong> 1300 30 1300</li>
            <li><strong>Family Drug Support:</strong> 1300 368 186</li>
            <li><strong>Lifeline (crisis):</strong> 13 11 14</li>
            <li><strong>MensLine Australia:</strong> 1300 78 99 78</li>
            <li><strong>beyondblue:</strong> 1300 22 4636</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🏛️ Family Support Services</h3>
          <p>
            The Department of Communities (or equivalent in your state) offers family support
            programs that can help with parenting skills, conflict resolution, and strengthening
            family bonds.
          </p>
          <p style={{ marginTop: 10 }}>
            Ask your child's youth justice officer or case manager to connect you with a
            family support worker — this service is usually free.
          </p>
        </div>

        <div className="info-card">
          <h3>🌏 Culturally Specific Support</h3>
          <ul>
            <li><strong>Aboriginal Legal Services:</strong> 1800 733 233</li>
            <li><strong>Link-Up (Aboriginal reconnection):</strong> 1800 624 332</li>
            <li>CALD (Culturally and Linguistically Diverse) community legal centres in major cities</li>
            <li>Multicultural communities' councils offer interpreters and cultural support</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🏫 School and Education Support</h3>
          <p>
            If your child's schooling has been disrupted, contact:
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>The school's student welfare team</li>
            <li>State Education Department student support line</li>
            <li>Flexible learning options (TAFE, community colleges)</li>
            <li>Youth Employment programs (e.g., Youth Jobs PaTH)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
