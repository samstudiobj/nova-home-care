// Mobile drawer navigation: open/close, focus trap, escape/overlay dismiss,
// scroll lock, focus return. Also toggles the sticky header's scrolled state.
// The nav links themselves are plain <a> elements already in the HTML —
// this only controls the drawer's open/closed presentation.

(function () {
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-drawer__close');
  const header = document.querySelector('.site-header');

  if (toggle && drawer && overlay) {
    let lastFocused = null;

    function openDrawer() {
      lastFocused = document.activeElement;
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
      const firstLink = drawer.querySelector('.nav-drawer__list a');
      if (firstLink) firstLink.focus();
      document.addEventListener('keydown', onKeydown);
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused) lastFocused.focus();
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        closeDrawer();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = drawer.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('is-open');
      isOpen ? closeDrawer() : openDrawer();
    });
    closeBtn?.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }

  if (header) {
    const setScrolled = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }
})();
