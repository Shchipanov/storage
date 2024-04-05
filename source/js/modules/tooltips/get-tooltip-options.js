// функция отдает объект настроек или дефолтные настройки

import {customOptionsTooltip, customOptionsTooltipDesktop, customOptionsTooltipMobile, customOptionsTooltipTablet} from './custom-options-tooltip';

const getTooltipsOptions = (tooltip) => {
  const optionsDefault = {
    trigger: 'click',
    hideOnClick: true,
    offset: [42, 6],
    arrow: false,
    theme: 'default',
    appendTo: 'parent',
    placement: 'bottom-start',
  };

  if (window.matchMedia('(max-width: 767px)').matches) {
    return customOptionsTooltipMobile[tooltip.dataset. tooltipOptions] || optionsDefault;
  } else if (window.matchMedia('(max-width: 1023px)').matches) {
    return customOptionsTooltipTablet[tooltip.dataset.tooltipOptions] || optionsDefault;
  } else if (window.matchMedia('(max-width: 1919px)').matches) {
    return customOptionsTooltipDesktop[tooltip.dataset.tooltipOptions] || optionsDefault;
  } else {
    return customOptionsTooltip[tooltip.dataset.tooltipOptions] || optionsDefault;
  }
};

export {getTooltipsOptions};
