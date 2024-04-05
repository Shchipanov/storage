const html = document.querySelector('html');

const translateRemIntoPx = (value) => {
  const fzDefault = parseFloat(getComputedStyle(html).getPropertyValue('font-size'), 10);
  let result;

  if (fzDefault) {
    result = value * fzDefault;
  }

  return result;
};

export {translateRemIntoPx};
