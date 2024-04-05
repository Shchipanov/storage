// создает экземпляр для плагина TooltipJs

const initTooltip = (tooltip, options) => {
  if (!tooltip) {
    return;
  }

  const content = tooltip.querySelector('[data-tooltip="content"]');
  if (content) {
    content.classList.remove('visually-hidden');
  }
  // eslint-disable-next-line
  tippy(tooltip, options);
};

export {initTooltip};
