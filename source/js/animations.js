function checkAnimationByClass(className) {
  const animationContainers = document.querySelectorAll(className);

  function checkAnimation(elements) {
    if (elements.length > 0) {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const triggerHeight = windowHeight * 0.5;

        if (rect.top < windowHeight - triggerHeight && rect.bottom >= triggerHeight) {
          element.classList.add('is-animated');
        } else {
          element.classList.remove('is-animated');
        }
      });
    }
  }

  window.addEventListener('scroll', function () {
    checkAnimation(animationContainers);
  });

  window.addEventListener('resize', function () {
    checkAnimation(animationContainers);
  });

  checkAnimation(animationContainers);
}

export {checkAnimationByClass};
