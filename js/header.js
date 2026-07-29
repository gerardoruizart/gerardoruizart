// Language data
const languageData = {
  en: {
    home: 'Home',
    about: 'About',
    work: 'Work',
    workPainting: 'Painting',
    workSculpture: 'Sculpture',
    workGraphic: 'Graphic Arts',
    workshops: 'Workshops',
    contact: 'Contact'
  },
  es: {
    home: 'Inicio',
    about: 'Sobre el artista',
    work: 'Obra',
    workPainting: 'Pintura',
    workSculpture: 'Escultura',
    workGraphic: 'Gráfica',
    workshops: 'Talleres',
    contact: 'Contacto'
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function createHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-container">
      <div class="logo-section">
        <a href="/" class="logo-link">
          <img src="/assets/images/GR_Logo.jpg" alt="Gerardo Ruiz" class="logo">
        </a>
        <h1 class="artist-name"><a href="/" class="name-link">Gerardo Ruiz Maldonado</a></h1>
      </div>
      
      <button class="hamburger-menu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="main-nav">
        <ul class="nav-list">
          <li><a href="/" class="nav-link" data-key="home">Home</a></li>
          <li><a href="/pages/about.html" class="nav-link" data-key="about">About</a></li>
          <li class="nav-dropdown">
            <button class="nav-link nav-toggle" data-key="work">Work</button>
            <ul class="dropdown-menu">
              <li><a href="/pages/work-painting.html" class="dropdown-link" data-key="workPainting">Painting</a></li>
              <li><a href="/pages/work-sculpture.html" class="dropdown-link" data-key="workSculpture">Sculpture</a></li>
              <li><a href="/pages/work-graphic.html" class="dropdown-link" data-key="workGraphic">Graphic Arts</a></li>
            </ul>
          </li>
          <li><a href="/pages/workshops.html" class="nav-link" data-key="workshops">Workshops</a></li>
          <li><a href="/pages/contact.html" class="nav-link" data-key="contact">Contact</a></li>
        </ul>
      </nav>

      <div class="lang-toggle">
        <button class="lang-btn" data-lang="en" aria-label="Switch to English">EN</button>
        <span class="lang-separator">/</span>
        <button class="lang-btn" data-lang="es" aria-label="Cambiar a Español">ES</button>
      </div>
    </div>

    <div class="mobile-menu-overlay">
      <div class="mobile-menu-header">
        <div class="mobile-logo">
          <img src="/assets/images/GR_Logo.jpg" alt="Gerardo Ruiz" class="mobile-logo-img">
        </div>
        <div class="mobile-lang-toggle">
          <button class="lang-btn" data-lang="en" aria-label="Switch to English">EN</button>
          <span class="lang-separator">/</span>
          <button class="lang-btn" data-lang="es" aria-label="Cambiar a Español">ES</button>
        </div>
        <button class="menu-close-btn" aria-label="Close menu">&times;</button>
      </div>
      <div class="mobile-menu-content">
        <ul class="mobile-nav-list">
          <li><a href="/" class="nav-link" data-key="home">Home</a></li>
          <li><a href="/pages/about.html" class="nav-link" data-key="about">About</a></li>
          <li class="nav-dropdown">
            <button class="nav-link nav-toggle" data-key="work">Work</button>
            <ul class="dropdown-menu">
              <li><a href="/pages/work-painting.html" class="dropdown-link" data-key="workPainting">Painting</a></li>
              <li><a href="/pages/work-sculpture.html" class="dropdown-link" data-key="workSculpture">Sculpture</a></li>
              <li><a href="/pages/work-graphic.html" class="dropdown-link" data-key="workGraphic">Graphic Arts</a></li>
            </ul>
          </li>
          <li><a href="/pages/workshops.html" class="nav-link" data-key="workshops">Workshops</a></li>
          <li><a href="/pages/contact.html" class="nav-link" data-key="contact">Contact</a></li>
        </ul>
      </div>
    </div>
  `;

  setTimeout(() => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === currentLang) {
        btn.classList.add('active');
      }
    });
  }, 0);

  return header;
}

function setupHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.menu-close-btn');
  let lockedScrollY = 0;

  const openMenu = () => {
    lockedScrollY = window.scrollY;
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add('menu-open');
    overlay.classList.add('active');
  };

  const closeMenu = () => {
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    window.scrollTo(0, lockedScrollY);
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (overlay.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.mobile-nav-list .nav-link, .mobile-nav-list .dropdown-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

function initHeader() {
  if (!document.querySelector('.site-header')) {
    const header = createHeader();
    document.body.insertBefore(header, document.body.firstChild);
    setupHamburgerMenu();
    setupLanguageSwitcher();
    
    // Apply saved language on page load
    if (currentLang !== 'en') {
      setTimeout(() => {
        updateNavText(currentLang);
        const event = new CustomEvent('languageChanged', { detail: { lang: currentLang } });
        window.dispatchEvent(event);
      }, 100);
    }
  }
}

function setupLanguageSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;
      currentLang = lang;
      localStorage.setItem('lang', lang);

      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      // Update nav text
      updateNavText(lang);

      const event = new CustomEvent('languageChanged', { detail: { lang } });
      window.dispatchEvent(event);
    });
  });
}

function updateNavText(lang) {
  const navLinks = document.querySelectorAll('[data-key]');
  navLinks.forEach(link => {
    const key = link.getAttribute('data-key');
    if (languageData[lang] && languageData[lang][key]) {
      link.textContent = languageData[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', initHeader);
