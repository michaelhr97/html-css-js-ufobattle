window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const navAuthentication = document.getElementById('navbar__nav-authentication');

  if (localStorage.getItem('token')) {
    let navItemLogout = document.createElement('li');
    navItemLogout.classList.add('nav-item');

    let navLinkLogout = document.createElement('a');
    navLinkLogout.classList.add('nav-link', 'text-white');
    navLinkLogout.setAttribute('href', './html/login.html');
    navLinkLogout.innerText = 'Logout';

    navAuthentication.appendChild(navLinkLogout);
  } else {
    let navItemLogin = document.createElement('li');
    navItemLogin.classList.add('nav-item');
    let navItemRegister = document.createElement('li');
    navItemRegister.classList.add('nav-item');

    let navLinkLogin = document.createElement('a');
    navLinkLogin.classList.add('nav-link', 'text-white');
    navLinkLogin.setAttribute('href', './html/login.html');
    navLinkLogin.innerText = 'Login';
    let navLinkRegister = document.createElement('a');
    navLinkRegister.classList.add('nav-link', 'text-white');
    navLinkRegister.setAttribute('href', './html/signup.html');
    navLinkRegister.innerText = 'Register';

    navAuthentication.appendChild(navLinkLogin);
    navAuthentication.appendChild(navLinkRegister);
  }
});
