function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="page-footer teal darken-3">
      <div className="footer-copyright">
        <div className="container">
          © {currentYear} Никита Бритов
          <a className="grey-text text-lighten-4 right" href="https://github.com/nikbritoff">Мой GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
