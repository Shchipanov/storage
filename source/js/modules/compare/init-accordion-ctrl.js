const ctrl = document.querySelector('[data-accordion-ctrl]');

const checkAvtiveEl = () => {
  const accordionParent = ctrl.closest('[data-accordion="parent"]');
  const accordionElements = Array.from(accordionParent.querySelectorAll('[data-accordion="element"]'));

  const hasActiveEl = accordionElements.some((el) => el.classList.contains('is-active'));

  return {
    accordionElements,
    hasActiveEl,
  };
};

const documentClickHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-accordion-ctrl]')) {
    const {accordionElements, hasActiveEl} = checkAvtiveEl();

    if (hasActiveEl) {
      // Закрытие аккордеона
      accordionElements.forEach((el) => {
        if (el.classList.contains('is-active')) {
          el.querySelector('[data-accordion="button"]').click();
        }
      });

      ctrl.classList.add('is-closed');
    } else {
      // Открытие аккордеона
      accordionElements.forEach((el) => {
        if (!el.classList.contains('is-active')) {
          el.querySelector('[data-accordion="button"]').click();
        }
      });

      ctrl.classList.remove('is-closed');
    }
  }

  if (target.closest('[data-accordion="button"]')) {
    const {hasActiveEl} = checkAvtiveEl();

    if (!hasActiveEl) {
      ctrl.classList.add('is-closed');
    } else {
      ctrl.classList.remove('is-closed');
    }
  }
};

const initAccordionCtrl = () => {
  if (ctrl) {
    document.addEventListener('click', documentClickHandler);
  }
};

window.initAccordionCtrl = initAccordionCtrl;

export {initAccordionCtrl};
