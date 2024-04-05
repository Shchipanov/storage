function closedModals() {
  const modalRequest = document.querySelector('.modal--request-quote');
  const bodyStyle = document.querySelector('body');
  // const modalApplication = document.querySelector('.modal--application-sent');

  if (!modalRequest) {
    return;
  }

  const btnRequest = modalRequest.querySelector(
      '[data-open-modal="success"]'
  );


  // const btnApplication = modalApplication.querySelector('[data-return="catalog"]');

  // const dataModal = '--request-quote;';
  // const openModal = modal.querySelector('[data-open-modal="request-quote"]');

  btnRequest.addEventListener('click', () => {
    modalRequest.classList.remove('is-active');
    bodyStyle.style.overflow = 'inherit';
    // evt.preventDefault();
    // evt.closed(modal.querySelector('.modal--request-quote.is-active'));
    // modalRequest.style.display = 'none';
    // modal.style.zindex = 0;
  });

  // btnApplication.addEventListener('click', () => {
  // evt.preventDefault();
  // evt.closed(modal.querySelector('.modal--request-quote.is-active'));
  // modalApplication.style.display = 'none';
  // modal.style.zindex = 0;
  // });
}

export {closedModals};
