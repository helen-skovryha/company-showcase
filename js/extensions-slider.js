
var cardsSlider = new Swiper(".swiper.extensions-slider", {
  effect: "creative",
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  slidesPerView: 1,
  creativeEffect: {
    limitProgress: 3,
    prev: {
      translate: ['-20%', 0, -50],
      opacity: 1,
      scale: 0.95,
      // rotate: [0, 0, 7],
    },
    next: {
      translate: ['30%', 0, -50],
      opacity: 1,
      scale: 0.95,
    },
  },
  on: {
    setTranslate: function () {
      this.slides.forEach((slide, index) => {
        const progress = slide.progress;

        slide.classList.remove("far-behind-prev", "far-behind-next", "progress-is-0", "progress-is-1", "progress-is--1" );

        if (progress <= -2) {
          slide.style.opacity = "0.2";
          slide.classList.add("far-behind-prev");
        } else if (progress >= 2) {
          slide.style.opacity = "0.2";
          slide.classList.add("far-behind-next");
        }
        else if (progress === 0) {
          slide.classList.add("progress-is-0");
        } else if (progress === 1) {
          slide.classList.add("progress-is-1");
                slide.style.transform += " translate(9%)"; 
        } 
        else if (progress === -1) {
          slide.classList.add("progress-is--1");
                    slide.style.transform += " rotate(7deg)"; 
        } 
      
      });
    },
  },

  navigation: {
    nextEl: ".extensions-navigation__button.next-ext",
    prevEl: ".extensions-navigation__button.prev-ext",
  },
  pagination: {
    el: ".extensions-pagination",
    bulletClass: "extensions-pagination__button",
    bulletActiveClass: "extensions-pagination__button--active",
    clickable: true,
  },
   mousewheel: {
    enabled: false,
  },
   keyboard: {
      enabled: false,
      onlyInViewport: true,
    },
});


function attachListeners(cardsSlider) {
  const cardsSliderContainer = document.querySelector(".swiper.extensions-slider");

  cardsSliderContainer.addEventListener("mouseenter", () => {
    cardsSlider.keyboard.enable();
    cardsSlider.mousewheel.enable();
  });

  cardsSliderContainer.addEventListener("mouseleave", () => {
    cardsSlider.keyboard.disable();
    cardsSlider.mousewheel.disable();
  });

  cardsSliderContainer.addEventListener("focusin", () => {
    cardsSlider.keyboard.enable();
    cardsSlider.mousewheel.enable();
  });

  cardsSliderContainer.addEventListener("focusout", () => {
    cardsSlider.keyboard.disable();
    cardsSlider.mousewheel.disable();
  });
};
attachListeners(cardsSlider);

