import React, { useState } from 'react';

const TABS = [
  { id: 'stats', label: '📊 Statistics & Data' },
  { id: 'policy', label: '🏛️ Policy Framework' },
  { id: 'research', label: '🔬 Research & Literature' },
  { id: 'resources', label: '📚 Academic Resources' },
];

export default function ResearcherPage() {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="content-page">
      <div className="content-hero" style={{ background: 'linear-gradient(135deg, #63171b, #c53030)' }}>
        <span className="hero-icon" aria-hidden="true">📊</span>
        <h1>Research &amp; Statistics Hub</h1>
        <p>
          Comprehensive data, policy frameworks, and academic resources on youth crime and
          justice in Australia — for researchers, students, and policy analysts.
        </p>
      </div>

      <div className="tabs-container" style={{ '--tab-color': '#c53030', marginTop: 24 }}>
        <div className="tabs-list" role="tablist" aria-label="Researcher resource sections">
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
        {activeTab === 'stats' && <StatsTab />}
        {activeTab === 'policy' && <PolicyTab />}
        {activeTab === 'research' && <ResearchTab />}
        {activeTab === 'resources' && <ResourcesTab />}
      </div>
    </div>
  );
}

function StatsTab() {
  return (
    <div>
      <h2 className="section-heading">Australian Youth Justice Statistics</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">📅</span>
        <div>
          Data sourced primarily from the <strong>Australian Institute of Health and Welfare (AIHW)</strong> Youth Justice in Australia reports (most recent: 2021–22) and <strong>Australian Bureau of Statistics (ABS)</strong>. Always refer to primary sources for citations.
        </div>
      </div>

      <h3 style={{ color: '#1a365d', fontWeight: 700, marginTop: 24, marginBottom: 12, fontSize: '1.05rem' }}>
        Supervision &amp; Detention — National Snapshot (2021–22)
      </h3>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#c53030' }}>13,000+</div>
          <div className="stat-label">young people under supervision on an average day</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#2b6cb0' }}>4,791</div>
          <div className="stat-label">in community-based supervision on average day</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#c53030' }}>793</div>
          <div className="stat-label">in detention on an average day</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#e53e3e' }}>46%</div>
          <div className="stat-label">of those in detention were on remand</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#744210' }}>65%</div>
          <div className="stat-label">Aboriginal/TSI young people in detention</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#276749' }}>24x</div>
          <div className="stat-label">rate of Indigenous vs non-Indigenous youth in detention</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#553c9a' }}>77%</div>
          <div className="stat-label">of youth under supervision are male</div>
        </div>
        <div className="stat-box">
          <div className="stat-num" style={{ color: '#2b6cb0' }}>16</div>
          <div className="stat-label">median age at first supervision</div>
        </div>
      </div>

      <h3 style={{ color: '#1a365d', fontWeight: 700, marginTop: 28, marginBottom: 12, fontSize: '1.05rem' }}>
        Trends Over Time
      </h3>

      <div className="section-grid">
        <div className="info-card">
          <h3>📉 Overall Decline in Youth Crime</h3>
          <p>
            Youth crime rates in Australia have declined significantly over the past two decades.
            The number of young people under supervision fell by approximately <strong>37%</strong>
            between 2012–13 and 2021–22.
          </p>
          <p style={{ marginTop: 10 }}>
            Police-recorded youth offending has similarly declined, driven by reductions in property
            crime and decreased first-time offenders entering the system.
          </p>
        </div>

        <div className="info-card">
          <h3>📈 Indigenous Overrepresentation Worsening</h3>
          <p>
            Despite overall declining rates, the proportion of Aboriginal and Torres Strait Islander
            young people under supervision has <strong>increased</strong>. In 2012–13, they comprised
            45% of those in detention; by 2021–22 this had risen to <strong>65%</strong>.
          </p>
          <p style={{ marginTop: 10 }}>
            This reflects structural disadvantage, policing patterns, and inadequate culturally
            safe alternatives to detention.
          </p>
        </div>

        <div className="info-card">
          <h3>⚖️ Remand Growth</h3>
          <p>
            The proportion of young people held on remand has grown substantially. In 2021–22,
            46% of young people in detention had not been convicted of any offence — they were
            awaiting trial.
          </p>
          <p style={{ marginTop: 10 }}>
            This is driven by changes to bail laws (particularly in QLD, NSW, and NT) following
            high-profile incidents, and inadequate supported bail accommodation.
          </p>
        </div>

        <div className="info-card">
          <h3>🔄 Reoffending Rates</h3>
          <p>
            Within 12 months of completing supervision, approximately <strong>55%</strong> of
            young people return to supervision. This rises to approximately <strong>65%</strong>
            for those released from detention.
          </p>
          <p style={{ marginTop: 10 }}>
            Reoffending is highest among those who: entered the system at a younger age, have
            prior supervision, have co-occurring mental health/substance use, and lack stable housing.
          </p>
        </div>
      </div>

      <h3 style={{ color: '#1a365d', fontWeight: 700, marginTop: 28, marginBottom: 12, fontSize: '1.05rem' }}>
        Common Offence Types (Youth, 2021–22)
      </h3>

      <div className="info-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { type: 'Acts intended to cause injury', pct: '28%', color: '#c53030' },
            { type: 'Theft and related offences', pct: '19%', color: '#c05621' },
            { type: 'Property damage & environmental pollution', pct: '13%', color: '#744210' },
            { type: 'Unlawful entry with intent (burglary)', pct: '11%', color: '#2b6cb0' },
            { type: 'Public order offences', pct: '9%', color: '#553c9a' },
            { type: 'Drug offences', pct: '7%', color: '#276749' },
            { type: 'Other offences', pct: '13%', color: '#718096' },
          ].map((o) => (
            <div key={o.type} style={{ padding: '12px', background: '#f7fafc', borderRadius: 8, borderLeft: `3px solid ${o.color}` }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: o.color }}>{o.pct}</div>
              <div style={{ fontSize: '0.78rem', color: '#4a5568', marginTop: 4, lineHeight: 1.4 }}>{o.type}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.8rem', color: '#718096', marginTop: 12 }}>
          Source: ABS, Criminal Courts, Australia and AIHW Youth Justice in Australia 2021–22
        </p>
      </div>
    </div>
  );
}

