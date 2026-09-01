export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true" />
            Move More, Learn Better
          </div>
          <div className="footer-links">
            <a href="#about">About the Campaign</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#contact">Contact</a>
            <a href="#disclaimer">Disclaimer</a>
          </div>
        </div>

        <p className="disclaimer" id="disclaimer">
          This is an independent student-led initiative created to encourage
          discussion about physical activity and student well-being. It does
          not officially represent any school or government organization.
        </p>

        <p className="copyright">© {new Date().getFullYear()} Move More, Learn Better.</p>
      </div>

      <style>{`
        .site-footer {
          background: var(--ink);
          color: rgba(247, 245, 239, 0.75);
          padding: 56px 0 32px;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(247, 245, 239, 0.15);
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Fraunces', serif;
          font-weight: 700;
          color: var(--paper);
        }
        .brand-mark {
          width: 12px; height: 12px;
          border-radius: 3px;
          background: var(--orange);
          transform: rotate(45deg);
        }
        .footer-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          font-size: 14px;
        }
        .footer-links a { text-decoration: none; color: inherit; }
        .footer-links a:hover { color: var(--paper); }
        .disclaimer {
          margin-top: 28px;
          font-size: 13px;
          max-width: 60ch;
          line-height: 1.7;
        }
        .copyright {
          margin-top: 20px;
          font-size: 12px;
          opacity: 0.6;
        }
      `}</style>
    </footer>
  )
}
