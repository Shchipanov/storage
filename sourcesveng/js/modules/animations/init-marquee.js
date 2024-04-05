const marqueeBlocks = document.querySelectorAll('[data-marquee]');
const RATE = 50;

const duplicateEls = (container) => {
  container.innerHTML += container.innerHTML;
};

const setAnimation = (el) => {
  const container = el.querySelector('[data-marquee-container]');
  const distance = container.clientWidth;
  const time = distance / RATE;

  duplicateEls(container);

  const cards = el.querySelectorAll('[data-marquee-part]');

  const cardWidth = cards[0].offsetWidth;

  window.gsap.to(cards, time, {
    repeat: -1,
    x: `+=${distance}`,
    ease: 'linear',
    modifiers: {
      x: window.gsap.utils.unitize(window.gsap.utils.wrap(-cardWidth, distance * 2 - cardWidth), 'px')},
  });
};

const initMarquee = () => {
  if (!marqueeBlocks) {
    return;
  }

  marqueeBlocks.forEach(setAnimation);
};

window.initMarquee = initMarquee;

export {initMarquee};
