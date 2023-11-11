import registerUser from '../services/registerService.js';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let form = document.getElementById('register__page--form');
  let buttonSubmit = document.getElementById('register__page--button');
  let inputs = document.querySelectorAll('input');
  let passwordInputs = document.querySelectorAll('input[type=password]');

  function areAllInputsFilled() {
    let numberInputsNotValid = 0;

    inputs.forEach((input) => {
      if (!input.value) {
        numberInputsNotValid++;
      }
    });

    return numberInputsNotValid === 0 ? true : false;
  }

  function arePasswordsValuesEqual() {
    return passwordInputs[0].value === passwordInputs[1].value;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!arePasswordsValuesEqual()) {
      alert("Passwords don't match");
      return;
    }

    try {
      let username = document.getElementById('username').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;

      let data = { username, email, password };
      const message = await registerUser(data);

      if (message) {
        alert(message);
        return;
      }

      window.location.href = '../../html/login.html';
    } catch (error) {
      alert('Unexpected error has happened');
    }
  });

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (areAllInputsFilled()) {
        buttonSubmit.removeAttribute('disabled');
        return;
      }

      buttonSubmit.setAttribute('disabled', true);
    });
  });
});
