import {a11y} from './sliders-constants';
import {windowResizeListener} from '../../utils/window-resize-listener';

const similarProductsSliderContainer = document.querySelector('[data-similar-products-slider]');
const breakpoint = window.matchMedia('(max-width:1023px)');

let currentWindowInnerWidth = window.innerWidth;
let similarProductsSlider;
const speed = 800;

const initSlider = () => {
  const swiper = new window.Swiper(similarProductsSliderContainer, {
    slidesPerView: 'auto',
    grabCursor: true,
    followFinger: false,

    speed,
    a11y,

    pagination: {
      el: similarProductsSliderContainer.querySelector('.slider-pagination'),
      clickable: true,
      bulletElement: 'button',
    },
  });

  similarProductsSlider = swiper;

  return swiper;
};

const destroySlider = () => {
  if (similarProductsSlider) {
    similarProductsSlider.destroy(true, true);
    similarProductsSlider = null;
  }
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    initSlider();
  } else {
    destroySlider();
  }
};

const resizeChecker = () => {
  if (currentWindowInnerWidth !== window.innerWidth) {
    currentWindowInnerWidth = window.innerWidth;

    destroySlider();
    breakpointChecker();
  }
};

const initSimilarProductsSlider = () => {
  if (similarProductsSliderContainer) {
    windowResizeListener(resizeChecker);
    breakpointChecker();
  }
};

window.initSimilarProductsSlider = initSimilarProductsSlider;

export {initSimilarProductsSlider};
