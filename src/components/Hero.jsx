import { useEffect, useState } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className={`hero-copy ${loaded ? 'is-in' : ''}`}>
          <div className="eyebrow-line">A student-led initiative</div>
          <h1>
            Move More,<br />Learn Better
          </h1>
          <p className="hero-sub">
            Supporting healthier students through meaningful physical
            activity in schools — regular PT periods, real Games time,
            and room to move.
          </p>
          <div className="hero-actions">
            <a href="#petition" className="btn btn-primary">Support the Petition</a>
            <a href="#about" className="btn btn-ghost">Learn More</a>
          </div>
          <div className="hero-stats">
            <div><strong>PT</strong><span>Regular periods</span></div>
            <div><strong>Games</strong><span>Real activity</span></div>
            <div><strong>Drill</strong><span>Done well</span></div>
          </div>
        </div>

        <div className={`hero-art ${loaded ? 'is-in' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 420 460" className="hero-svg">
            <circle cx="210" cy="230" r="200" fill="var(--paper-dim)" />
            <g className="hero-runner">
              <path d="M120 340 Q160 250 150 190 Q145 150 175 130" stroke="var(--green)" strokeWidth="10" fill="none" strokeLinecap="round" />
              <circle cx="185" cy="105" r="26" fill="var(--green)" />
              <path d="M175 130 L120 165" stroke="var(--green)" strokeWidth="10" strokeLinecap="round" />
              <path d="M175 130 L235 150" stroke="var(--orange)" strokeWidth="10" strokeLinecap="round" />
              <path d="M150 190 L95 220" stroke="var(--orange)" strokeWidth="10" strokeLinecap="round" />
              <path d="M150 190 L205 245" stroke="var(--green)" strokeWidth="10" strokeLinecap="round" />
            </g>
            <circle cx="330" cy="120" r="20" fill="var(--yellow)" opacity="0.9" />
            <circle cx="70" cy="360" r="14" fill="var(--orange)" opacity="0.8" />
            <path d="M40 90 Q90 60 140 90" stroke="var(--green)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
            <path d="M280 380 Q330 350 380 380" stroke="var(--orange)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>
      </div>

      <style>{`
        .hero {
          padding: 72px 0 40px;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          align-items: center;
        }
        .hero-copy {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hero-copy.is-in { opacity: 1; transform: translateY(0); }
        .hero-copy h1 {
          font-size: clamp(48px, 7vw, 84px);
          font-weight: 900;
        }
        .hero-sub {
          margin-top: 22px;
          max-width: 46ch;
          font-size: 19px;
          color: var(--ink-soft);
        }
        .hero-actions {
          margin-top: 34px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .hero-stats {
          margin-top: 48px;
          display: flex;
          gap: 36px;
          flex-wrap: wrap;
        }
        .hero-stats div {
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-left: 3px solid var(--orange);
          padding-left: 12px;
        }
        .hero-stats strong {
          font-family: 'Fraunces', serif;
          font-size: 24px;
        }
        .hero-stats span {
          font-size: 13px;
          color: var(--ink-soft);
        }
        .hero-art {
          opacity: 0;
          transform: scale(0.92);
          transition: opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s;
        }
        .hero-art.is-in { opacity: 1; transform: scale(1); }
        .hero-svg { width: 100%; height: auto; }
        .hero-runner { transform-origin: center; }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-art { order: -1; max-width: 280px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
