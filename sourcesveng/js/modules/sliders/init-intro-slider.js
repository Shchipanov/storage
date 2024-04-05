import {a11y} from './sliders-constants';

const slidersWrapper = document.querySelectorAll('.intro-slider');
const sliderTitles = document.querySelectorAll('.js-intro-title');

const initIntroSlider = () => {
  if (!slidersWrapper.length) {
    return;
  }

  slidersWrapper.forEach((slider) => {
    const container = slider.querySelector('[data-intro-slider]');
    // eslint-disable-next-line
    const swiper = new window.Swiper(container, {
      a11y,
      slidesPerView: 'auto',
      preloadImages: false,
      autoHeight: true,
      lazy: true,
      effect: 'fade',
      loop: true,
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: container.querySelector('.controls__button--next'),
        prevEl: container.querySelector('.controls__button--previous'),
      },
      pagination: {
        el: '.js-intro-pagination',
        clickable: true,
        bulletClass: 'js-intro-title',
        bulletActiveClass: 'is-active',
        renderBullet: (index, className) => {
          const text = sliderTitles[index] ? sliderTitles[index].textContent : '';
          return '<button class="' + className + '" type="button"><span>' + text + '</span></button>';
        },
      },
      breakpoints: {
        1280: {
          allowTouchMove: false,
        },
      },
    });
  });
};

window.initIntroSlider = initIntroSlider;

export {initIntroSlider};
