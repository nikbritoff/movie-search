function Header() {
  return (
    <header>
      <nav>
        <div className="nav-wrapper teal darken-3">
          <a href="/#" className="brand-logo center">
            <img src="/logo.png" alt="Cinema Search" width={'50px'}></img>
          </a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a href="https://spb.hh.ru/resume/276696dcff07a7628d0039ed1f755a79383538">Резюме</a></li>
            <li><a href="https://github.com/nikbritoff">GitHub</a></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;
