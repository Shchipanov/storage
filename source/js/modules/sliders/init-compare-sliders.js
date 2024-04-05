import {a11y} from './sliders-constants';
import {windowResizeListener} from '../../utils/window-resize-listener';
import {getTranslate} from '../../utils/get-translate';
import {translateRemIntoPx} from '../../utils/translate-rem-into-px';

const compareSlidersContainer = document.querySelector('[data-compare-container]');

const tabletBreakpoint = window.matchMedia('(max-width: 1023px)');
let currentWindowInnerWidth = window.innerWidth;

let swipers;
const headings = [];
const speed = 800;

// Нормализация строк

const normalizeRowElementHeight = (slides, tableEl) => {
  const table = [];

  slides.forEach((slide) => {
    const elements = slide.querySelectorAll(`${tableEl}`);

    elements.forEach((el, elIndex) => {
      const height = el.offsetHeight;

      if (!table[elIndex]) {
        table[elIndex] = [];
        table[elIndex].push(height);
      } else {
        table[elIndex].push(height);
      }
    });
  });

  table.forEach((row, rowIndex) => {
    const rowsHeightSet = new Set();

    row.forEach((el) => {
      rowsHeightSet.add(el);
    });

    if (rowsHeightSet.size > 1) {
      const values = Array.from(rowsHeightSet.values());
      const maxValue = Math.max.apply(null, values);

      slides.forEach((slide) => {
        const elements = slide.querySelectorAll(`${tableEl}`);

        elements[rowIndex].style.setProperty('height', maxValue + 'px');
      });
    }
  });
};

const normalizeRowHeight = () => {
  swipers.forEach((swiper) => {
    const slides = swiper.el.querySelectorAll('.compare-content__table-slide');

    if (slides.length) {
      normalizeRowElementHeight(slides, 'th');
      normalizeRowElementHeight(slides, 'td');
    }
  });
};

// Скрытие контента частично видимых слайдов

const updateSlideVisibility = () => {
  swipers.forEach((swiper) => {
    const slides = swiper.el.querySelectorAll('.swiper-slide');
    const swiperRightCoord = swiper.el.getBoundingClientRect().right;

    slides.forEach((slide) => {
      const slideWidth = parseFloat(getComputedStyle(slide).getPropertyValue('--slide-width'), 10);
      const slideRightCoord = slide.getBoundingClientRect().right;
      const diff = slideRightCoord - swiperRightCoord;
      const slideVisiblePart = tabletBreakpoint.matches ? 0 : 0.4;

      if (slideWidth - diff < slideWidth * slideVisiblePart) {
        slide.classList.add('is-hidden');
      } else {
        slide.classList.remove('is-hidden');
      }
    });
  });
};

// Настройка слайдеров

const tuneHeadings = () => {
  swipers.forEach((swiper) => {
    const firstSlide = swiper.el.querySelector('[data-compare-table-first-slide]');

    if (firstSlide) {
      const slideHeadings = Array.from(firstSlide.querySelectorAll('th'));

      slideHeadings.forEach((slideHeading) => {
        slideHeading.style.setProperty('transition', `transform ${speed / 1000}s ease`);
        slideHeading.style.setProperty('transform', 'translateX(0)');
        headings.push(slideHeading);
      });
    }
  });
};

const getSlidesAndSliderWithDiff = (swiper) => {
  const swiperWidth = swiper.width;
  const slidesLength = swiper.slides.length;
  const slide = swiper.el.querySelector('.swiper-slide');
  const slideWidth = translateRemIntoPx(parseFloat(getComputedStyle(slide).getPropertyValue('--slide-width'), 10));
  const spaceBetweenWidth = Number(swiper.el.dataset.spaceBetween);
  const spacesBetweenWidth = spaceBetweenWidth * (slidesLength - 1);
  const slidesWidth = slidesLength * slideWidth + spacesBetweenWidth;
  const diff = swiperWidth - slidesWidth;

  return {
    swiperWidth,
    spaceBetweenWidth,
    slideWidth,
    slidesWidth,
    diff,
  };
};

const tuneRowVisualWidth = () => {
  swipers.forEach((swiper) => {
    const controls = document.querySelectorAll('[data-compare-controls]');
    const firstSlide = swiper.el.querySelector('[data-compare-table-first-slide]');

    if (firstSlide && !tabletBreakpoint.matches) {
      const {swiperWidth, slidesWidth, diff} = getSlidesAndSliderWithDiff(swiper);

      if (diff >= 0) {
        firstSlide.style.setProperty('--visual-row-width', `${slidesWidth}px`);

        if (controls.length) {
          controls.forEach((control) => control.style.setProperty('display', 'none'));
        }
      } else {
        firstSlide.style.setProperty('--visual-row-width', `${swiperWidth}px`);

        if (controls.length) {
          controls.forEach((control) => control.style.removeProperty('display', 'none'));
        }
      }

      firstSlide.style.setProperty('--row-transition', `transform ${speed / 1000}s ease, background-color 0.3s ease`);
      firstSlide.style.setProperty('--row-transform', 'translateX(0)');
    }
  });
};

