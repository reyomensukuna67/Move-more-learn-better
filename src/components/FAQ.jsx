import { useState } from 'react'

const FAQS = [
  {
    q: 'Does this campaign want to reduce academic studies?',
    a: 'No. The campaign believes academics and physical health should go hand in hand.',
  },
  {
    q: 'Why are more PT periods important?',
    a: "Regular physical activity can help support students' physical fitness, concentration, confidence, teamwork, and overall well-being.",
  },
  {
    q: 'Is this campaign against schools or teachers?',
    a: 'No. This is a positive initiative intended to encourage discussion about improving physical activity opportunities for students.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq-section">
      <div className="container">
        <div className="eyebrow-line">Common questions</div>
        <h2>Frequently Asked Questions</h2>

        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div className={`faq-item ${open === i ? 'is-open' : ''}`} key={item.q}>
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq-toggle" aria-hidden="true">{open === i ? '–' : '+'}</span>
              </button>
              {open === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-section h2 {
          font-size: clamp(30px, 4.5vw, 40px);
          margin-top: 6px;
        }
        .faq-list {
          margin-top: 40px;
          max-width: 760px;
          display: flex;
          flex-direction: column;
        }
        .faq-item {
          border-bottom: 1px solid var(--line);
        }
        .faq-question {
          width: 100%;
          background: none;
          border: none;
          padding: 22px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          text-align: left;
          font-size: 17px;
          font-weight: 600;
          color: var(--ink);
        }
        .faq-toggle {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          color: var(--orange);
          flex-shrink: 0;
        }
        .faq-answer {
          padding: 0 0 22px;
          color: var(--ink-soft);
          max-width: 60ch;
        }
      `}</style>
    </section>
  )
}
