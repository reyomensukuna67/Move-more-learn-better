import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Counter() {
  const [target, setTarget] = useState(null)
  const [display, setDisplay] = useState(0)
  const prevTarget = useRef(0)

  useEffect(() => {
    let active = true
    async function load() {
      const { data, error } = await supabase.from('supporter_count').select('total').single()
      if (!error && active && data) setTarget(data.total)
    }
    load()

    const channel = supabase
      .channel('signatures-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'signatures' }, () => load())
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    if (target === null) return
    const from = prevTarget.current
    const to = target
    if (from === to) { setDisplay(to); return }
    const duration = 900
    const start = performance.now()
    let raf
    function tick(now) {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
      else prevTarget.current = to
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])

  return (
    <div className="counter-box">
      <div className="counter-number">
        {target === null ? '—' : display.toLocaleString()}
      </div>
      <div className="counter-label">Students Supporting the Campaign</div>

      <style>{`
        .counter-box {
          text-align: center;
          padding: 40px 30px;
          background: var(--green-deep);
          border-radius: var(--radius-lg);
          color: white;
        }
        .counter-number {
          font-family: 'Fraunces', serif;
          font-weight: 900;
          font-size: clamp(44px, 7vw, 64px);
          font-variant-numeric: tabular-nums;
        }
        .counter-label {
          margin-top: 8px;
          font-size: 15px;
          opacity: 0.85;
          letter-spacing: 0.01em;
        }
      `}</style>
    </div>
  )
}
