import {a11y} from './sliders-constants';

const containers = document.querySelectorAll('[data-patent]');
const controls = document.querySelector('.controls--patent');

const initPatentSlider = () => {
  containers.forEach((container) => {
    // eslint-disable-next-line no-new, no-undef
    new window.Swiper(container, {
      a11y,
      slidesPerView: 'auto',
      navigation: {
        nextEl: controls.querySelector('.controls__button--next'),
        prevEl: controls.querySelector('.controls__button--previous'),
      },
      pagination: {
        el: container.querySelector('.slider-pagination'),
        clickable: true,
        bulletElement: 'button',
      },
      autoHeight: true,
    });
  });
};

window.initPatentSlider = initPatentSlider;

export {initPatentSlider};
