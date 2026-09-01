export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          Move More, Learn Better
        </a>
        <nav className="nav-links">
          <a href="#about">Why It Matters</a>
          <a href="#suggestions">Suggestions</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#petition" className="btn btn-primary nav-cta">Support the Petition</a>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(247, 245, 239, 0.85);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-top: 16px;
          padding-bottom: 16px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: 17px;
          text-decoration: none;
        }
        .brand-mark {
          width: 12px; height: 12px;
          border-radius: 3px;
          background: var(--orange);
          transform: rotate(45deg);
        }
        .nav-links {
          display: flex;
          gap: 28px;
          font-size: 15px;
          font-weight: 500;
        }
        .nav-links a { text-decoration: none; color: var(--ink-soft); }
        .nav-links a:hover { color: var(--ink); }
        .nav-cta { padding: 10px 20px; font-size: 14px; }
        @media (max-width: 720px) {
          .nav-links { display: none; }
        }
      `}</style>
    </header>
  )
}
