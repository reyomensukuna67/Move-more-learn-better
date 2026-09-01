import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function AdminLogin({ onLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setError(error.message); return }
    onLoggedIn()
  }

  return (
    <div className="admin-login">
      <form onSubmit={handleLogin}>
        <h2>Admin Sign In</h2>
        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <div className="admin-error">{error}</div>}
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <style>{ADMIN_STYLES}</style>
    </div>
  )
}

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('signatures')
  const [signatures, setSignatures] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    setLoading(true)
    const [{ data: sigs }, { data: msgs }] = await Promise.all([
      supabase.from('signatures').select('*').order('created_at', { ascending: false }).limit(200),
      supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(200),
    ])
    setSignatures(sigs || [])
    setMessages(msgs || [])
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function reviewMessage(id, status) {
    await supabase.from('messages').update({ status, reviewed_at: new Date().toISOString() }).eq('id', id)
    loadData()
  }

  const pendingCount = messages.filter((m) => m.status === 'pending').length

  return (
    <div className="admin-dashboard">
      <div className="admin-topbar">
        <h2>Petition Admin</h2>
        <button className="btn btn-ghost" onClick={onLogout}>Sign Out</button>
      </div>

      <div className="admin-tabs">
        <button className={tab === 'signatures' ? 'active' : ''} onClick={() => setTab('signatures')}>
          Signatures ({signatures.length})
        </button>
        <button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}>
          Messages ({pendingCount} pending)
        </button>
      </div>

      {loading ? (
        <p className="admin-loading">Loading...</p>
      ) : tab === 'signatures' ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th><th>Grade</th><th>School</th><th>City</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {signatures.map((s) => (
                <tr key={s.id}>
                  <td>{s.first_name} {s.last_initial || ''}</td>
                  <td>{s.grade || '—'}</td>
                  <td>{s.school_name || '—'}</td>
                  <td>{s.city || '—'}</td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {signatures.length === 0 && <p className="admin-empty">No signatures yet.</p>}
        </div>
      ) : (
        <div className="admin-messages-list">
          {messages.map((m) => (
            <div className="admin-msg-card" key={m.id}>
              <div className="admin-msg-meta">
                <span className={`status-pill status-${m.status}`}>{m.status}</span>
                <span>{new Date(m.created_at).toLocaleString()}</span>
              </div>
              <p>{m.message}</p>
              {m.status === 'pending' && (
                <div className="admin-msg-actions">
                  <button className="btn btn-primary" onClick={() => reviewMessage(m.id, 'approved')}>Approve</button>
                  <button className="btn btn-ghost" onClick={() => reviewMessage(m.id, 'rejected')}>Reject</button>
                </div>
              )}
            </div>
          ))}
          {messages.length === 0 && <p className="admin-empty">No messages yet.</p>}
        </div>
      )}

      <style>{ADMIN_STYLES}</style>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = loading
  const [isAdmin, setIsAdmin] = useState(false)

  async function checkAdmin(sess) {
    if (!sess) { setIsAdmin(false); return }
    const { data } = await supabase.from('admins').select('user_id').eq('user_id', sess.user.id).maybeSingle()
    setIsAdmin(!!data)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      checkAdmin(session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      checkAdmin(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return <div className="admin-loading-screen">Loading...</div>

  if (!session) {
    return <AdminLogin onLoggedIn={() => {}} />
  }

  if (!isAdmin) {
    return (
      <div className="admin-login">
        <div>
          <h2>Not authorized</h2>
          <p>This account does not have admin access.</p>
          <button className="btn btn-ghost" onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
        <style>{ADMIN_STYLES}</style>
      </div>
    )
  }

  return <Dashboard onLogout={() => supabase.auth.signOut()} />
}

const ADMIN_STYLES = `
  .admin-login, .admin-loading-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--paper);
    padding: 24px;
  }
  .admin-login form, .admin-login > div {
    background: white;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    padding: 40px;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .admin-login h2 { font-size: 24px; margin-bottom: 6px; }
  .admin-login label { display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 600; }
  .admin-login input {
    padding: 11px 13px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--line);
    font-size: 15px;
    font-family: inherit;
  }
  .admin-error { color: #B3261E; font-size: 14px; }
  .admin-dashboard { min-height: 100vh; background: var(--paper); padding: 32px 24px 80px; }
  .admin-topbar { display: flex; justify-content: space-between; align-items: center; max-width: 1000px; margin: 0 auto 24px; }
  .admin-topbar h2 { font-size: 26px; }
  .admin-tabs { display: flex; gap: 10px; max-width: 1000px; margin: 0 auto 24px; }
  .admin-tabs button {
    background: white; border: 1px solid var(--line); border-radius: 999px;
    padding: 9px 18px; font-size: 14px; font-weight: 600; color: var(--ink-soft);
  }
  .admin-tabs button.active { background: var(--green); color: white; border-color: var(--green); }
  .admin-table-wrap, .admin-messages-list { max-width: 1000px; margin: 0 auto; }
  .admin-table { width: 100%; border-collapse: collapse; background: white; border-radius: var(--radius-md); overflow: hidden; }
  .admin-table th, .admin-table td { text-align: left; padding: 12px 16px; font-size: 14px; border-bottom: 1px solid var(--line); }
  .admin-table th { background: var(--paper-dim); font-weight: 600; }
  .admin-msg-card { background: white; border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 18px 20px; margin-bottom: 14px; }
  .admin-msg-meta { display: flex; gap: 12px; align-items: center; font-size: 12px; color: var(--ink-soft); margin-bottom: 8px; }
  .status-pill { padding: 3px 10px; border-radius: 999px; font-weight: 600; text-transform: capitalize; }
  .status-pending { background: #FEF3C7; color: #92400E; }
  .status-approved { background: #D1FAE5; color: #065F46; }
  .status-rejected { background: #FEE2E2; color: #991B1B; }
  .admin-msg-actions { display: flex; gap: 10px; margin-top: 12px; }
  .admin-msg-actions .btn { padding: 8px 16px; font-size: 13px; }
  .admin-empty { color: var(--ink-soft); text-align: center; padding: 40px 0; }
  .admin-loading { text-align: center; color: var(--ink-soft); }
`
