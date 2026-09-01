const ITEMS = [
  {
    title: 'More Regular PT Periods',
    text: 'Encourage schools to provide more regular, consistent opportunities for physical activity throughout the week.',
  },
  {
    title: 'Meaningful Games Periods',
    text: 'Ensure Games periods include proper sports and physical activity, not just free, unstructured time.',
  },
  {
    title: 'Better Mass Drill Sessions',
    text: 'Encourage Mass Drill periods to be conducted regularly and with real attention, not skipped or rushed.',
  },
  {
    title: 'Variety of Activities',
    text: 'Include a mix of sports, yoga, stretching, running, exercises, drills, and team games for every student.',
  },
]

export default function Suggestions() {
  return (
    <section className="section suggestions-section">
      <div className="container">
        <div className="eyebrow-line">What we're asking for</div>
        <h2>Our Suggestions</h2>

        <div className="sugg-grid">
          {ITEMS.map((item, i) => (
            <div className="sugg-card" key={item.title}>
              <span className="sugg-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .suggestions-section { background: var(--paper-dim); }
        .suggestions-section h2 {
          font-size: clamp(32px, 4.5vw, 46px);
          margin-top: 6px;
          max-width: 560px;
        }
        .sugg-grid {
          margin-top: 52px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .sugg-card {
          background: var(--paper);
          border-radius: var(--radius-lg);
          padding: 34px 30px;
          box-shadow: var(--shadow);
          position: relative;
        }
        .sugg-index {
          font-family: 'Fraunces', serif;
          font-size: 15px;
          font-weight: 600;
          color: var(--orange);
        }
        .sugg-card h3 {
          margin-top: 14px;
          font-size: 23px;
        }
        .sugg-card p {
          margin-top: 10px;
          color: var(--ink-soft);
        }
        @media (max-width: 720px) {
          .sugg-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
