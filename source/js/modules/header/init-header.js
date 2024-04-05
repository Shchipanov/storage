import {windowResizeListener} from '../../utils/window-resize-listener';
import {resetMainNav} from './init-main-nav';
import {closeToggleBtn} from './init-toggle-btns';
import {getBodyScrollTop} from '../../utils/get-body-scroll-top';
import {disablePageScroll, enablePageScroll, clearQueueScrollLocks, setFillGapMethod} from '../../vendor/scroll-lock';

setFillGapMethod('padding');

const header = document.querySelector('[data-header="parent"]');
const headerContainer = document.querySelector('[data-header="container"]');

const tabletBreakpoint = window.matchMedia('(max-width: 1439px)');

const headerMainNav = header && header.querySelector('[data-header="main-nav"]');
const headerMainNavToggles = headerMainNav && Array.from(headerMainNav.querySelectorAll('[data-toggle="main-nav"]'));
const headerUserLinks = header && header.querySelector('[data-header="user-links"]');
const headerToggle = header && header.querySelector('[data-toggle="header"]');

const siteSearchContent = header && header.querySelector('[data-site-search="content"]');

const updateHeaderOffset = () => {
  const headerOffset = headerContainer.offsetLeft + 'px';

  if (tabletBreakpoint.matches) {
    headerContainer.style.setProperty('--header-offset', headerOffset);
  } else {
    headerContainer.style.removeProperty('--header-offset');
  }
};

const openHeaderMenu = () => {
  window.focusLock.lock('[data-header="parent"]');

  header.classList.add('is-active');

  setTimeout(() => {
    headerMainNav.classList.add('is-shown');
    headerUserLinks.classList.add('is-shown');
  }, 100);
};

const closeHeaderMenu = () => {
  window.focusLock.unlock();

  headerMainNav.classList.remove('is-shown');
  headerUserLinks.classList.remove('is-shown');

  setTimeout(() => {
    header.classList.remove('is-active');
    resetMainNav();
  }, 300);
};

const documentClickHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-toggle="header"]') && !target.closest('[data-toggle="main-nav"]')) {
    if (header.classList.contains('is-active')) {
      clearQueueScrollLocks();
      enablePageScroll(header);

      closeHeaderMenu();

      header.classList.remove('is-shown');
    } else {
      disablePageScroll(header);

      openHeaderMenu();

      header.classList.add('is-shown');
      headerToggle.focus();
    }
  }

  if (tabletBreakpoint.matches) {
    if (target.closest('[data-site-search="close-control"]')) {
      header.classList.remove('is-shown');
    }

    if (target.closest('[data-site-search="open-control"]')) {
      header.classList.add('is-shown');
    }

    if (target.closest('[data-header-btn]')) {
      header.classList.remove('is-shown');
      closeToggleBtn(headerToggle);
      resetMainNav();
    }
  }

  if (header.classList.contains('is-active')) {
    if (
      target.closest('[data-site-search="open-control"]')
    ) {
      closeToggleBtn(headerToggle);
      closeHeaderMenu();
    } else if (
      target.closest('[data-header-btn]')
    ) {
      clearQueueScrollLocks();
      enablePageScroll(header);

      closeHeaderMenu();
    }
  }
};

const documentKeydownHandler = (evt) => {
  if (header.classList.contains('is-active') && evt.key === 'Escape') {
    if (headerMainNavToggles.some((toggle) => toggle.classList.contains('is-active'))) {
      headerMainNavToggles.forEach((toggle) => {
        if (toggle.classList.contains('is-active')) {
          toggle.click();
        }
      });
    } else {
      clearQueueScrollLocks();
      enablePageScroll(header);

      closeHeaderMenu();
      closeToggleBtn(headerToggle);
      header.classList.remove('is-shown');
    }
  }

  if (siteSearchContent.classList.contains('is-shown') && evt.key === 'Escape') {
    header.classList.remove('is-shown');
  }
};

const documentScrollHandler = () => {
  const currentScroll = getBodyScrollTop();

  if (currentScroll > 20) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
};

const updateHeaderState = () => {
  if (!tabletBreakpoint.matches) {
    if (header.classList.contains('is-active')) {
      clearQueueScrollLocks();
      enablePageScroll(header);

      closeHeaderMenu();
      closeToggleBtn(headerToggle);

      header.classList.remove('is-shown');
    }

    if (siteSearchContent.classList.contains('is-shown')) {
      header.classList.remove('is-shown');
    }
  } else {
    if (siteSearchContent.classList.contains('is-shown')) {
      header.classList.add('is-shown');
    }

    if (!headerToggle.classList.contains('is-active')) {
      resetMainNav();
    }
  }

  updateHeaderOffset();
};

const initHeader = () => {
  if (header) {
    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('scroll', documentScrollHandler);

    updateHeaderOffset();

    windowResizeListener(updateHeaderState);
  }
};

window.initHeader = initHeader;

export {initHeader};
