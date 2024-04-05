import {getBodyScrollTop} from '../../utils/get-body-scroll-top';
import {windowResizeListener} from '../../utils/window-resize-listener';

const compareContainer = document.querySelector('[data-compare-container]');
const fixedBlock = compareContainer && compareContainer.querySelector('[data-compare-fixed]');
const controls = compareContainer && compareContainer.querySelector('[data-compare-controls]');

const compareGallery = compareContainer && compareContainer.querySelector('[data-compare-gallery]');
const compareFooter = compareContainer && compareContainer.querySelector('[data-compare-buttons]');

const tabletBreakpoint = window.matchMedia('(max-width: 1023px)');

let lastScrollTop = 0;

const getScrollDirection = (currentScroll) => {
  let direction = 'down';

  if (lastScrollTop > currentScroll) {
    direction = 'top';
  }

  lastScrollTop = currentScroll;
  return direction;
};

const setCompareOffset = () => {
  const compareOffset = compareContainer.offsetLeft + 'px';

  compareContainer.style.setProperty('--compare-offset', compareOffset);
};

const showElement = (el) => {
  const boxShadowHeight = parseInt(getComputedStyle(el).getPropertyValue('--box-shadow-height'), 10) || 0;
  const elHeight = el.offsetHeight + boxShadowHeight;
  const translate = tabletBreakpoint.matches ? -elHeight : elHeight;

  el.style.setProperty('transform', `translateY(${translate}px)`);
  el.style.setProperty('visibility', 'visible');

  if (!tabletBreakpoint.matches) {
    controls.classList.add('is-fixed');
    controls.style.setProperty('transition', 'opacity 0.6 ease');
    setTimeout(() => controls.style.setProperty('opacity', 1), 500);
  }
};

const hideElement = (el) => {
  el.style.removeProperty('transform');
  el.style.removeProperty('visibility');

  if (!tabletBreakpoint.matches) {
    controls.classList.remove('is-fixed');
    controls.style.removeProperty('opacity');
    setTimeout(() => controls.style.removeProperty('opacity'), 600);
  }
};

const updateCompareFixedBlock = () => {
  const currentScroll = getBodyScrollTop();
  const scrollDirection = getScrollDirection(currentScroll);
  const fixCompareHeaderHeight = tabletBreakpoint.matches ? compareContainer.offsetTop : (compareContainer.offsetTop + compareGallery.offsetHeight * 0.5);
  const unfixCompareHeaderHeight = tabletBreakpoint.matches ? (compareFooter.offsetTop + compareContainer.offsetTop - document.documentElement.clientHeight) : compareContainer.offsetHeight;

  if (currentScroll > fixCompareHeaderHeight && currentScroll < unfixCompareHeaderHeight) {
    if (!tabletBreakpoint.matches) {
      if (scrollDirection === 'down') {
        showElement(fixedBlock);
      } else {
        hideElement(fixedBlock);
      }
    } else {
      showElement(fixedBlock);
    }
  } else {
    hideElement(fixedBlock);
  }
};

const documentScrollHandler = () => {
  updateCompareFixedBlock();
};

const windowResizeHandler = () => {
  setCompareOffset();
  updateCompareFixedBlock();
};

const resizeObserver = new ResizeObserver(() => {
  updateCompareFixedBlock();
});

const initCompare = () => {
  if (compareContainer) {
    setCompareOffset();
    updateCompareFixedBlock();

    resizeObserver.observe(compareContainer);

    document.addEventListener('scroll', documentScrollHandler);

    windowResizeListener(windowResizeHandler);
  }
};

export {initCompare};
