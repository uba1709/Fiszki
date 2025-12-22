export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-credit">© {year} <span className="name">Jakub Piwoński</span></p>
        <ul className="footer-links" aria-label="Linki społecznościowe">
          <li>
            <a href="https://www.instagram.com/jak.u.b.p/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}