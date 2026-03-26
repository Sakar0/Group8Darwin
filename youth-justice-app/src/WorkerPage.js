import React, { useState } from 'react';

const TABS = [
  { id: 'programs', label: '🌱 Intervention Programs' },
  { id: 'referral', label: '🔄 Referral Pathways' },
  { id: 'data', label: '📊 Data & Resources' },
  { id: 'risk', label: '🧩 Risk & Protective Factors' },
];

export default function WorkerPage() {
  const [activeTab, setActiveTab] = useState('programs');

  return (
    <div className="content-page">
      <div className="content-hero" style={{ background: 'linear-gradient(135deg, #322659, #553c9a)' }}>
        <span className="hero-icon" aria-hidden="true">🤝</span>
        <h1>Community &amp; Social Worker Resources</h1>
        <p>
          Evidence-based programs, referral pathways, and practical tools for practitioners
          working with young people in the Australian youth justice space.
        </p>
      </div>

      <div className="tabs-container" style={{ '--tab-color': '#553c9a', marginTop: 24 }}>
        <div className="tabs-list" role="tablist" aria-label="Worker resource sections">
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
        {activeTab === 'programs' && <ProgramsTab />}
        {activeTab === 'referral' && <ReferralTab />}
        {activeTab === 'data' && <DataTab />}
        {activeTab === 'risk' && <RiskTab />}
      </div>
    </div>
  );
}

