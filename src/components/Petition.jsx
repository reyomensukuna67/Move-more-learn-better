import { useEffect, useRef, useState } from 'react'
import { FUNCTIONS_URL, supabase } from '../lib/supabase'
import Counter from './Counter'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

function useTurnstile(onToken) {
  const ref = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    if (window.turnstile && ref.current && widgetId.current === null) {
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        callback: onToken,
        'expired-callback': () => onToken(''),
      })
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.onload = () => {
      if (ref.current && widgetId.current === null) {
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          callback: onToken,
          'expired-callback': () => onToken(''),
        })
      }
    }
    document.body.appendChild(script)
  }, [onToken])

  const reset = () => {
    if (window.turnstile && widgetId.current !== null) {
      window.turnstile.reset(widgetId.current)
    }
  }

  return { ref, reset }
}

export default function Petition() {
  const [form, setForm] = useState({
    firstName: '', lastInitial: '', grade: '', schoolName: '', city: '',
    supports: false, message: '',
  })
  const [captchaToken, setCaptchaToken] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const { ref: turnstileRef, reset: resetCaptcha } = useTurnstile(setCaptchaToken)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')

    if (!form.firstName.trim()) {
      setErrorMsg('Please enter your first name.')
      return
    }
    if (!form.supports) {
      setErrorMsg('Please check the box to confirm your support.')
      return
    }
    if (!captchaToken) {
      setErrorMsg('Please complete the verification check.')
      return
    }

    setStatus('submitting')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(FUNCTIONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ ...form, captchaToken }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Submission failed')

      setStatus('success')
      setForm({ firstName: '', lastInitial: '', grade: '', schoolName: '', city: '', supports: false, message: '' })
      resetCaptcha()
      setCaptchaToken('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className="section petition-section" id="petition">
      <div className="container petition-grid">
        <div className="petition-intro">
          <div className="eyebrow-line">Add your voice</div>
          <h2>Support Healthier Schools</h2>
          <p>
            Join students who believe that physical health should be an
            important part of education.
          </p>

          <div className="petition-counter-wrap">
            <Counter />
          </div>

          <div className="privacy-note">
            <strong>Privacy note:</strong> We only collect the minimum needed
            to count support — a first name and optional details. We never
            ask for phone numbers, home addresses, or passwords.
          </div>
        </div>

        <div className="petition-form-wrap">
          {status === 'success' ? (
            <div className="success-box">
              <h3>Thank you!</h3>
              <p>Your support has been added to the campaign.</p>
              <button className="btn btn-ghost" onClick={() => setStatus('idle')}>
                Add another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="petition-form">
              <div className="form-row">
                <label>
                  First name
                  <input
                    type="text" required maxLength={60}
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    placeholder="e.g. Aarav"
                  />
                </label>
                <label>
                  Last initial <span className="optional">(optional)</span>
                  <input
                    type="text" maxLength={3}
                    value={form.lastInitial}
                    onChange={(e) => update('lastInitial', e.target.value)}
                    placeholder="e.g. K"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Class / Grade <span className="optional">(optional)</span>
                  <input
                    type="text" maxLength={30}
                    value={form.grade}
                    onChange={(e) => update('grade', e.target.value)}
                    placeholder="e.g. 9th"
                  />
                </label>
                <label>
                  City <span className="optional">(optional)</span>
                  <input
                    type="text" maxLength={100}
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    placeholder="e.g. Kanpur"
                  />
                </label>
              </div>

              <label>
                School name <span className="optional">(optional)</span>
                <input
                  type="text" maxLength={150}
                  value={form.schoolName}
                  onChange={(e) => update('schoolName', e.target.value)}
                  placeholder="Your school"
                />
              </label>

              <label>
                Why do you support this? <span className="optional">(optional, shown only after review)</span>
                <textarea
                  maxLength={500} rows={3}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Share a short message..."
                />
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={form.supports}
                  onChange={(e) => update('supports', e.target.checked)}
                />
                <span>I support improving regular physical activity opportunities for students.</span>
              </label>

              <div ref={turnstileRef} className="turnstile-box" />

              {errorMsg && <div className="form-error">{errorMsg}</div>}

              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Adding your support...' : 'Add My Support'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .petition-section { background: var(--green-deep); color: white; }
        .petition-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 48px;
        }
        .petition-intro .eyebrow-line { color: var(--yellow); }
        .petition-intro .eyebrow-line::before { background: var(--yellow); }
        .petition-intro h2 {
          color: white;
          font-size: clamp(32px, 4.5vw, 46px);
          margin-top: 6px;
        }
        .petition-intro > p {
          margin-top: 16px;
          font-size: 18px;
          opacity: 0.85;
          max-width: 42ch;
        }
        .petition-counter-wrap { margin-top: 36px; }
        .petition-counter-wrap .counter-box { background: rgba(255,255,255,0.08); }
        .privacy-note {
          margin-top: 28px;
          font-size: 14px;
          opacity: 0.8;
          border-left: 3px solid var(--yellow);
          padding-left: 14px;
          max-width: 42ch;
        }
        .petition-form-wrap {
          background: white;
          color: var(--ink);
          border-radius: var(--radius-lg);
          padding: 36px;
          box-shadow: var(--shadow);
        }
        .petition-form { display: flex; flex-direction: column; gap: 18px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        label { display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600; }
        .optional { font-weight: 400; color: var(--ink-soft); }
        input[type="text"], textarea {
          font-family: inherit;
          font-size: 15px;
          font-weight: 400;
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--line);
          background: var(--paper);
          color: var(--ink);
          resize: vertical;
        }
        input[type="text"]:focus, textarea:focus {
          outline: none;
          border-color: var(--green);
        }
        .checkbox-row {
          flex-direction: row;
          align-items: flex-start;
          gap: 10px;
          font-weight: 500;
        }
        .checkbox-row input { margin-top: 3px; width: 18px; height: 18px; accent-color: var(--green); }
        .turnstile-box { min-height: 65px; }
        .form-error {
          background: #FDECEA;
          color: #B3261E;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 14px;
        }
        .btn-block { width: 100%; }
        .success-box { text-align: center; padding: 40px 20px; }
        .success-box h3 { font-size: 28px; margin-bottom: 10px; }
        .success-box p { color: var(--ink-soft); margin-bottom: 24px; }
        @media (max-width: 860px) {
          .petition-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
