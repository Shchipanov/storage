const buttonElements = document.querySelectorAll('.catalog-intro__button');
const horizWrapperBtn = document.querySelector('.catalog-intro__button--horiz');
const gridWrapperBtn = document.querySelector('.catalog-intro__button--grid');
const column3Wrapper = document.querySelector('.grid-columns--col-3');

window.togglesGrid = togglesGrid;
export const togglesGrid = () => {

  if (buttonElements.length <= 0) {
    return;
  }

  horizWrapperBtn.addEventListener('click', createHorizBlock);

  gridWrapperBtn.addEventListener('click', createGridBlock);

};

const createHorizBlock = () => {
  column3Wrapper.classList.add('list-horiz');
  horizWrapperBtn.classList.add('is-active');
  gridWrapperBtn.classList.remove('is-active');
};

const createGridBlock = () => {
  column3Wrapper.classList.remove('list-horiz');
  horizWrapperBtn.classList.remove('is-active');
  gridWrapperBtn.classList.add('is-active');
};
