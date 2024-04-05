import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {CustomSelect} from './modules/select/custom-select';
import {initAccordions} from './modules/accordion/init-accordion';
import {initTabs} from './modules/tabs/init-tabs';
import {initRangeSlider} from './modules/nouislider/init-nouislader';
import {initThumbSlider} from './modules/sliders/init-thumb-slider';
import {initIntroSlider} from './modules/sliders/init-intro-slider';
import {initHeader} from './modules/header/init-header';
import {initMainNav} from './modules/header/init-main-nav';
import {initSiteSearch} from './modules/header/init-site-search';
import {initToggleBtns} from './modules/header/init-toggle-btns';
import {initPatentSlider} from './modules/sliders/init-patent-slider';
import {initModalPicture} from './modules/modals/init-modal-picture';
import {togglesGrid} from './modules/init-toggles-grid';
import {initCompareSliders} from './modules/sliders/init-compare-sliders';
import {initAccordionCtrl} from './modules/compare/init-accordion-ctrl';
// import {initDifferencesCtrl} from './modules/compare/init-differences-ctrl';
import {initMarquee} from './modules/animations/init-marquee';
import {initDynamicAdaptive} from './modules/dynamic-adaptive/init-dynamic-adaptive';
import {initTooltipsList} from './modules/tooltips/init-tooltip-list';
import {initSimilarProductsSlider} from './modules/sliders/init-similar-products-slider';
import {initCountNumber} from './modules/count-number/init-count-number';
import {initCompareHeader} from './modules/compare/init-compare-header';
// import {closedModals} from './modules/modals/closed-modals';
import {initScreenHeight} from './utils/init-screen-height';
import {uploadFile, uploadImageDrop, uploadFileDrop, uploadFileDropPreview} from './modules/input-file/init-input-file';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();
  initScreenHeight(); // инициализирует запись высоты видимой области экрана в переменную --screen-height, для установки высоты по области видимости главного экрана и сравнение/пустое
  initHeader(); // инициализирует шапку проекта и логику открытия/закрытия выпадающего меню в tablet-mobile, появления тени у шапки при скролле
  initMainNav(); // инициализирует навигацию по сайту, расположенной в шапке проекта, и логику её показа/скрытия на desktop, открытия/закрытия в tablet-mobile
  initSiteSearch(); // инициализирует логику открытия/закрытия формы поиска по сайту, расположенной в шапке проекта
  initToggleBtns(); // инициализирует логику переключения состояний toggle-элементов (используется в бургере меню, кнопках навигации по сайту в tablet-mobile)
  initIntroSlider(); // инициализирует слайдеры на главной странице в компоненте page-intro и их настройки
  initCompareHeader(); // инициализирует шапку для страницы Сравнение и логику её появления/скрытия
  initCompareSliders(); // инициализирует слайдеры на странице Сравнение, настройку и логику входящих в них элементов, синхронизирует прокрутку слайдеров
  initDynamicAdaptive();
  initTooltipsList(); // инициализирует список тултипов в слайдере на главной странице. Для каждого тултипа установит опции из customOptionsTooltip, иначе возьмет дефотные значения из файла getTooltipsOptions

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const select = new CustomSelect();
    select.init();
    initAccordions(); // инициализирует аккордеон
    initTabs(); // инициализирует табы
    initRangeSlider(); // инициализирует слайдер с ползунками раздел Фильтры
    initThumbSlider(); // инициалиализирует слайдеры с миниатюрами
    initPatentSlider(); // инициализирует слайдер с патентами на странице О компании
    initModalPicture(); // открывает патент в модальном окне на странице О компании
    togglesGrid(); // перестроение карточек в каталоге
    initAccordionCtrl(); // инициализирует логику кнопки закрытия/открытия подразделов таблицы на странице Сравнение
    // initDifferencesCtrl(); // инициализирует подсветку строк с различиями в характеристиках в таблице на странице Сравнение
    initMarquee(); // инициализирует бесконечной бегущей строки с логотипами
    initSimilarProductsSlider(); // инициализирует слайдер с похожими товарами на странице Карточка товара
    initCountNumber();
    // closedModals();
    uploadFile(); // инициализирует загрузку файлов
    uploadImageDrop(); // инициализирует загрузку файлов
    uploadFileDrop(); // инициализирует загрузку файлов
    uploadFileDropPreview(); // инициализирует загрузку файлов
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
