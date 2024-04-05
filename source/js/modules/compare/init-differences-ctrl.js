import {swipers} from '../sliders/init-compare-sliders';

const differencesCtrl = document.querySelector('[data-differences-ctrl]');

const highlightDifferences = (slides) => {
  const table = [];

  slides.forEach((slide) => {
    const elements = slide.querySelectorAll('td');

    elements.forEach((el, elIndex) => {
      const textContent = el.textContent;

      if (!table[elIndex]) {
        table[elIndex] = [];
        table[elIndex].push(textContent);
      } else {
        table[elIndex].push(textContent);
      }
    });
  });

  table.forEach((row, rowIndex) => {
    const rowsTextContentSet = new Set();

    row.forEach((el) => {
      rowsTextContentSet.add(el);
    });

    if (rowsTextContentSet.size > 1) {
      slides.forEach((slide) => {
        const elements = slide.querySelectorAll('tr');

        elements[rowIndex].classList.add('has-differences');
      });
    }
  });
};

const showDifferences = () => {
  swipers.forEach((swiper) => {
    const slides = swiper.el.querySelectorAll('.compare-content__table-slide');

    if (slides.length) {
      highlightDifferences(slides);
    }
  });
};

const hideDifferences = () => {
  swipers.forEach((swiper) => {
    const slides = swiper.el.querySelectorAll('.compare-content__table-slide');

    if (slides.length) {
      slides.forEach((slide) => {
        const elements = slide.querySelectorAll('tr');

        elements.forEach((el) => el.classList.remove('has-differences'));
      });
    }
  });
};

const checkInput = (ctrl) => {
  const input = ctrl.querySelector('input');

  if (!input.checked) {
    showDifferences();
  } else {
    hideDifferences();
  }
};

const documentChangeHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-differences-ctrl]')) {
    const ctrl = target.closest('[data-differences-ctrl]');

    checkInput(ctrl);
  }
};

const updateDifferencesState = () => {
  const ctrl = document.querySelector('[data-differences-ctrl]');
  checkInput(ctrl);
};

const initDifferencesCtrl = () => {
  if (differencesCtrl) {
    document.addEventListener('change', documentChangeHandler);
    updateDifferencesState();
  }
};

window.initDifferencesCtrl = initDifferencesCtrl;

export {initDifferencesCtrl};
