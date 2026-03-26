import React, { useState } from 'react';

function Accordion({ question, children }) {
  const [open, setOpen] = useState(false);
  const id = question.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="accordion">
      <button
        className="accordion-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`acc-${id}`}
      >
        {question}
        <span className="accordion-icon" aria-hidden="true">▼</span>
      </button>
      {open && (
        <div className="accordion-body" id={`acc-${id}`} role="region">
          {children}
        </div>
      )}
    </div>
  );
}

const TABS = [
  { id: 'rights', label: '⚖️ Your Rights' },
  { id: 'trouble', label: '🚨 If You Get in Trouble' },
  { id: 'support', label: '💙 Support Services' },
  { id: 'stories', label: '📖 Real Stories & Info' },
];

export default function YoungPersonPage() {
  const [activeTab, setActiveTab] = useState('rights');

  return (
    <div className="content-page">
      <div className="content-hero" style={{ background: 'linear-gradient(135deg, #1a4e8c, #2b6cb0)' }}>
        <span className="hero-icon" aria-hidden="true">🧑</span>
        <h1>Know Your Rights</h1>
        <p>
          You have rights — no matter what. This page gives you honest, clear information
          about the Australian youth justice system and how to get help.
        </p>
      </div>

      <div className="callout warning" role="alert">
        <span className="callout-icon" aria-hidden="true">📞</span>
        <div>
          <strong>Need help right now?</strong> Call <strong>Kids Helpline free on 1800 55 1800</strong> (24/7, any reason).
          Or text them at <a href="https://kidshelpline.com.au" target="_blank" rel="noopener noreferrer">kidshelpline.com.au</a>
        </div>
      </div>

      <div className="tabs-container" style={{ '--tab-color': '#2b6cb0', marginTop: 24 }}>
        <div className="tabs-list" role="tablist" aria-label="Young person information sections">
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
        {activeTab === 'rights' && <RightsTab />}
        {activeTab === 'trouble' && <TroubleTab />}
        {activeTab === 'support' && <SupportTab />}
        {activeTab === 'stories' && <StoriesTab />}
      </div>
    </div>
  );
}

function RightsTab() {
  return (
    <div>
      <h2 className="section-heading">Your Legal Rights in Australia</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">💡</span>
        <div>
          <strong>Age of criminal responsibility:</strong> In Australia, you cannot be held criminally
          responsible if you are under <strong>10 years old</strong>. Children aged 10–13 are presumed
          not to know the difference between right and wrong (the "doli incapax" rule) unless proven otherwise.
          Many states are raising this to 14.
        </div>
      </div>

      <div className="section-grid" style={{ marginTop: 20 }}>
        <div className="info-card">
          <h3><span aria-hidden="true">🛑</span> Right to Remain Silent</h3>
          <p>
            You <strong>do not have to answer police questions</strong>. You can say
            "I want to speak to a lawyer before answering any questions."
            This right exists even if police say it would look bad.
          </p>
          <div className="callout success" style={{ marginTop: 12 }}>
            <span className="callout-icon" aria-hidden="true">✅</span>
            <div>Saying "I don't want to answer questions" is always allowed and cannot be used against you as proof of guilt.</div>
          </div>
        </div>

        <div className="info-card">
          <h3><span aria-hidden="true">🧑‍⚖️</span> Right to a Support Person</h3>
          <p>
            If you are under 18 and questioned by police, you have the right to have a
            <strong> parent, guardian, or support person present</strong>. Police must
            make reasonable attempts to contact them before questioning you.
          </p>
          <p style={{ marginTop: 10 }}>
            You also have the right to speak with a lawyer in private before any questioning.
          </p>
        </div>

        <div className="info-card">
          <h3><span aria-hidden="true">🔒</span> If You Are Detained</h3>
          <p>Police must tell you:</p>
          <ul>
            <li>Why you are being detained</li>
            <li>That you do not have to answer questions</li>
            <li>That you can contact a lawyer</li>
            <li>That a support person will be called</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            Detention should be for as short a time as possible.
          </p>
        </div>

        <div className="info-card">
          <h3><span aria-hidden="true">⚖️</span> Right to Bail</h3>
          <p>
            You have the right to apply for bail (to be released while your case is
            heard). Courts must consider your age and circumstances. Bail conditions
            must be reasonable and not set up to fail.
          </p>
          <p style={{ marginTop: 10 }}>
            If you are refused bail, you must be brought before a court as soon as possible
            — usually the next day.
          </p>
        </div>

        <div className="info-card">
          <h3><span aria-hidden="true">📋</span> Youth Court is Different</h3>
          <p>
            Young people (under 18) are dealt with in <strong>Children's Courts</strong>
            or <strong>Youth Courts</strong>, not adult courts. These courts are:
          </p>
          <ul>
            <li>Not open to the general public</li>
            <li>Focused on rehabilitation, not just punishment</li>
            <li>Required to consider your age and background</li>
          </ul>
        </div>

        <div className="info-card">
          <h3><span aria-hidden="true">🗂️</span> Spent Convictions</h3>
          <p>
            Many youth convictions become "spent" (wiped from your record) after a set time
            — usually 3–5 years without reoffending. This means you usually don't have
            to declare them to employers or universities.
          </p>
          <p style={{ marginTop: 10 }}>
            Rules vary by state. Ask a youth lawyer about your specific situation.
          </p>
        </div>
      </div>

      <h2 className="section-heading" style={{ marginTop: 28 }}>Common Questions About Your Rights</h2>

      <Accordion question="Can police search me without my permission?">
        <p>
          Police can search you without consent if they have "reasonable grounds" to suspect you have
          something illegal. They must tell you the reason for the search. You cannot physically resist
          a lawful search, but you can clearly state: "I do not consent to this search."
        </p>
        <p>
          Certain states allow "stop and search" in specific areas. Your lawyer can challenge whether
          a search was lawful.
        </p>
      </Accordion>

      <Accordion question="Do I have to give police my name and address?">
        <p>
          In most situations, yes — Australian states have laws requiring you to provide your name
          and address to police when asked. However, you generally don't have to answer other questions.
          Always confirm your identity calmly, then say you want to speak to a lawyer.
        </p>
      </Accordion>

      <Accordion question="Can police take my phone or belongings?">
        <p>
          Police can seize items as evidence if they believe they are connected to a crime. They must
          give you a receipt. If they take your phone, they generally need a warrant to search through
          its contents unless there are urgent circumstances.
        </p>
      </Accordion>

      <Accordion question="What if a police officer hurts me or treats me badly?">
        <p>
          You have the right to make a formal complaint. Contact:
        </p>
        <ul>
          <li>Your state/territory Police Ombudsman or Professional Standards Command</li>
          <li>A legal aid office or community legal centre</li>
          <li>The Australian Human Rights Commission for serious matters</li>
        </ul>
        <p>Try to document what happened: write down the time, location, officer badge numbers, and any witnesses.</p>
      </Accordion>

      <Accordion question="What does it mean if I get a caution instead of charges?">
        <p>
          A <strong>caution</strong> (or police caution) is a formal warning that doesn't result in a
          conviction. First-time offenders are often eligible. It goes on a police record but not a
          criminal record. Agreeing to a caution means admitting to the offence, so always get legal
          advice first.
        </p>
      </Accordion>
    </div>
  );
}

