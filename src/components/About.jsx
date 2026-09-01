const FEATURES = [
  { title: 'Better Physical Health', text: 'Regular movement supports strength, stamina, and lifelong fitness habits.', icon: 'heart' },
  { title: 'Improved Focus', text: 'Active breaks help students return to lessons more alert and engaged.', icon: 'target' },
  { title: 'Reduced Stress', text: 'Physical activity is a proven, healthy outlet for everyday school pressure.', icon: 'wave' },
  { title: 'Teamwork', text: 'Games and drills teach cooperation in ways a classroom alone cannot.', icon: 'people' },
  { title: 'Confidence', text: 'Progress on the field builds self-belief that carries into academics.', icon: 'star' },
  { title: 'Healthy Habits', text: 'Activity built into the school day becomes a habit that lasts for life.', icon: 'leaf' },
]

const ICONS = {
  heart: <path d="M12 20s-7-4.4-9.5-9C.7 7.4 2 4 5.5 4c2 0 3.4 1.2 4.5 2.7C11.1 5.2 12.5 4 14.5 4 18 4 19.3 7.4 17.5 11c-2.5 4.6-9.5 9-9.5 9z" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></>,
  wave: <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />,
  people: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M14.5 14.3c2.6.3 4.5 2.5 4.5 5.2" /></>,
  star: <path d="M12 3l2.6 5.8 6.4.6-4.8 4.3 1.4 6.3L12 16.9l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6z" />,
  leaf: <path d="M4 20c8-1 14-7 15-15C11 6 5 12 4 20z" />,
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      {ICONS[name]}
    </svg>
  )
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-head">
          <div className="eyebrow-line">The case for movement</div>
          <h2>Why Physical Activity Matters</h2>
          <p className="about-lede">
            Students already spend most of the school day sitting and studying.
            Meaningful physical activity — sport, yoga, drills, or simply room
            to move — supports fitness, concentration, confidence, teamwork,
            and overall well-being alongside academics, not instead of them.
          </p>
        </div>

        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon"><Icon name={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-head { max-width: 640px; }
        .about-head h2 {
          font-size: clamp(32px, 4.5vw, 46px);
          margin-top: 6px;
        }
        .about-lede {
          margin-top: 20px;
          font-size: 18px;
          color: var(--ink-soft);
        }
        .feature-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .feature-card {
          background: white;
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 30px 26px;
        }
        .feature-card:nth-child(3n+2) { transform: translateY(14px); }
        .feature-icon {
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          background: var(--paper-dim);
          color: var(--green);
          margin-bottom: 18px;
        }
        .feature-card h3 {
          font-size: 20px;
          margin-bottom: 8px;
        }
        .feature-card p {
          color: var(--ink-soft);
          font-size: 15px;
        }
        @media (max-width: 900px) {
          .feature-grid { grid-template-columns: repeat(2, 1fr); }
          .feature-card:nth-child(3n+2) { transform: none; }
        }
        @media (max-width: 600px) {
          .feature-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