function PolicyTab() {
  return (
    <div>
      <h2 className="section-heading">Policy Framework — Australian Youth Justice</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">🏛️</span>
        <div>
          Youth justice in Australia is primarily regulated at the <strong>state and territory level</strong>,
          with national frameworks providing overarching principles. There is no national youth justice Act.
        </div>
      </div>

      <h3 style={{ color: '#1a365d', fontWeight: 700, marginTop: 24, marginBottom: 12, fontSize: '1.05rem' }}>
        State &amp; Territory Legislation
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: 16 }}>
          <thead>
            <tr style={{ background: '#1a365d', color: 'white' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>State/Territory</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Primary Legislation</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Min. Age</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Key Feature</th>
            </tr>
          </thead>
          <tbody>
            {[
              { st: 'NSW', leg: 'Children (Criminal Proceedings) Act 1987', age: '10', feat: 'Specialist Children\'s Court; Youth Koori Court' },
              { st: 'VIC', leg: 'Children, Youth and Families Act 2005', age: '14 (raised 2024)', feat: 'Youth Justice Group Conferencing; Koori Court' },
              { st: 'QLD', leg: 'Youth Justice Act 1992', age: '10', feat: 'Restorative justice emphasis; Murri Court' },
              { st: 'WA', leg: 'Young Offenders Act 1994', age: '10', feat: 'Juvenile justice teams; intensive supervision' },
              { st: 'SA', leg: 'Youth Justice Administration Act 2016', age: '10', feat: 'Family Conference model' },
              { st: 'TAS', leg: 'Youth Justice Act 1997', age: '10', feat: 'Conferencing; small jurisdiction' },
              { st: 'ACT', leg: 'Children and Young People Act 2008', age: '12 (raised 2023)', feat: 'Community conferencing; Restorative Justice Act' },
              { st: 'NT', leg: 'Youth Justice Act 2005', age: '10', feat: 'High Indigenous rates; Don Dale controversy context' },
            ].map((r, i) => (
              <tr key={r.st} style={{ background: i % 2 === 0 ? '#f7fafc' : 'white' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700 }}>{r.st}</td>
                <td style={{ padding: '10px 14px', color: '#4a5568' }}>{r.leg}</td>
                <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700 }}>{r.age}</td>
                <td style={{ padding: '10px 14px', color: '#4a5568' }}>{r.feat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ color: '#1a365d', fontWeight: 700, marginTop: 24, marginBottom: 12, fontSize: '1.05rem' }}>
        International Frameworks
      </h3>
      <div className="section-grid">
        <div className="info-card">
          <h3>🌐 UN Convention on the Rights of the Child (UNCRC)</h3>
          <p>
            Australia ratified the UNCRC in 1990. Key relevant articles:
          </p>
          <ul style={{ marginTop: 10 }}>
            <li><strong>Art. 37:</strong> Prohibition of cruel/degrading treatment; detention as last resort</li>
            <li><strong>Art. 40:</strong> Right to fair treatment; rehabilitation focus</li>
            <li><strong>Art. 3:</strong> Best interests of the child as primary consideration</li>
          </ul>
          <p style={{ marginTop: 10, fontSize: '0.83rem', color: '#718096' }}>
            The UN Committee on the Rights of the Child has consistently called on Australia to
            raise the age of criminal responsibility to at least 14.
          </p>
        </div>

        <div className="info-card">
          <h3>📜 UN Beijing Rules (1985)</h3>
          <p>
            The Standard Minimum Rules for the Administration of Juvenile Justice. Key principles:
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>Diversion from formal proceedings where appropriate</li>
            <li>Proportionality of response</li>
            <li>Minimum use of institutionalisation</li>
            <li>Specialised training of justice professionals</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>📜 Havana Rules (1990)</h3>
          <p>
            UN Rules for the Protection of Juveniles Deprived of their Liberty. Sets minimum
            standards for conditions of detention:
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>Access to education and vocational training</li>
            <li>Medical care</li>
            <li>Contact with family</li>
            <li>Prohibition of solitary confinement</li>
          </ul>
        </div>
      </div>

      <h3 style={{ color: '#1a365d', fontWeight: 700, marginTop: 24, marginBottom: 12, fontSize: '1.05rem' }}>
        Key National Policy Developments
      </h3>
      <div className="section-grid">
        <div className="info-card">
          <h3>📋 National Agreement on Closing the Gap (2020)</h3>
          <p>
            Target 11: <em>Reduce the rate of Aboriginal and Torres Strait Islander young people
            (10–17 years) in detention by 30% by 2031.</em>
          </p>
          <p style={{ marginTop: 10 }}>
            Despite this commitment, rates have continued to worsen in most jurisdictions.
          </p>
        </div>
        <div className="info-card">
          <h3>⚖️ Raising the Age Campaign</h3>
          <p>
            Major national advocacy campaign supported by lawyers, doctors, and researchers
            to raise the minimum age of criminal responsibility from 10 to 14. 
            Victoria and ACT have legislated changes; other states under review.
          </p>
        </div>
        <div className="info-card">
          <h3>🔄 Justice Reinvestment</h3>
          <p>
            Policy approach redirecting correctional spending to prevention in high-crime
            communities. Federal government committed $25.9M to justice reinvestment trials
            (2022 Budget). Evidence from Bourke and Cowra (NSW) is positive.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResearchTab() {
  return (
    <div>
      <h2 className="section-heading">Research Landscape &amp; Key Findings</h2>

      <div className="callout info">
        <span className="callout-icon" aria-hidden="true">🔬</span>
        <div>
          This section summarises key research themes and significant Australian and international
          studies. Full citations and links are in the Resources tab.
        </div>
      </div>

      <div className="section-grid" style={{ marginTop: 20 }}>
        <div className="info-card">
          <span className="card-tag" style={{ background: '#ebf8ff', color: '#2b6cb0' }}>Developmental Criminology</span>
          <h3>Pathways into and out of Offending</h3>
          <p>
            Moffitt's (1993) influential dual-taxonomy theory distinguishes "adolescence-limited"
            offenders (most youth) from "life-course persistent" offenders (small minority). The
            majority of youth offending is transitory and ceases with maturation.
          </p>
          <p style={{ marginTop: 10 }}>
            Australian studies confirm this pattern — most first-time youth offenders do not
            progress to adult criminal careers when early intervention is available.
          </p>
        </div>

        <div className="info-card">
          <span className="card-tag" style={{ background: '#faf5ff', color: '#553c9a' }}>Neuroscience</span>
          <h3>Adolescent Brain Development</h3>
          <p>
            Neuroscientific research (Casey et al., 2008; Steinberg, 2009) demonstrates that
            the prefrontal cortex — governing impulse control, risk assessment, and future planning
            — does not fully mature until the mid-20s.
          </p>
          <p style={{ marginTop: 10 }}>
            This has significant implications for culpability, sentencing, and rehabilitation
            approaches. Courts are increasingly required to consider brain development.
          </p>
        </div>

        <div className="info-card">
          <span className="card-tag" style={{ background: '#fff5f5', color: '#c53030' }}>Indigenous Justice</span>
          <h3>Structural Drivers of Overrepresentation</h3>
          <p>
            Weatherburn et al. (BOCSAR) and Snowball (2008) demonstrate that Indigenous youth
            overrepresentation is primarily explained by socioeconomic disadvantage, child protection
            involvement, and policing patterns — not by ethnicity per se.
          </p>
          <p style={{ marginTop: 10 }}>
            The Royal Commission into the Protection and Detention of Children in the NT (2017)
            documented systematic abuse and called for transformative reform.
          </p>
        </div>

        <div className="info-card">
          <span className="card-tag" style={{ background: '#fffbeb', color: '#744210' }}>Desistance</span>
          <h3>What Helps Young People Stop Offending</h3>
          <p>
            Desistance research (Maruna, 2001; Laub & Sampson, 2003) identifies key turning points:
            employment, stable relationships, parenthood, identity shifts, and social bonds.
          </p>
          <p style={{ marginTop: 10 }}>
            Australian applications (e.g., Halsey, 2006; Richards, 2011) emphasise cultural
            connection and community support as additional desistance factors for Indigenous youth.
          </p>
        </div>

        <div className="info-card">
          <span className="card-tag" style={{ background: '#f0fff4', color: '#276749' }}>Restorative Justice</span>
          <h3>Evidence for Conferencing</h3>
          <p>
            The Canberra Re-Integrative Shaming Experiments (RISE; Sherman et al.) and subsequent
            Australian studies demonstrate that Youth Justice Conferencing achieves:
          </p>
          <ul style={{ marginTop: 10 }}>
            <li>Higher victim satisfaction than courts</li>
            <li>Lower reoffending rates (particularly for property crimes)</li>
            <li>Greater procedural justice perceptions</li>
            <li>More compliance with agreed outcomes</li>
          </ul>
        </div>

        <div className="info-card">
          <span className="card-tag" style={{ background: '#ebf8ff', color: '#2b6cb0' }}>Economic Analysis</span>
          <h3>Cost-Benefit of Prevention vs. Incarceration</h3>
          <p>
            Allen Consulting Group (2003) and KPMG analyses show prevention programs deliver
            returns of $3–$7 for every dollar invested through reduced crime costs, decreased
            welfare dependence, and increased productivity.
          </p>
          <p style={{ marginTop: 10 }}>
            Maranguka Justice Reinvestment (Deloitte, 2018): $3.1M investment generated $14.7M
            in economic and social value.
          </p>
        </div>
      </div>

      <h2 className="section-heading" style={{ marginTop: 28 }}>Current Research Gaps</h2>
      <div className="callout warning">
        <span className="callout-icon" aria-hidden="true">🔍</span>
        <div>
          Identified gaps in Australian youth justice research:
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Longitudinal studies of post-custody outcomes for Indigenous youth</li>
            <li>Gendered pathways into the justice system for girls and gender-diverse youth</li>
            <li>Impact of digital technology and cybercrime on youth offending</li>
            <li>Cost-effectiveness data for specific diversion programs at scale</li>
            <li>Mental health intervention outcomes within justice settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ResourcesTab() {
  return (
    <div>
      <h2 className="section-heading">Academic &amp; Research Resources</h2>

      <div className="callout success">
        <span className="callout-icon" aria-hidden="true">📚</span>
        <div>
          Links to freely accessible databases, reports, and academic materials on Australian
          youth justice. Many are government sources with open access.
        </div>
      </div>

      {[
        {
          category: 'Government Data & Reports',
          color: '#2b6cb0',
          items: [
            { name: 'AIHW Youth Justice in Australia', url: 'https://www.aihw.gov.au/reports-data/health-welfare-services/youth-justice', desc: 'Annual national statistical report — most authoritative source' },
            { name: 'ABS Criminal Courts, Australia', url: 'https://www.abs.gov.au/statistics/people/crime-and-justice/criminal-courts-australia', desc: 'Court statistics including youth court data' },
            { name: 'ABS Recorded Crime — Offenders', url: 'https://www.abs.gov.au/statistics/people/crime-and-justice/recorded-crime-offenders', desc: 'Police-recorded offending by age group' },
            { name: 'BOCSAR (NSW Bureau of Crime Statistics)', url: 'https://www.bocsar.nsw.gov.au', desc: 'Detailed NSW crime data and research reports' },
            { name: 'Don Dale Royal Commission Final Report (2017)', url: 'https://www.childdetentionnt.gov.au', desc: 'Landmark report on NT youth detention conditions' },
          ],
        },
        {
          category: 'Peak Bodies & Policy Organisations',
          color: '#276749',
          items: [
            { name: 'Youth Justice Coalition Australia', url: 'https://yjcoalition.org.au', desc: 'Policy advocacy and research summaries' },
            { name: 'Australian Child Rights Taskforce', url: 'https://www.childrights.org.au', desc: 'UNCRC compliance monitoring and reports' },
            { name: 'NACCHO — Aboriginal Health', url: 'https://www.naccho.org.au', desc: 'Indigenous health and justice intersections' },
            { name: 'Australian Human Rights Commission', url: 'https://humanrights.gov.au', desc: 'Rights-based analysis and reports' },
            { name: 'Raise the Age Campaign', url: 'https://raisetheage.org.au', desc: 'Evidence base for raising age of criminal responsibility' },
          ],
        },
        {
          category: 'Academic Journals & Research Centres',
          color: '#553c9a',
          items: [
            { name: 'Australian & NZ Journal of Criminology', url: 'https://journals.sagepub.com/home/anz', desc: 'Peer-reviewed criminology — open access articles available' },
            { name: 'Current Issues in Criminal Justice', url: 'https://www.tandfonline.com/journals/rcic20', desc: 'Australian criminal justice research' },
            { name: 'AIC (Australian Institute of Criminology)', url: 'https://www.aic.gov.au', desc: 'Government criminology research institute — free reports' },
            { name: 'Griffith Criminology Institute', url: 'https://www.griffith.edu.au/criminology-law/griffith-criminology-institute', desc: 'Leading Australian criminology research' },
            { name: 'UNSW Tyree Energy Technologies Building (ETB)', url: 'https://www.unsw.edu.au/arts-design-architecture/our-schools/social-sciences/our-research/criminology-criminal-justice', desc: 'Youth justice and criminology research' },
          ],
        },
        {
          category: 'International Comparative Resources',
          color: '#c53030',
          items: [
            { name: 'UNICEF — Child Justice', url: 'https://www.unicef.org/child-protection/child-justice', desc: 'International child justice standards and data' },
            { name: 'UNODC — Juvenile Justice', url: 'https://www.unodc.org/unodc/en/justice-and-prison-reform/juvenile_justice.html', desc: 'UN standards and guidelines' },
            { name: 'Campbell Collaboration — Crime & Justice', url: 'https://www.campbellcollaboration.org/better-evidence/justice.html', desc: 'Systematic reviews of intervention effectiveness' },
            { name: 'Youth Justice (UK journal)', url: 'https://journals.sagepub.com/home/yjj', desc: 'Comparative international youth justice research' },
          ],
        },
      ].map((section) => (
        <div key={section.category} style={{ marginBottom: 28 }}>
          <h3 style={{ color: section.color, fontWeight: 700, fontSize: '1rem', marginBottom: 12, borderBottom: `2px solid ${section.color}`, paddingBottom: 8 }}>
            {section.category}
          </h3>
          <ul className="resource-list">
            {section.items.map((item) => (
              <li key={item.name}>
                <div>
                  <div className="resource-name">{item.name}</div>
                  <div className="resource-desc">{item.desc}</div>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: section.color, whiteSpace: 'nowrap', marginLeft: 12 }}>
                  Visit →
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="callout info" style={{ marginTop: 8 }}>
        <span className="callout-icon" aria-hidden="true">📝</span>
        <div>
          <strong>Citation guidance:</strong> When citing AIHW data, use: Australian Institute of Health and Welfare [year]. <em>Youth justice in Australia [year]</em>. Cat. no. JUV [n]. Canberra: AIHW.
          For ABS: Australian Bureau of Statistics [year]. <em>[Report name]</em>. Canberra: ABS.
        </div>
      </div>
    </div>
  );
}