function ProgramsTab() {
  const programs = [
    {
      name: 'Youth Justice Group Conferencing',
      type: 'Restorative Justice',
      evidence: 'Strong',
      desc: 'Facilitated meetings between young offenders, victims, families and community members to address harm and develop an action plan. Nationally recognised with strong evidence of reducing reoffending by up to 40%.',
      who: 'Police, courts, youth justice officers',
      states: 'All states and territories',
      color: '#2b6cb0',
    },
    {
      name: 'ROPES (Rite of Passage Expedition Program)',
      type: 'Therapeutic',
      evidence: 'Moderate',
      desc: 'Outdoor education and therapeutic program for at-risk youth combining bushcraft, mentoring, and cognitive behavioural therapy principles.',
      who: 'Youth justice workers, schools, NGOs',
      states: 'NSW, VIC, QLD',
      color: '#38a169',
    },
    {
      name: 'Functional Family Therapy (FFT)',
      type: 'Family-based',
      evidence: 'Strong',
      desc: 'A short-term (12–16 session) evidence-based intervention for young people aged 10–18 with behavioural problems. Works with the whole family system using structured, phase-based approach.',
      who: 'Accredited FFT therapists, family services',
      states: 'NSW, VIC, QLD, SA, WA',
      color: '#276749',
    },
    {
      name: 'Multisystemic Therapy (MST)',
      type: 'Intensive Family',
      evidence: 'Strong',
      desc: 'Intensive home-based intervention targeting the multiple systems influencing antisocial behaviour: family, peers, school, community. One of the most rigorously evaluated youth justice programs globally.',
      who: 'Licensed MST teams',
      states: 'NSW, VIC, QLD',
      color: '#6b46c1',
    },
    {
      name: 'Aggression Replacement Training (ART)',
      type: 'Cognitive-Behavioural',
      evidence: 'Strong',
      desc: '10-week group program targeting aggression and antisocial behaviour. Three components: social skills training, anger control, and moral reasoning. Widely used in custody and community settings.',
      who: 'Trained facilitators in custody, community programs',
      states: 'All states (commonly in detention centres)',
      color: '#c05621',
    },
    {
      name: 'Justice Reinvestment',
      type: 'Community-based Systemic',
      evidence: 'Emerging Strong',
      desc: 'Redirects funds from incarceration to community-based programs in high-risk areas. Maranguka Justice Reinvestment (Bourke, NSW) reduced youth crime by 38%, charged offences by 42%.',
      who: 'Community leaders, government, NGOs',
      states: 'NSW (Bourke), QLD, NT, WA pilots',
      color: '#c53030',
    },
    {
      name: 'Pathways to Prevention (P2P)',
      type: 'Early Intervention',
      evidence: 'Strong',
      desc: 'Family and community strengthening in disadvantaged areas during early childhood. Reduces conduct problems and risk factors before children enter the justice system. Originally developed in Logan, QLD.',
      who: 'Schools, community workers, families',
      states: 'QLD, expanding nationally',
      color: '#1a365d',
    },
    {
      name: 'Koori Court / Murri Court',
      type: 'Culturally Responsive',
      evidence: 'Strong',
      desc: 'Specialist courts for Aboriginal and Torres Strait Islander young people incorporating Elders, community members, and cultural practices. Shown to improve engagement with justice processes and outcomes.',
      who: 'Court, Elders, community organisations',
      states: 'VIC (Koori), QLD (Murri), WA (Ngulluk Koort)',
      color: '#744210',
    },
  ];

  return (
    <div>
      <h2 className="section-heading">Evidence-Based Intervention Programs</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">📋</span>
        <div>
          Evidence ratings: <strong>Strong</strong> = multiple RCTs/rigorous evaluations;
          <strong> Moderate</strong> = consistent positive outcomes, some controlled studies;
          <strong> Emerging</strong> = promising early evidence. All programs listed are currently operating in Australia.
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        {programs.map((p) => (
          <div key={p.name} className="info-card" style={{ marginBottom: 16, borderLeft: `4px solid ${p.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
              <h3 style={{ color: p.color, fontSize: '1rem' }}>{p.name}</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="card-tag" style={{ background: '#ebf8ff', color: '#2b6cb0' }}>{p.type}</span>
                <span className="card-tag" style={{ background: '#f0fff4', color: '#276749' }}>
                  Evidence: {p.evidence}
                </span>
              </div>
            </div>
            <p style={{ marginTop: 8, fontSize: '0.88rem' }}>{p.desc}</p>
            <div style={{ marginTop: 10, display: 'flex', gap: 20, fontSize: '0.8rem', color: '#4a5568', flexWrap: 'wrap' }}>
              <span>👥 <strong>Who delivers:</strong> {p.who}</span>
              <span>📍 <strong>Available:</strong> {p.states}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferralTab() {
  return (
    <div>
      <h2 className="section-heading">Referral Pathways</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">🔄</span>
        <div>
          Key referral pathways for practitioners. Always confirm current availability and
          eligibility in your state/territory — services and criteria change regularly.
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {[
          {
            title: 'Mental Health',
            icon: '🧠',
            items: [
              'headspace (12–25): 1800 650 890 — national hubs',
              'CAMHS (Child & Adolescent Mental Health Service) — state referral via GP',
              'Early Psychosis Prevention and Intervention Centre (EPPIC)',
              'CYMHS (Child & Youth Mental Health Service)',
              'Private psychiatry (requires GP referral + Mental Health Care Plan)',
            ],
          },
          {
            title: 'Alcohol & Other Drugs',
            icon: '💊',
            items: [
              'ADIS (Alcohol and Drug Information Service) — state-based',
              'Youth-specific AOD programs (check state health directory)',
              'Smart Recovery (peer support, 12+ years)',
              'Narcotics Anonymous / AA Youth Meetings',
              'Residential rehabilitation (16+, waitlisted in most states)',
            ],
          },
          {
            title: 'Housing & Homelessness',
            icon: '🏠',
            items: [
              'SupportLink — national online referral portal',
              'My Community Directory — local service search',
              'Youth homelessness services (state-based)',
              'Supported Independent Living (NDIS pathway)',
              'Crisis accommodation via local council homelessness service',
            ],
          },
          {
            title: 'Education & Employment',
            icon: '📚',
            items: [
              'TAFE flexible learning pathways',
              'Youth Employment Service (YES) — jobactive providers',
              'Transition to Work (TtW) programs (15–24)',
              'School re-engagement programs (state education departments)',
              'Vocational Education and Training (VET) in schools',
            ],
          },
          {
            title: 'Family Services',
            icon: '👨‍👩‍👦',
            items: [
              'Family group conferences (not justice) — child protection services',
              'Functional Family Therapy (FFT) — referral via youth justice',
              'Multisystemic Therapy (MST) — referral via youth justice or courts',
              'Family relationship centres (Relationships Australia)',
              'Domestic violence support (safe referral to DV services)',
            ],
          },
          {
            title: 'First Nations Specific',
            icon: '🌏',
            items: [
              'Aboriginal Legal Services (ALS): 1800 733 233',
              'Koori/Murri Courts — referral via magistrate or defence',
              'Closing the Gap services — local Aboriginal community organisations',
              'NDIS Aboriginal Community-Controlled providers',
              'Local Elders groups and cultural support programs',
            ],
          },
        ].map((section) => (
          <div key={section.title} className="info-card">
            <h3><span aria-hidden="true">{section.icon}</span> {section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item} style={{ fontSize: '0.85rem' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="section-heading" style={{ marginTop: 28 }}>National Screening &amp; Assessment Tools</h2>
      <div className="section-grid">
        <div className="info-card">
          <h3>🧰 SAVRY (Structured Assessment of Violence Risk in Youth)</h3>
          <p>
            Widely used risk assessment tool for violence in 12–18 year olds. Assesses historical,
            social/contextual, and individual/clinical risk factors along with protective factors.
            Requires training to administer.
          </p>
        </div>
        <div className="info-card">
          <h3>🧰 YLS/CMI (Youth Level of Service / Case Management Inventory)</h3>
          <p>
            Assesses risk, needs, and responsivity in young offenders. Used to inform case
            management decisions. Evidence-based tool with strong predictive validity. Available
            through Multi-Health Systems.
          </p>
        </div>
        <div className="info-card">
          <h3>🧰 CANS (Child and Adolescent Needs and Strengths)</h3>
          <p>
            Comprehensive needs assessment for child welfare and youth justice intersections.
            Supports collaborative care planning. Available through Praed Foundation Australia.
          </p>
        </div>
      </div>
    </div>
  );
}

function DataTab() {
  return (
    <div>
      <h2 className="section-heading">Key Data &amp; Resources for Practitioners</h2>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#553c9a' }}>~5,000</div>
          <div className="stat-label">young people in detention on any given day in Australia</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#e53e3e' }}>65%</div>
          <div className="stat-label">of youth in detention are Aboriginal/Torres Strait Islander</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#2b6cb0' }}>45%</div>
          <div className="stat-label">of youth in detention are on remand (not yet sentenced)</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#38a169' }}>$857</div>
          <div className="stat-label">average cost per day per young person in detention</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#276749' }}>$35</div>
          <div className="stat-label">average cost per day per young person in community supervision</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#c05621' }}>75%</div>
          <div className="stat-label">of young people in detention have experienced childhood trauma</div>
        </div>
      </div>

      <h2 className="section-heading" style={{ marginTop: 28 }}>Key Data Sources</h2>
      <ul className="resource-list">
        <li>
          <div>
            <div className="resource-name">AIHW — Youth Justice in Australia</div>
            <div className="resource-desc">Annual national report on youth justice supervision and detention (Australian Institute of Health and Welfare)</div>
          </div>
          <a href="https://www.aihw.gov.au/reports-data/health-welfare-services/youth-justice" target="_blank" rel="noopener noreferrer">View →</a>
        </li>
        <li>
          <div>
            <div className="resource-name">ABS — Crime and Justice Statistics</div>
            <div className="resource-desc">Australian Bureau of Statistics data on offending, courts, and corrections</div>
          </div>
          <a href="https://www.abs.gov.au/statistics/people/crime-and-justice" target="_blank" rel="noopener noreferrer">View →</a>
        </li>
        <li>
          <div>
            <div className="resource-name">BOCSAR — NSW Bureau of Crime Statistics</div>
            <div className="resource-desc">NSW-specific crime statistics, trends, and research reports</div>
          </div>
          <a href="https://www.bocsar.nsw.gov.au" target="_blank" rel="noopener noreferrer">View →</a>
        </li>
        <li>
          <div>
            <div className="resource-name">Youth Justice Coalition</div>
            <div className="resource-desc">Advocacy and policy resources from Australia's peak youth justice coalition</div>
          </div>
          <a href="https://yjcoalition.org.au" target="_blank" rel="noopener noreferrer">View →</a>
        </li>
        <li>
          <div>
            <div className="resource-name">Australian Child Rights Taskforce</div>
            <div className="resource-desc">Reports on children's rights compliance, including youth justice</div>
          </div>
          <a href="https://www.childrights.org.au" target="_blank" rel="noopener noreferrer">View →</a>
        </li>
      </ul>
    </div>
  );
}

function RiskTab() {
  return (
    <div>
      <h2 className="section-heading">Risk &amp; Protective Factors Framework</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">🧩</span>
        <div>
          Understanding risk and protective factors is central to effective youth justice practice.
          This framework is based on the <strong>Risk-Needs-Responsivity (RNR) model</strong> and
          current Australian research.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 20 }}>
        <div>
          <h3 style={{ color: '#c53030', marginBottom: 12, fontSize: '1rem', fontWeight: 700 }}>
            🔴 Risk Factors
          </h3>
          {[
            { domain: 'Individual', items: ['Antisocial attitudes and beliefs', 'Impulsivity and poor self-regulation', 'Substance misuse', 'Mental health issues', 'Low school achievement', 'History of trauma'] },
            { domain: 'Family', items: ['Inconsistent or harsh parenting', 'Family conflict or domestic violence', 'Parental offending or substance use', 'Lack of supervision and monitoring'] },
            { domain: 'Peer', items: ['Association with delinquent peers', 'Gang involvement', 'Peer pressure and social exclusion'] },
            { domain: 'School/Community', items: ['School exclusion or disengagement', 'High-crime neighbourhood', 'Lack of after-school activities', 'Poverty and housing instability'] },
          ].map((f) => (
            <div key={f.domain} className="info-card" style={{ marginBottom: 12, borderLeft: '3px solid #e53e3e' }}>
              <h3 style={{ fontSize: '0.88rem', color: '#c53030' }}>{f.domain}</h3>
              <ul>{f.items.map(i => <li key={i} style={{ fontSize: '0.83rem' }}>{i}</li>)}</ul>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ color: '#276749', marginBottom: 12, fontSize: '1rem', fontWeight: 700 }}>
            🟢 Protective Factors
          </h3>
          {[
            { domain: 'Individual', items: ['Positive self-efficacy and identity', 'Problem-solving skills', 'Emotional regulation', 'Engagement in school/work', 'Prosocial values'] },
            { domain: 'Family', items: ['Positive parent-child relationship', 'Consistent supervision', 'Family cohesion', 'Parental support and involvement', 'Extended family connections'] },
            { domain: 'Peer', items: ['Prosocial friendships', 'Positive peer role models', 'Social belonging (clubs, teams, etc.)'] },
            { domain: 'School/Community', items: ['School connectedness', 'Positive teacher relationships', 'Mentoring relationships', 'Safe and stable housing', 'Cultural identity and connection'] },
          ].map((f) => (
            <div key={f.domain} className="info-card" style={{ marginBottom: 12, borderLeft: '3px solid #38a169' }}>
              <h3 style={{ fontSize: '0.88rem', color: '#276749' }}>{f.domain}</h3>
              <ul>{f.items.map(i => <li key={i} style={{ fontSize: '0.83rem' }}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>

      <h2 className="section-heading" style={{ marginTop: 28 }}>The RNR Model in Practice</h2>
      <div className="section-grid">
        <div className="info-card" style={{ borderLeft: '4px solid #2b6cb0' }}>
          <h3 style={{ color: '#2b6cb0' }}>R — Risk Principle</h3>
          <p>
            Match intervention intensity to the young person's level of risk. Higher-risk individuals
            benefit from more intensive intervention. Low-risk individuals may be harmed by high
            intensity (net-widening, criminogenic peer mixing).
          </p>
        </div>
        <div className="info-card" style={{ borderLeft: '4px solid #276749' }}>
          <h3 style={{ color: '#276749' }}>N — Needs Principle</h3>
          <p>
            Target <em>criminogenic needs</em> — the dynamic risk factors most directly linked to
            offending. These include antisocial attitudes, peer associations, and substance use.
            Targeting non-criminogenic needs (self-esteem alone) is less effective.
          </p>
        </div>
        <div className="info-card" style={{ borderLeft: '4px solid #553c9a' }}>
          <h3 style={{ color: '#553c9a' }}>R — Responsivity Principle</h3>
          <p>
            Tailor interventions to the young person's learning style, cultural background, cognitive
            ability, and motivation. Use cognitive-behavioural approaches. Consider gender, age,
            trauma history, and cultural identity.
          </p>
        </div>
      </div>
    </div>
  );
}
