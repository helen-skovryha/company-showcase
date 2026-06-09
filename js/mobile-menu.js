const mobileMenuWindow = document.querySelector('.mobile-menu');
const mobileMenuBackdrop = mobileMenuWindow.closest('.backdrop');
const mobileMenuBtnOpen = document.querySelectorAll('.mobile-menu-btn-open');
const mobileMenuBtnClose = document.querySelectorAll('.mobile-menu-btn-close');


const unlockScrollMobileMenu = () => {
  mobileMenuBackdrop.addEventListener(
    'transitionend',
    () => {
      document.documentElement.style.overflow = '';
    },
    { once: true }
  );
};

function mobileMenuTrapHandler(e) {
  trapFocus(e, mobileMenuWindow);
};

const openMobileMenu = () => {
  mobileMenuBackdrop.classList.remove('is-hidden');
  mobileMenuWindow.classList.add('is-mobile-menu-open');
  mobileMenuBackdrop.setAttribute('aria-hidden', 'false');
  lockScroll();

  mobileMenuBtnClose[0].focus();
  document.addEventListener('keydown', mobileMenuTrapHandler);
};

const closeMobileMenu = () => {
  mobileMenuBackdrop.classList.add('is-hidden');
  mobileMenuWindow.classList.remove('is-mobile-menu-open');
  mobileMenuBackdrop.setAttribute('aria-hidden', 'true');
  unlockScrollMobileMenu();

  document.removeEventListener('keydown', mobileMenuTrapHandler);
};

mobileMenuBtnOpen.forEach(button => {
  button.addEventListener('click', (e) => {
   
    lastFocusedElement = e.currentTarget;
    openMobileMenu();
    
  })

})

mobileMenuBtnClose.forEach(button => {
  button.addEventListener('click', () => {
    closeMobileMenu();
    lastFocusedElement?.focus();
  })
})

mobileMenuBackdrop.addEventListener('click', (e) => {
  if (e.target === mobileMenuBackdrop) {
    closeMobileMenu();
    lastFocusedElement?.focus();
  }
});



mobileMenuWindow.addEventListener('click', (e) => {
  const mobileMenuLink = e.target.closest('.mobile-menu__link');

  if (!mobileMenuLink) return;

  closeMobileMenu();
});