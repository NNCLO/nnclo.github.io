export function SiteFooter() {
  return (
    <section className="sblock" data-s="footer" aria-labelledby="footer-title">
      <p className="sec-lbl">// eof</p>
      <footer className="card footer-card">
        <nav className="footer-nav" aria-label="Footer">
          <button type="button" className="footer-nav-item">
            SHOP
          </button>
          <button type="button" className="footer-nav-item">
            BLOG
          </button>
        </nav>
        <p className="footer-by">
          By: <strong>_n.clo</strong> – Hybrid Dev –
        </p>
        <p className="footer-by-sub">Pixel &nbsp;/&nbsp; Code &nbsp;/&nbsp; Data</p>
        <div className="footer-sep" aria-hidden="true" />
        <h2 className="footer-brand" id="footer-title">
          NNX<span className="dot"> .</span>ROOT
        </h2>
        <p className="footer-tag">Web Architecture Studio</p>
        <p className="footer-copy">
          © 2026 — <span>All systems operational</span>
        </p>
      </footer>
    </section>
  )
}
