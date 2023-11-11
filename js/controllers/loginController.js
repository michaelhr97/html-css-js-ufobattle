import loginUser from '../services/loginService.js';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let form = document.getElementById('login__page--form');
  let buttonSubmit = document.getElementById('login__page--button');
  let inputs = document.querySelectorAll('input');

  function areAllInputsFilled() {
    let numberInputsNotValid = 0;

    inputs.forEach((input) => {
      if (!input.value) {
        numberInputsNotValid++;
      }
    });

    return numberInputsNotValid === 0 ? true : false;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;

      let data = { username, password };
      let message = await loginUser(data);

      if (!message.includes('Bearer')) {
        alert(message);
        return;
      }

      let token = message.split(' ')[1];
      localStorage.setItem('token', token);
      window.location.href = '../../index.html';
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
