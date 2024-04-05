const DELAY = 100;

const debounce = (cb, delay) => {
  const timerDelay = delay ? delay : DELAY;

  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(cb, timerDelay);
  };
};

export {debounce};
