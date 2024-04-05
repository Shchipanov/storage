import {a11y} from './sliders-constants';

const slidersWrapper = document.querySelectorAll('.slider');

const initThumbSlider = () => {

  if (!slidersWrapper.length) {
    return;
  }

  slidersWrapper.forEach((slider) => {
    const containerThumbs = slider.querySelector('.slider__thumbs');
    const container = slider.querySelector('[data-slider]');
    // eslint-disable-next-line no-new, no-undef
    new window.Swiper(container, {
      a11y,
      slidesPerView: 'auto',
      loop: true,
      preloadImages: false,
      lazy: true,
      observer: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      thumbs: {
        swiper: {
          el: containerThumbs,
          slidesPerView: 'auto',
        },
      },
      pagination: {
        el: container.querySelector('.slider-pagination'),
        clickable: true,
        bulletElement: 'button',
      },
      navigation: {
        nextEl: container.querySelector('.controls__button--next'),
        prevEl: container.querySelector('.controls__button--previous'),
      },
    });
  });
};

window.initThumbSlider = initThumbSlider;

export {initThumbSlider};
