const modalCubeSide = document.querySelector('.modal-cube-side');
const modalCubeSideBackdrop = modalCubeSide.closest('.backdrop ');

let openingModal = false;
 
function modalCubeSideTrapHandler(e) { //prevents multiple listeners
  trapFocus(e, modalCubeSideBackdrop);
}

document.addEventListener('frozen-side-created', (e) => {

  const { frozenSide } = e.detail;
     if (!frozenSide) return;


  const modalCubeSideBtnOpen = frozenSide.querySelector('.modal-cube-side-btn-open');
   
  modalCubeSideBtnOpen?.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.keyCode === 32) {
    openingModal = true;
    
  }
  });


  modalCubeSideBtnOpen?.addEventListener('click', e => {

    const originalCubeSideBtnOpen = currentSide.querySelector('.modal-cube-side-btn-open');
    lastFocusedElement = originalCubeSideBtnOpen;
    openingModal = true;
    
    const card = e.currentTarget.closest('.cube-card');
    if (!card) return;
    const title = card.querySelector('.cube-card__title').textContent;
    const link = card.querySelector('.link link--cube-card-link')?.href;
    
    modalCubeSideTitle.innerHTML = title;
    modalCubeSideLink.textContent = `To the ${title} page`;
    modalCubeSideLink.href = link; 

    const imageEl = card.querySelector('.cube-card__image');

    if (imageEl) {
     modalCubeSide.style.backgroundImage = `url("${imageEl.src}")`;
  
    } else {
    modalCubeSide.style.backgroundImage = `url("")`;
    }
    
    openmodalCubeSide();
  });


});

const modalCubeSideBtnClose = document.querySelector('.modal-cube-side-btn-close');


const modalCubeSideTitle = document.querySelector('.modal-cube-side__title');
const modalCubeSideLink = document.querySelector('.go-to-cube-page'); 


const unlockScrollCubeSide = () => {
  modalCubeSideBackdrop.addEventListener(
    'transitionend',
    () => {
      document.documentElement.style.overflow = '';
    },
    { once: true }
    
  );
};

const openmodalCubeSide = () => {
  modalCubeSideBackdrop.classList.remove('is-hidden');
  modalCubeSideBackdrop.setAttribute('aria-hidden', 'false');
  lockScroll();

  modalCubeSideBtnClose.focus();
  document.addEventListener('keydown', modalCubeSideTrapHandler);
};

const closemodalCubeSide = () => {
  modalCubeSideBackdrop.classList.add('is-hidden');
  modalCubeSideBackdrop.setAttribute('aria-hidden', 'true');
  unlockScrollCubeSide();

  document.removeEventListener('keydown', modalCubeSideTrapHandler);
};


modalCubeSideBtnClose.addEventListener('click', () => {
  closemodalCubeSide();
  lastFocusedElement?.focus();
});

modalCubeSideBackdrop.addEventListener('click', (e) => {
  if (e.target === modalCubeSideBackdrop) {
    closemodalCubeSide();
    lastFocusedElement?.focus();
  }
});