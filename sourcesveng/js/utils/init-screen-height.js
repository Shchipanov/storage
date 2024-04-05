const setHeight = () => {
  let browserHeight = window.innerHeight;
  document.documentElement.style.setProperty('--screen-height', `${browserHeight}px`);
};

export const initScreenHeight = () => {
  setHeight();
  window.addEventListener('resize', setHeight);
};
