const countContainers = document.querySelectorAll('[data-count="counter"]');
const buttonsCountMinus = document.querySelectorAll('[data-count="button-minus"]');
const buttonsCountPlus = document.querySelectorAll('[data-count="button-plus"]');
const countsBox = document.querySelectorAll('[data-count="count-result"]');
const counts = document.querySelectorAll('[data-count="count-result"] input');
// let value = counts.value;
let number = 1;

const initCountNumber = () => {

  for (let i = 0; i < countContainers.length; i++) {
    if (!buttonsCountMinus[i] || !buttonsCountPlus[i]) {
      return;
    } else {

      buttonsCountPlus[i].onclick = function () {
        if (number <= 50) {
          number++;
          counts[i].value = number;
          buttonsCountMinus[i].classList.remove(
              'count-number__minus--disabled'
          );
          countsBox[i].classList.remove('count-number__result--disabled');
        }
      };

      buttonsCountMinus[i].onclick = function () {
        if (number >= 1) {
          number--;
          counts[i].value = number;
          buttonsCountMinus[i].classList.remove(
              'count-number__minus--disabled'
          );
          countsBox[i].classList.remove('count-number__result--disabled');
        }


        if (number === 0) {
          buttonsCountMinus[i].classList.add('count-number__minus--disabled');
          countsBox[i].classList.add('count-number__result--disabled');
        }
      };


      /* const disabled = () => {
        if (result === 0) {
          buttonsCountMinus[i].classList.add('count-number__minus--null');
          buttonsCountMinus.style.color = '#ffffff';
        }
      };
      disabled();*/
    }
  }
};

window.initCountNumber = initCountNumber;
export {initCountNumber};
