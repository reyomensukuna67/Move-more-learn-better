import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Messages() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    supabase
      .from('public_messages')
      .select('id, message, created_at')
      .then(({ data }) => setMessages(data || []))
  }, [])

  if (messages.length === 0) return null

  return (
    <section className="section messages-section">
      <div className="container">
        <div className="eyebrow-line">In their words</div>
        <h2>Why Students Support This</h2>
        <div className="msg-grid">
          {messages.map((m) => (
            <blockquote className="msg-card" key={m.id}>
              “{m.message}”
            </blockquote>
          ))}
        </div>
      </div>
      <style>{`
        .messages-section h2 {
          font-size: clamp(30px, 4.5vw, 40px);
          margin-top: 6px;
        }
        .msg-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .msg-card {
          margin: 0;
          background: white;
          border-radius: var(--radius-md);
          border: 1px solid var(--line);
          padding: 26px;
          font-family: 'Fraunces', serif;
          font-size: 17px;
          font-style: italic;
          color: var(--ink);
        }
        @media (max-width: 860px) {
          .msg-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
