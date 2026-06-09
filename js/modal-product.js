const modalProductWindow = document.querySelector('.modal-product');
const modalProduct = modalProductWindow.closest('.backdrop');
const modalProductBtnOpen = document.querySelectorAll('.modal-product-btn-open');
const modalProductBtnClose = document.querySelector('.modal-product-btn-close');

const modalTitle = document.querySelector('.modal-product__title');
const modalDetails = document.querySelector('.modal-product__details');
const modalLink = document.querySelector('.go-to-lorem-page'); 

const header = document.querySelector('.header');


const lockScroll = () => {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

    header.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = 'hidden';
};


const unlockScroll = () => {
  modalProduct.addEventListener(
    'transitionend',
    () => {
      document.documentElement.style.overflow = '';
    },
    { once: true }
    
  );
};

function modalProductTrapHandler(e) {
  trapFocus(e, modalProductWindow);
};


const focusableSelectors =
  'button, a[href], input, select, textarea';

function trapFocus(e, container) {
  if (e.key !== 'Tab') return;

 const focusable = [
  ...container.querySelectorAll(focusableSelectors)
  ].filter(
  el => !el.disabled && el.offsetParent !== null  &&
    !el.hidden
  );//remove disabled or with display:none elements from array , when element is removed from layout display none - it closest ancestor offset parent - becomes null


  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
};

let lastFocusedElement;

const openModal = () => {
  modalProduct.classList.remove('is-hidden');
  modalProduct.setAttribute('aria-hidden', 'false');
  lockScroll();
  
  modalProductBtnClose.focus();
  document.addEventListener('keydown', modalProductTrapHandler);//tab is pressed
};

const closeModal = () => {
  modalProduct.classList.add('is-hidden');
  modalProduct.setAttribute('aria-hidden', 'true');
  unlockScroll();

  document.removeEventListener('keydown', modalProductTrapHandler);
  
};


modalProductBtnOpen.forEach(btn => {
  btn.addEventListener('click', e => {

    lastFocusedElement = e.currentTarget;//Store the button that opened the modal:
    
    const card = e.currentTarget.closest('.product-card, .options-card');
    if (!card) return;
    const title = card.querySelector('.product-card__title-text, .options-card__title').textContent;
    const details = card.querySelector('.product-card__details, .options-card__details').innerHTML;
    
    modalTitle.innerHTML = title;
    modalDetails.innerHTML = details;
    modalLink.textContent = `To the ${title} page`;

    const imageEl = card.querySelector('.product-card__image, .options-card__image');

    if (imageEl) {
      modalProductWindow.style.backgroundImage = `url("${imageEl.src}")`;
    }

    openModal();
  });
});

modalProductBtnClose.addEventListener('click', () => {
  closeModal();
  lastFocusedElement?.focus();
})

modalProduct.addEventListener('click', (e) => {
  if (e.target === modalProduct) {
    closeModal();
    lastFocusedElement?.focus();//return tab focus on opening btn
  }
});
