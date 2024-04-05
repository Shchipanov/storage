import {windowResizeListener} from '../../utils/window-resize-listener';
import {disablePageScroll, enablePageScroll, clearQueueScrollLocks} from '../../vendor/scroll-lock';

const header = document.querySelector('[data-header="parent"]');
const siteSearch = document.querySelector('[data-site-search="parent"]');

const breakpoint = window.matchMedia('(max-width: 1439px)');

let currentWindowInnerWidth = window.innerWidth;

const siteSearchInput = siteSearch && siteSearch.querySelector('input');
const siteSearchContent = siteSearch && siteSearch.querySelector('[data-site-search="content"]');
const siteSearchOpenCtrl = siteSearch && siteSearch.querySelector('[data-site-search="open-control"]');

const openSearchForm = () => {
  header.classList.add('has-border');
  siteSearchOpenCtrl.classList.add('is-active');
  siteSearchContent.removeAttribute('hidden');

  if (breakpoint.matches) {
    window.focusLock.lock('[data-site-search="content"]');
  } else {
    window.focusLock.lock('[data-site-search="form"]');
  }

  setTimeout(() => {
    siteSearchContent.classList.add('is-shown');
    siteSearchInput.focus();
  }, 100);
};

const closeSearchForm = () => {
  header.classList.remove('has-border');
  siteSearchOpenCtrl.classList.remove('is-active');
  siteSearchContent.classList.remove('is-shown');
  setTimeout(() => siteSearchContent.setAttribute('hidden', true), 300);

  siteSearchInput.value = '';
  window.focusLock.unlock();
};

const documentClickHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-site-search="open-control"]')) {
    evt.preventDefault();

    openSearchForm();

    if (breakpoint.matches) {
      disablePageScroll(header);
    }
  }

  if (siteSearchContent.classList.contains('is-shown')) {
    if (breakpoint.matches) {
      if (target.closest('[data-site-search="close-control"]')) {
        evt.preventDefault();
        closeSearchForm();
      }

      if (
        ((target.closest('button') && !target.classList.contains('search-form__submit')) ||
        target.closest('link[href]'))
      ) {
        if (target.closest('[data-toggle="header"]')) { // От разблокировки скролла при открытии меню
          setTimeout(() => closeSearchForm(), 300);
        } else {
          clearQueueScrollLocks();
          enablePageScroll(header);
          closeSearchForm();
        }
      }
    } else {
      if (!target.closest('[data-site-search="form"]')) {
        evt.preventDefault();
        closeSearchForm();
      }
    }
  }
};

const documentKeydownHandler = (evt) => {
  if (siteSearchContent.classList.contains('is-shown') && evt.key === 'Escape') {
    closeSearchForm();

    if (breakpoint.matches) {
      clearQueueScrollLocks();
      enablePageScroll(header);
    }
  }
};

const updateSearchFormState = () => {
  if (siteSearchContent.classList.contains('is-shown')) {
    if (breakpoint.matches) {
      disablePageScroll(header);
    } else {
      clearQueueScrollLocks();
      enablePageScroll(header);
    }

    if (currentWindowInnerWidth !== window.innerWidth) {
      currentWindowInnerWidth = window.innerWidth;

      if (breakpoint.matches) {
        window.focusLock.lock('[data-site-search="content"]');
      } else {
        window.focusLock.lock('[data-site-search="form"]');
      }
    }
  }
};

const initSiteSearch = () => {
  if (siteSearch) {
    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);

    windowResizeListener(updateSearchFormState);
  }
};

window.initSiteSearch = initSiteSearch;

export {initSiteSearch};
