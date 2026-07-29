function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-content">
        <p class="footer-text">&copy; 2026 Gerardo Ruiz Maldonado. All rights reserved.</p>
        <p class="footer-location">San Miguel de Allende, Guanajuato, México</p>
      </div>
      
      <div class="footer-links">
        <a href="https://www.facebook.com/gerardoruizart" target="_blank" rel="noopener" class="social-link" aria-label="Facebook">Facebook</a>
        <a href="https://www.instagram.com/gerardoruizmaldonado" target="_blank" rel="noopener" class="social-link" aria-label="Instagram">Instagram</a>
        <a href="mailto:gerardoruizmaldonado.art@gmail.com" class="social-link">Email</a>
      </div>
    </div>
  `;

  // Update footer text based on language
  window.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    if (lang === 'es') {
      footer.querySelector('.footer-text').textContent = '© 2026 Gerardo Ruiz Maldonado. Todos los derechos reservados.';
      footer.querySelector('.footer-location').textContent = 'San Miguel de Allende, Guanajuato, México';
    } else {
      footer.querySelector('.footer-text').textContent = '© 2026 Gerardo Ruiz Maldonado. All rights reserved.';
      footer.querySelector('.footer-location').textContent = 'San Miguel de Allende, Guanajuato, México';
    }
  });

  return footer;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.site-footer')) {
    document.body.appendChild(createFooter());
  }
});
