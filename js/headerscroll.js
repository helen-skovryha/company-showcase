function checkScroll() {
  
  const header = document.querySelector('.header');
  const logo = document.querySelector('.header__logo');
    const dropdown = document.querySelectorAll('.link--dropdown-button');
   if (window.scrollY < 80 && !header.classList.contains('scrolled') && !logo.classList.contains('logo-scrolled')) {
    return;
  }
  if (window.scrollY > 80 && header.classList.contains('scrolled') && logo.classList.contains('logo-scrolled')) {
    return;
  }
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
    logo.classList.add('logo-scrolled');
    dropdown.forEach(item => {
  item.classList.add('dropdown-btn-scrolled')
});

  }
 
  else {
    header.classList.remove('scrolled');
    logo.classList.remove('logo-scrolled');
       dropdown.forEach(item => {
  item.classList.remove('dropdown-btn-scrolled')
});
  }
}

document.addEventListener('DOMContentLoaded', checkScroll); // safer than 'load' in most cases
window.addEventListener('scroll', checkScroll);
// window.addEventListener('load', checkScroll);
