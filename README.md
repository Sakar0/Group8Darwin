# Group8Darwin — Youth Justice Australia

## Project Brief

Youth Justice Australia is a personalised web resource built with ReactJS that addresses the theme of Youth Justice & Crime by providing tailored, accessible information to four distinct user groups: young people aged 10–17, parents and guardians, community and social workers, and researchers or students. The site responds to the recognised gap in clear, audience-appropriate information about Australia's youth justice system — a system in which First Nations young people are vastly over-represented and where early intervention is known to reduce reoffending rates. By asking visitors to identify their role on arrival, the application customises its content, language, and resource links to match the specific goals and literacy levels of each persona, reducing cognitive load and improving the likelihood that users find and act on relevant information. The hypothesis driving this design is: *if users can immediately access information matched to their specific role and needs, they will be more likely to understand the youth justice system and take appropriate action — whether seeking legal help, accessing support services, making referrals, or conducting research*.

---

## Site Personalisation Report

### Purpose of Site Personalisation

Youth justice is a topic that means very different things depending on who you are. A 14-year-old who has been charged with an offence needs to know their rights in plain language; a worried parent needs to understand the court process without legal jargon; a social worker needs referral pathways and evidence-based program data; a university student needs statistics, legislation, and academic references. A one-size-fits-all resource fails all four groups. Personalisation solves this by routing each visitor to content that matches their vocabulary, their urgency, and their goals — making the information actionable rather than merely available.

### Likely Users — Persona Outline

| Persona | Description |
|---|---|
| **Young Person (10–17)** | A teenager who has come into contact with police or the justice system, or who is curious about their rights. May have low reading confidence and high anxiety. |
| **Parent / Guardian** | An adult whose child has been arrested or is at risk. Stressed, time-poor, and unfamiliar with legal processes. |
| **Community / Social Worker** | A professional seeking evidence-based intervention programs, referral contacts, and outcome data to support a young client. |
| **Researcher / Student** | A university or TAFE student studying criminology, law, social work, or public policy. Needs citations, statistics, and policy frameworks. |

### User Description, Goals, Assumption & Hypothesis

**Focal user: Jordan, 15, Darwin NT**
Jordan was cautioned by police after being found with a small amount of stolen property. A youth worker at school suggested Jordan look online for information about what might happen next. Jordan has no prior knowledge of the justice system and is frightened.

- **Goal**: Understand what a caution means, whether Jordan now has a criminal record, and where to get free legal advice.
- **Assumption**: Young people in contact with the justice system often search for information online but encounter adult-oriented legal language that increases rather than reduces their anxiety.
- **Hypothesis**: If a young person can select "Young Person" on arrival and receive plain-language explanations of cautions, diversionary programs, and free legal contacts in their state, they will feel more informed and less likely to disengage from support services.

### How the Personalisation Works

1. **Persona selection screen**: On first load the site presents four clearly labelled cards. The visitor clicks the card that matches their role.
2. **Tailored content**: The application renders a completely different content module for each persona — different language level, different sections, different resource links. There is no overlap of irrelevant content.
3. **Role switching**: A persistent "Change role" button in the header lets any user switch persona at any time, supporting households where multiple people may use the same device.
4. **Always-visible emergency banner**: A crisis line banner (Kids Helpline 1800 55 1800) remains accessible regardless of persona, because a young person in distress may land on any page.
5. **Accessibility**: The site follows WCAG 2.1 AA guidelines — sufficient colour contrast, keyboard navigation, ARIA landmarks, and skip links — ensuring the site works for users with disabilities.

---

## Team

| Name | Role |
|---|---|
| Sakar | Project Coordinator |
| Samir | Research and Backend Lead |
| Aryan | UI/UX Designer |
| Rohan | Technical Lead and Front End Lead |

## Running the App Locally

```bash
cd youth-justice-app
npm install
npm start
```

## Building for Deployment

```bash
cd youth-justice-app
CI=false npm run build
cp -r build/* ../
```

The compiled build files (including `index.html`) are committed to the root of this repository and served via GitHub Pages.