const updateSlidersTranslate = (currentSwiper) => {
  const activeIndex = currentSwiper.activeIndex;

  swipers.forEach((swiper) => {
    const firstSlide = swiper.el.querySelector('[data-compare-table-first-slide]');
    const translate = currentSwiper.wrapperEl.style.transform;
    const tx = getTranslate(translate).x;

    if (swiper !== currentSwiper) {
      swiper.slideTo(activeIndex, speed);
    }

    if (firstSlide) {
      const slideHeadings = Array.from(firstSlide.querySelectorAll('th'));

      slideHeadings.forEach((heading) => {
        heading.style.setProperty('transform', `translateX(${tx * -1}px`);
      });

      if (!tabletBreakpoint.matches) {
        firstSlide.style.setProperty('--row-transform', `translateX(${tx * -1}px`);
      }
    }
  });
};

const updateSlidesShift = () => {
  swipers.forEach((swiper) => swiper.el.style.removeProperty('padding-right'));

  if (!tabletBreakpoint.matches) {
    swipers.forEach((swiper) => {
      const {swiperWidth, slideWidth, spaceBetweenWidth, diff} = getSlidesAndSliderWithDiff(swiper);

      const slideFullWidth = slideWidth + spaceBetweenWidth;
      const shift = swiperWidth - Math.floor(swiperWidth / slideFullWidth) * slideFullWidth;

      if ((diff < 0) && shift) {
        swiper.el.style.setProperty('padding-right', shift + 'px');
      }
    });
  }
};

// Слушатели

const slideChangeHandler = (currentSwiper) => {
  updateSlidersTranslate(currentSwiper);

  let count = 0;
  const intervalId = setInterval(() => {
    count++;

    if (count === 100) {
      clearInterval(intervalId);
    } else {
      updateSlideVisibility();
    }
  }, 100);
};

const slideChangeTransitionEndHandler = () => {
  updateSlideVisibility();
};

const setEmptyCard = (slidesLength) => {
  const emptyCard = compareSlidersContainer.querySelector('[data-empty-card]');

  if (slidesLength === 1) {
    emptyCard.classList.add('is-shown');
  } else {
    emptyCard.classList.remove('is-shown');
  }
};

const checkSlidesLength = () => {
  const gallery = compareSlidersContainer.querySelector('[data-compare-gallery]');
  const slidesLength = gallery.querySelectorAll('.swiper-slide').length;

  setEmptyCard(slidesLength);
};

// Инициализация

const initCompareSlider = (slider) => {
  const swiper = new window.Swiper(slider, {
    slidesPerView: 'auto',
    grabCursor: true,
    followFinger: false,
    setWrapperSize: true,
    observer: true,

    speed,
    a11y,

    navigation: {
      prevEl: slider.querySelector('.controls__button--next'),
      nextEl: slider.querySelector('.controls__button--previous'),
    },

    pagination: {
      el: slider.querySelector('.slider-pagination'),
      clickable: true,
      bulletElement: 'button',
    },

    on: {
      slideChange: slideChangeHandler,
      slideChangeTransitionEnd: slideChangeTransitionEndHandler,
    },
  });

  swipers.push(swiper);

  return swiper;
};

const initSwipers = () => {
  const sliders = compareSlidersContainer.querySelectorAll('[data-compare-slider]');

  swipers = [];

  sliders.forEach((slider) => {
    initCompareSlider(slider);
  });

  updateSlidesShift();
  tuneRowVisualWidth();
  tuneHeadings();
  updateSlideVisibility();
  normalizeRowHeight();
  checkSlidesLength();
};

// TODO: обработка фокуса на карточках
// const documentFocusHandler = (evt) => {
//   const target = evt.target;

//   if (target.closest('.swiper-slide')) {
//     const slide = target.closest('.swiper-slide');

//     if (!slide.classList.contains('swiper-slide-active')) {
//       slide.classList.add('swiper-slide-active');
//     }
//   }
// };

const windowResizeHandler = () => {
  if (currentWindowInnerWidth !== window.innerWidth) {
    currentWindowInnerWidth = window.innerWidth;

    swipers.forEach((swiper) => swiper.destroy(true, true));
    swipers = null;

    initSwipers();
  }
};

const initCompareSliders = () => {
  if (compareSlidersContainer) {
    initSwipers();

    // document.addEventListener('focus', documentFocusHandler, true);

    windowResizeListener(windowResizeHandler);
  }
};

window.initCompareSliders = initCompareSliders;

export {initCompareSliders, swipers};
