const toggleBtns = document.querySelectorAll('[data-toggle]');

const openToggleBtn = (toggleBtn) => {
  const name = toggleBtn.dataset.labelName;

  toggleBtn.setAttribute('aria-pressed', 'true');
  toggleBtn.setAttribute('aria-label', `Закрыть ${name ? name : 'Меню'}`);
  toggleBtn.classList.add('is-active');
};

const closeToggleBtn = (toggleBtn) => {
  const name = toggleBtn.dataset.labelName;

  toggleBtn.setAttribute('aria-pressed', 'false');
  toggleBtn.setAttribute('aria-label', `Открыть ${name ? name : 'Меню'}`);
  toggleBtn.classList.remove('is-active');
};

const documentClickHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-toggle]')) {
    const toggleBtn = evt.target.closest('[data-toggle]');

    if (toggleBtn.getAttribute('aria-pressed') === 'true') {
      closeToggleBtn(toggleBtn);
    } else {
      openToggleBtn(toggleBtn);
    }
  }
};

const initToggleBtns = () => {
  if (toggleBtns) {
    document.addEventListener('click', documentClickHandler);
  }
};

window.initToggleBtns = initToggleBtns;

export {initToggleBtns, closeToggleBtn};
