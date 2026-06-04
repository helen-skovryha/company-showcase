const modalFormWindow = document.querySelector('.modal-form');
const modalForm = modalFormWindow.closest('.backdrop');
const modalFormSignUpBtnOpen = document.querySelectorAll('.modal-form-sign-up-btn-open');
const modalFormSignInBtnOpen = document.querySelectorAll('.modal-form-sign-in-btn-open');
const modalFormBookBtnOpen = document.querySelectorAll('.modal-form-book-btn-open');
const modalFormBtnClose = document.querySelector('.modal-form-btn-close');

const unlockScrollForm = () => {
  modalForm.addEventListener(
    'transitionend',
    () => {
      document.documentElement.style.overflow = '';
    },
    { once: true }
  );
};

function openModalForm() {
  modalForm.classList.remove('is-hidden');
  modalForm.setAttribute('aria-hidden', 'false');
    lockScroll();

}
function closeModalForm() {
  modalForm.classList.add('is-hidden');
  modalForm.setAttribute('aria-hidden', 'true');
    unlockScrollForm();
  
}
function setModalFormMode(mode) {
  fieldSignUp.forEach(input => input.disabled = true);
  fieldSignIn.forEach(input => input.disabled = true);
  fieldBook.forEach(input => input.disabled = true);
  
  
  modalFormWindow.classList.remove(
    'modal-form__sign-in',
    'modal-form__sign-up',
    'modal-form__book'
  );
  modalFormWindow.classList.add(`modal-form__${mode}`);

    if (mode === 'sign-up') {
    fieldSignUp.forEach(input => input.disabled = false);  
  } else if (mode === 'sign-in') {
    fieldSignIn.forEach(input => input.disabled = false);  
  } else if (mode === 'book') {
     fieldBook.forEach(input => input.disabled = false);  
     fieldSignUp.forEach(input => input.disabled = false);  
  }
}

const fieldSignIn = document.querySelectorAll('.form-field__sign-in input');
const fieldSignUp = document.querySelectorAll('.form-field__sign-up input');
const fieldBook = document.querySelectorAll('.form-field__book input, .form-field__book select');


modalFormSignUpBtnOpen.forEach(btn => {
  btn.addEventListener('click', e => {
    
    setModalFormMode('sign-up');
    openModalForm();

  });
});

modalFormSignInBtnOpen.forEach(btn => {
  btn.addEventListener('click', e => {
 
  setModalFormMode('sign-in');
  openModalForm();
    
  });
});

modalFormBookBtnOpen.forEach(btn => {
  btn.addEventListener('click', e => {
    
  setModalFormMode('book');
  openModalForm();
    
  });
});

const modalFormSignInInsideModal = document.querySelectorAll('.modal-form__sign-in-button');
modalFormSignInInsideModal.forEach(btn => {
  btn.addEventListener('click', e => {
    setModalFormMode('sign-in');
  });
});

const modalFormBookInsideModal = document.querySelectorAll('.modal-form__book-button');
modalFormBookInsideModal.forEach(btn => {
  btn.addEventListener('click', e => {
    setModalFormMode('book');
  });
});

modalFormBtnClose.addEventListener('click', closeModalForm);


modalForm.addEventListener('click', (e) => {
  if (e.target === modalForm) {
    closeModalForm();
  }
});