function TroubleTab() {
  return (
    <div>
      <h2 className="section-heading">What Happens If You Get in Trouble</h2>

      <div className="callout danger">
        <span className="callout-icon" aria-hidden="true">🚨</span>
        <div>
          <strong>First rule:</strong> Ask for a lawyer before answering any police questions.
          Say: <em>"I want to speak to a lawyer."</em> You can get free legal help — see the Support tab.
        </div>
      </div>

      <h3 style={{ marginTop: 24, marginBottom: 14, color: '#1a365d', fontWeight: 700, fontSize: '1.05rem' }}>
        The Process: Step by Step
      </h3>

      {[
        {
          num: '1',
          title: 'Police Contact',
          body: `Police may stop you, ask questions, or bring you to the station. You have the right to 
            know why. You do NOT have to answer questions beyond your name and address. 
            A support person (parent/guardian) should be called if you're under 18.`,
          color: '#3182ce',
        },
        {
          num: '2',
          title: 'Charge or Caution Decision',
          body: `Police decide whether to charge you formally, issue a caution/warning, refer you to a 
            youth justice conference, or take no further action. Minor first offences often result 
            in a caution — not a court case.`,
          color: '#38a169',
        },
        {
          num: '3',
          title: 'Youth Justice Conference',
          body: `For many offences, you may be referred to a conference where you, your family, the 
            victim (if they choose), and a facilitator meet to agree on how you can make things 
            right. Completing the agreement means no criminal record. This is a real chance to 
            move forward.`,
          color: '#6b46c1',
        },
        {
          num: '4',
          title: "Children's/Youth Court",
          body: "If your matter goes to court, it will be heard in a specialised Youth or Children's Court. These courts focus on rehabilitation. You should have a lawyer. The court considers your age, background, and circumstances.",
          color: '#c05621',
        },
        {
          num: '5',
          title: 'Sentencing Options',
          body: `Youth courts have many options besides detention: good behaviour bonds, community 
            service, probation, programs (anger management, counselling), fines, and deferred 
            sentencing. Detention is a last resort for serious or repeat offences.`,
          color: '#c53030',
        },
      ].map((step) => (
        <div key={step.num} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{
            background: step.color, color: '#fff', borderRadius: '50%',
            width: 36, height: 36, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem',
            flexShrink: 0, marginTop: 2
          }}>
            {step.num}
          </div>
          <div className="info-card" style={{ flex: 1, paddingTop: 14, paddingBottom: 14 }}>
            <h3 style={{ color: step.color, fontSize: '0.95rem', marginBottom: 6 }}>{step.title}</h3>
            <p style={{ fontSize: '0.88rem' }}>{step.body}</p>
          </div>
        </div>
      ))}

      <h2 className="section-heading" style={{ marginTop: 28 }}>Types of Penalties Explained</h2>

      <div className="section-grid">
        <div className="info-card">
          <h3>📝 Good Behaviour Bond</h3>
          <p>
            You promise to behave for a set period (e.g., 12 months). If you break the
            conditions, you may be brought back to court. No criminal record if you
            complete it successfully.
          </p>
        </div>
        <div className="info-card">
          <h3>🌱 Community Service</h3>
          <p>
            You perform unpaid work in the community — cleaning parks, helping charities, etc.
            It must not conflict with school. Usually 20–200 hours depending on the offence.
          </p>
        </div>
        <div className="info-card">
          <h3>👁️ Probation / Supervision</h3>
          <p>
            A youth justice officer meets with you regularly to support your rehabilitation
            and make sure you're meeting your obligations. Includes curfews, school attendance,
            or program participation.
          </p>
        </div>
        <div className="info-card">
          <h3>🏠 Detention (last resort)</h3>
          <p>
            Detention centres (juvenile justice centres) are used only for serious offences or
            when other options have failed. You have rights inside too — education, health care,
            and protection from harm.
          </p>
        </div>
      </div>
    </div>
  );
}

