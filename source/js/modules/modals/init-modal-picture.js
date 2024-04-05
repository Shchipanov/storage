function initModalPicture() {
  const modal = document.querySelector('.modal--picture');

  if (!modal) {
    return;
  }

  const modalImg = modal.querySelector('.modal img');

  const showBigPicture = (img) => {
    modalImg.src = img.currentSrc;
    modalImg.alt = img.alt;
  };

  document.addEventListener('click', (evt) => {
    const image = evt.target.closest('[data-open-modal="picture"] img');

    if (image) {
      showBigPicture(image);
    }
  });
}

window.initModalPicture = initModalPicture;

export {initModalPicture};
