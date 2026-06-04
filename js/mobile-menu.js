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


const openMobileMenu = () => {
  mobileMenuBackdrop.classList.remove('is-hidden');
    mobileMenuWindow.classList.add('is-mobile-menu-open');
  mobileMenuBackdrop.setAttribute('aria-hidden', 'false');
  lockScroll();
};
const closeMobileMenu = () => {
  mobileMenuBackdrop.classList.add('is-hidden');
    mobileMenuWindow.classList.remove('is-mobile-menu-open');
  mobileMenuBackdrop.setAttribute('aria-hidden', 'true');
  unlockScrollMobileMenu();
};

mobileMenuBtnOpen.forEach(button => {
  button.addEventListener('click', () => {
   
    openMobileMenu();
    
  })

})

mobileMenuBtnClose.forEach(button => {
  button.addEventListener('click', () => {
       closeMobileMenu();
  })
})

mobileMenuBackdrop.addEventListener('click', (e) => {
  if (e.target === mobileMenuBackdrop) {
    closeMobileMenu();
  }
});



mobileMenuWindow.addEventListener('click', (e) => {
  const mobileMenuLink = e.target.closest('.mobile-menu__link');

  if (!mobileMenuLink) return;

  closeMobileMenu();
});