function SupportTab() {
  return (
    <div>
      <h2 className="section-heading">Support Services for Young People</h2>

      <div className="callout success">
        <span className="callout-icon" aria-hidden="true">💙</span>
        <div>
          All services below are <strong>free</strong> or low-cost. Many are confidential.
          You don't need a parent's permission to contact them.
        </div>
      </div>

      <h3 style={{ marginTop: 20, marginBottom: 12, color: '#1a365d', fontWeight: 700 }}>
        Crisis &amp; Counselling (24/7)
      </h3>
      <ul className="resource-list">
        <li>
          <div>
            <div className="resource-name">Kids Helpline</div>
            <div className="resource-desc">Free, confidential counselling for young people 5–25</div>
          </div>
          <div className="resource-phone">1800 55 1800</div>
        </li>
        <li>
          <div>
            <div className="resource-name">Lifeline</div>
            <div className="resource-desc">Crisis support and suicide prevention</div>
          </div>
          <div className="resource-phone">13 11 14</div>
        </li>
        <li>
          <div>
            <div className="resource-name">Beyond Blue</div>
            <div className="resource-desc">Mental health support and information</div>
          </div>
          <div className="resource-phone">1300 22 4636</div>
        </li>
        <li>
          <div>
            <div className="resource-name">headspace</div>
            <div className="resource-desc">Mental health support for 12–25 year olds, centres nationwide</div>
          </div>
          <div className="resource-phone">1800 650 890</div>
        </li>
        <li>
          <div>
            <div className="resource-name">1800RESPECT</div>
            <div className="resource-desc">Family violence and sexual assault support</div>
          </div>
          <div className="resource-phone">1800 737 732</div>
        </li>
      </ul>

      <h3 style={{ marginTop: 24, marginBottom: 12, color: '#1a365d', fontWeight: 700 }}>
        Free Legal Help
      </h3>
      <ul className="resource-list">
        <li>
          <div>
            <div className="resource-name">Legal Aid (All States &amp; Territories)</div>
            <div className="resource-desc">Free legal advice and representation for young people</div>
          </div>
          <div>
            <a href="https://www.legalaid.nsw.gov.au" target="_blank" rel="noopener noreferrer">
              Find your state →
            </a>
          </div>
        </li>
        <li>
          <div>
            <div className="resource-name">Youth Law Australia</div>
            <div className="resource-desc">Free online legal information for young people</div>
          </div>
          <div>
            <a href="https://youthlawaustralia.org.au" target="_blank" rel="noopener noreferrer">
              Visit site →
            </a>
          </div>
        </li>
        <li>
          <div>
            <div className="resource-name">Community Legal Centres Australia</div>
            <div className="resource-desc">Find a free legal centre near you</div>
          </div>
          <div>
            <a href="https://clcs.org.au" target="_blank" rel="noopener noreferrer">
              Find one →
            </a>
          </div>
        </li>
        <li>
          <div>
            <div className="resource-name">Caxton Legal Centre (QLD)</div>
            <div className="resource-desc">Specialist youth and criminal law advice</div>
          </div>
          <div className="resource-phone">(07) 3214 6333</div>
        </li>
      </ul>

      <h3 style={{ marginTop: 24, marginBottom: 12, color: '#1a365d', fontWeight: 700 }}>
        Housing &amp; Homelessness
      </h3>
      <ul className="resource-list">
        <li>
          <div>
            <div className="resource-name">Youth Homelessness Line</div>
            <div className="resource-desc">National 24/7 referrals to emergency and youth housing</div>
          </div>
          <div className="resource-phone">1800 825 955</div>
        </li>
        <li>
          <div>
            <div className="resource-name">Salvation Army</div>
            <div className="resource-desc">Emergency housing, food, and support for young people</div>
          </div>
          <div className="resource-phone">1300 371 288</div>
        </li>
      </ul>

      <div className="callout info" style={{ marginTop: 24 }}>
        <span className="callout-icon" aria-hidden="true">🌐</span>
        <div>
          <strong>For First Nations young people:</strong> Contact your local Aboriginal Legal Service (ALS)
          or Torres Strait Islander Legal Service (TSILS) for culturally safe legal support. The National
          number is <strong>1800 733 233</strong>.
        </div>
      </div>
    </div>
  );
}

