var productSlider = new Swiper(".swiper.product-slider", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
   grid: { rows: 3 },
  breakpoints: {
     768: {
        slidesPerView: 2,
        spaceBetween: 32,
        grid: { rows: 2 },
      },
    920: {
        slidesPerView: 3,
        spaceBetween: 32,
        grid: { rows: 2 },
    },
    1280: {
      slidesPerView: 3,
           spaceBetween: 32,
        grid: { rows: 2 },
    }
  },
  pagination: {
    el: ".product-pagination",
    bulletClass: "product-pagination__button",
    bulletActiveClass: "product-pagination__button--active",
    clickable: 'true',
    dynamicMainBullets: 3,
       renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
  },

  navigation: {
    nextEl: ".product-navigation-button.next-product",
    prevEl: ".product-navigation-button.prev-product",
  },
   mousewheel: {
    enabled: false,
  },
   keyboard: {
      enabled: false,
      onlyInViewport: true,
    },
});


function attachproductListeners(productSlider) {
  const productSliderContainer = document.querySelector(".swiper.product-slider");

  productSliderContainer.addEventListener("mouseenter", () => {
    productSlider.keyboard.enable();
    productSlider.mousewheel.enable();
  });

  productSliderContainer.addEventListener("mouseleave", () => {
    productSlider.keyboard.disable();
    productSlider.mousewheel.disable();
  });

  productSliderContainer.addEventListener("focusin", () => {
    productSlider.keyboard.enable();
    productSlider.mousewheel.enable();
  });

  productSliderContainer.addEventListener("focusout", () => {
    productSlider.keyboard.disable();
    productSlider.mousewheel.disable();
  });
};
attachproductListeners(productSlider);