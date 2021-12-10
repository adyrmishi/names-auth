const loginbtn = document.querySelector('#login');
const registerbtn = document.querySelector('#register');
const statusbtn = document.querySelector('#status');

registerbtn.addEventListener('click', renderRegisterForm)
loginbtn.addEventListener('click', renderLoginForm)
statusbtn.addEventListener('click', renderLoginForm)