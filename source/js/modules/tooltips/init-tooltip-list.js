// создает список экземпляров для плагина TooltipJs
// список для опций плагина в custom-options-tooltip.js

import {initTooltip} from './init-tooltip';
import {getTooltipsOptions} from './get-tooltip-options';

const initTooltipsList = () => {
  const tooltipList = document.querySelectorAll('[data-tooltip="parent"]');

  if (!tooltipList.length) {
    return;
  }

  for (const tooltip of tooltipList) {
    const contentDefault = {content: tooltip.querySelector('[data-tooltip="content"]')};

    if (!contentDefault.content) {
      return;
    }

    let options = getTooltipsOptions(tooltip);

    initTooltip(tooltip, Object.assign({}, options, contentDefault));
  }
};

window.initTooltipsList = initTooltipsList;

export {initTooltipsList};
