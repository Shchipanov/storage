import {debounce} from './debounce';

const windowResizeListener = (cb, delay) => {
  window.addEventListener('resize', debounce(() => {
    cb();
  }, delay));
};

export {windowResizeListener};
