import {windowResizeListener} from '../../utils/window-resize-listener';

const body = document.body;
const header = document.querySelector('header');
const headerDefaultHeight = parseInt(getComputedStyle(body).getPropertyValue('--header-height'), 10);

const tabletBreakpoint = window.matchMedia('(max-width: 1439px)');

const updateHeaderHeightVar = () => {
  if (!tabletBreakpoint.matches) {
    if (
      (header.clientHeight - headerDefaultHeight) > 5
    ) {
      body.style.setProperty('--header-height', header.clientHeight + 'px');
    }
  } else {
    body.style.removeProperty('--header-height');
  }
};

const initHeaderHeight = () => {
  if (header) {
    windowResizeListener(updateHeaderHeightVar);

    updateHeaderHeightVar();
  }
};

export {initHeaderHeight};
