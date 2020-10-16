let email = document.querySelector('.email');
let form = document.querySelector('.form');

form.addEventListener('submit', function ValidateEmail(e) {

    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
     if (regexEmail.test(email.value)) {
        return true;
      } else {
        email.setCustomValidity('Invalid email address');
        email.style.borderColor = 'red';
        email.focus();
        e.preventDefault();
      }
});