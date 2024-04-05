import {Accordions} from './accordions';
let accordions;

const breakpointMd = window.matchMedia('(min-width:1023px)');
const breakpointChecker = () => {
  setTimeout(() => {
    accordions.updateAccordionsHeight();
  }, 100);
};

const initAccordions = () => {
  accordions = new Accordions();
  // Используйте в разработке экспортируемую переменную accordions, window сделан для бэкэнда
  window.accordions = accordions;

  breakpointMd.addListener(breakpointChecker);
};

window.initAccordions = initAccordions;

export {initAccordions, accordions};
