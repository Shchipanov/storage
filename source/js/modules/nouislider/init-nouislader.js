const sliderWrappers = document.querySelectorAll('[data-range-slider]');

const dischargeString = (value) => {
  return value.replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const chargeString = (value) => {
  return value.replace(/\s/g, '');
};

const updateSlider = (sliderElement, input, index) => {
  const values = [null, null];
  values[index] = +chargeString(input.value);
  sliderElement.noUiSlider.set(values);
};

const setInputListeners = (sliderElement, inputs) => {
  inputs.forEach((input, index) => {
    input.addEventListener('change', () => {
      updateSlider(sliderElement, input, index);
    });

    input.addEventListener('blur', () => {
      updateSlider(sliderElement, input, index);
    });

    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '');
      input.value = dischargeString(input.value);
    });
  });
};

const initInputs = (sliderWrapper, sliderElement) => {
  const inputsWrapper = sliderWrapper.querySelector('[data-range-slider-inputs]');
  if (!inputsWrapper) {
    return;
  }

  const inputs = inputsWrapper.querySelectorAll('input');

  if (inputs.length !== 2) {
    // eslint-disable-next-line no-console
    console.error('Must be 2 input elements');
    return;
  }

  sliderElement.noUiSlider.on('update', (values, handle) => {
    inputs[handle].value = Math.round(values[handle]);

    inputs[handle].value = dischargeString(inputs[handle].value);
  });
  setInputListeners(sliderElement, inputs);
};

const createSLider = (sliderWrapper) => {
  const sliderElement = sliderWrapper.querySelector('[data-range-slider-element]');

  if (!sliderElement) {
    return;
  }

  const minValue = sliderElement.dataset.min;
  const maxValue = sliderElement.dataset.max;
  const step = sliderElement.dataset.step;
  const maxHandle = sliderElement.dataset.handle;

  // eslint-disable-next-line no-undef
  noUiSlider.create(sliderElement, {
    start: [+minValue, +maxHandle],
    connect: true,
    step: +step,
    range: {
      'min': +minValue,
      'max': +maxValue,
    },
  });

  initInputs(sliderWrapper, sliderElement);
};

const initRangeSlider = () => {
  if (sliderWrappers.length <= 0) {
    return;
  }

  sliderWrappers.forEach(createSLider);

};

window.initRangeSlider = initRangeSlider;

export {initRangeSlider};
