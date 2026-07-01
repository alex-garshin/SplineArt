document.documentElement.classList.add('is-js');

const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.getElementById('site-menu');
const MENU_CLOSE_DURATION = 450;

if (menuToggle && menu) {
  const menuLinks = menu.querySelectorAll('.menu__link, .menu__cta');
  const closeTriggers = menu.querySelectorAll('[data-menu-close]');
  const menuPanel = menu.querySelector('.menu__panel');
  let closeTimer = null;

  const finishClose = () => {
    menu.classList.remove('is-closing');
    document.body.classList.remove('is-menu-open');
    menu.setAttribute('aria-hidden', 'true');
  };

  const openMenu = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    menu.classList.remove('is-closing');
    menu.classList.add('is-open');
    document.body.classList.add('is-menu-open');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Закрыть меню');
    menu.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    if (!menu.classList.contains('is-open') || menu.classList.contains('is-closing')) {
      return;
    }

    menu.classList.remove('is-open');
    menu.classList.add('is-closing');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Открыть меню');

    const onTransitionEnd = (event) => {
      if (event.target !== menuPanel) {
        return;
      }

      menuPanel.removeEventListener('transitionend', onTransitionEnd);
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }

      finishClose();
    };

    menuPanel.addEventListener('transitionend', onTransitionEnd);
    closeTimer = window.setTimeout(() => {
      menuPanel.removeEventListener('transitionend', onTransitionEnd);
      closeTimer = null;
      finishClose();
    }, MENU_CLOSE_DURATION + 50);
  };

  const setMenuState = (isOpen) => {
    if (isOpen) {
      openMenu();
      return;
    }

    closeMenu();
  };

  menuToggle.addEventListener('click', () => {
    setMenuState(!menu.classList.contains('is-open'));
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenuState(false);
      menuToggle.focus();
    }
  });
}

document.querySelectorAll('.service-faq').forEach((faq) => {
  const items = faq.querySelectorAll('.service-faq__item');

  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) {
        return;
      }

      items.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });
});
