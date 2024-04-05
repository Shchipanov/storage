import {windowResizeListener} from '../../utils/window-resize-listener';
import {closeToggleBtn} from './init-toggle-btns';
import {disablePageScroll, enablePageScroll, clearQueueScrollLocks, setFillGapMethod} from '../../vendor/scroll-lock';

setFillGapMethod('padding');

const mainNav = {
  parent: document.querySelector('[data-main-nav="parent"]'),
};

mainNav.items = mainNav.parent && mainNav.parent.querySelectorAll('[data-main-nav="item"]');
mainNav.toggles = mainNav.parent && mainNav.parent.querySelectorAll('[data-toggle="main-nav"]');
mainNav.contents = mainNav.parent && mainNav.parent.querySelectorAll('[data-main-nav="content"]');
mainNav.links = mainNav.parent && mainNav.parent.querySelectorAll('[data-main-nav="link"]');

const header = document.querySelector('[data-header="parent"]');

const tabletBreakpoint = window.matchMedia('(max-width: 1439px)');

const resetMainNav = () => {
  mainNav.toggles.forEach((toggle) => closeToggleBtn(toggle));
  mainNav.items.forEach((item) => item.classList.remove('is-active', 'has-hover'));
  mainNav.contents.forEach((content) => {
    content.style.removeProperty('overflow');

    if (tabletBreakpoint.matches) {
      content.style.removeProperty('max-height');
    }

    content.classList.remove('is-active', 'is-shown');
  });
  header.classList.remove('has-border');
};

const openContent = (target) => {
  const item = target.closest('[data-main-nav="item"]');
  const content = item.querySelector('[data-main-nav="content"]');

  if (!tabletBreakpoint.matches) {
    item.classList.add('is-active', 'has-hover');
    content.classList.add('is-shown');
  }

  header.classList.add('has-border');
  disablePageScroll(header);
};

const closeContent = (target) => {
  const item = target.closest('[data-main-nav="item"]');
  const content = item.querySelector('[data-main-nav="content"]');

  if (!tabletBreakpoint.matches) {
    item.classList.remove('is-active', 'has-hover');
    content.classList.remove('is-shown');
  }

  header.classList.remove('has-border');
};

const documentMouseoverHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-main-nav="item"]')) {
    resetMainNav();
    openContent(target);
  }
};

const documentMouseoutHandler = (evt) => {
  const target = evt.target;
  const newTarget = evt.relatedTarget;

  if (!newTarget) {
    return;
  }

  if (target.closest('[data-main-nav="item"]') && !newTarget.closest('[data-main-nav="item"]')) {
    resetMainNav();
    closeContent(target);

    clearQueueScrollLocks();
    enablePageScroll(header);
  }
};

const documentClickHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-main-nav="item"]')) {
    const item = target.closest('[data-main-nav="item"]');
    const content = item.querySelector('[data-main-nav="content"]');

    if (!item.classList.contains('is-active')) {
      setTimeout(() => content.style.setProperty('overflow', 'visible'), 300); // для box-shadow карточек
    } else {
      content.style.removeProperty('overflow');
    }
  }

  if (target.closest('[data-main-nav="content"]') && !target.closest('[data-main-nav="content-board"]')) {
    closeContent(target);
  }
};

const documentFocusHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-main-nav="item"]')) {
    const item = target.closest('[data-main-nav="item"]');
    const content = item.querySelector('[data-main-nav="content"]');

    if (!content.classList.contains('is-active')) {
      resetMainNav();
      openContent(target);
    }
  } else {
    resetMainNav();
  }
};

const updateMainNavState = () => {
  if (!tabletBreakpoint.matches) {
    mainNav.links.forEach((link) => link.setAttribute('tabIndex', 0));

    resetMainNav();

    document.addEventListener('mouseover', documentMouseoverHandler);
    document.addEventListener('mouseout', documentMouseoutHandler);
    document.addEventListener('focus', documentFocusHandler, true);
  } else {
    mainNav.links.forEach((link) => link.removeAttribute('tabIndex'));

    document.removeEventListener('mouseover', documentMouseoverHandler);
    document.removeEventListener('mouseout', documentMouseoutHandler);
    document.removeEventListener('focus', documentFocusHandler, true);
  }
};

const documentKeydownHandler = (evt) => {
  if (!tabletBreakpoint.matches && evt.key === 'Escape') {
    resetMainNav();
  }
};

const initMainNav = () => {
  if (mainNav.parent) {
    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);

    windowResizeListener(updateMainNavState);

    updateMainNavState();
  }
};

window.initMainNav = initMainNav;

export {initMainNav, resetMainNav};