function StoriesTab() {
  return (
    <div>
      <h2 className="section-heading">Understanding Youth Justice: Context &amp; Facts</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">📖</span>
        <div>
          These are real facts about young people and the justice system in Australia — to help you
          understand what's happening and why.
        </div>
      </div>

      <div className="stats-grid" style={{ marginTop: 24 }}>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#2b6cb0' }}>10</div>
          <div className="stat-label">Minimum age of criminal responsibility (most states)</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#e53e3e' }}>65%</div>
          <div className="stat-label">of young people in detention are First Nations</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#38a169' }}>70%</div>
          <div className="stat-label">of youth offences can be resolved without court</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#6b46c1' }}>$857</div>
          <div className="stat-label">cost per day to hold a young person in detention</div>
        </div>
      </div>

      <div className="section-grid" style={{ marginTop: 24 }}>
        <div className="info-card">
          <span className="card-tag" style={{ background: '#ebf8ff', color: '#2b6cb0' }}>Context</span>
          <h3>Why Young People Become Involved</h3>
          <p>
            Research consistently shows youth crime is linked to social and economic factors:
          </p>
          <ul>
            <li>Poverty and disadvantage</li>
            <li>Trauma, abuse, or neglect</li>
            <li>Homelessness or unstable housing</li>
            <li>Mental health issues and substance use</li>
            <li>Exclusion from school</li>
            <li>Family breakdown or domestic violence</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            <em>Crime is usually a symptom of something harder going on.</em>
          </p>
        </div>

        <div className="info-card">
          <span className="card-tag" style={{ background: '#f0fff4', color: '#276749' }}>What Works</span>
          <h3>Rehabilitation Really Works</h3>
          <p>
            Studies show that young people who are supported rather than punished are far less
            likely to reoffend. Early intervention programs, family support, and education
            keep young people out of the system.
          </p>
          <p style={{ marginTop: 10 }}>
            Youth justice conferences (restorative justice) have reoffending rates as much as
            <strong> 40% lower</strong> than court processes alone.
          </p>
        </div>

        <div className="info-card">
          <span className="card-tag" style={{ background: '#fff5f5', color: '#c53030' }}>Concern</span>
          <h3>First Nations Overrepresentation</h3>
          <p>
            Aboriginal and Torres Strait Islander young people are significantly overrepresented
            in the youth justice system — up to 24 times more likely to be in detention than
            non-Indigenous young people.
          </p>
          <p style={{ marginTop: 10 }}>
            This is a legacy of colonisation, systemic disadvantage, and racism in institutions.
            It is not a reflection of the character or culture of First Nations communities.
          </p>
        </div>

        <div className="info-card">
          <span className="card-tag" style={{ background: '#faf5ff', color: '#553c9a' }}>Progress</span>
          <h3>The Law is Changing</h3>
          <p>
            In recent years, several Australian states and territories have:
          </p>
          <ul>
            <li>Raised the age of criminal responsibility to 12 or 14</li>
            <li>Banned solitary confinement for young people</li>
            <li>Invested in early intervention programs</li>
            <li>Introduced justice reinvestment in communities</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            Advocates are pushing for the age to be raised nationally to at least 14.
          </p>
        </div>
      </div>

      <div className="callout success" style={{ marginTop: 8 }}>
        <span className="callout-icon" aria-hidden="true">🌱</span>
        <div>
          <strong>You are not your worst moment.</strong> Most young people who come into contact
          with the justice system do not go on to become adult offenders. Getting the right support
          makes a massive difference.
        </div>
      </div>
    </div>
  );
}
