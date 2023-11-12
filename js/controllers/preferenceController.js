window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const TOTAL_NUMBER_UFO = 1;
  const TOTAL_TIME = 60;

  let form = document.getElementById('preference__page--form');
  let totalufo = document.getElementById('totalufo');
  let time = document.getElementById('time');

  console.log(time.value);

  totalufo.value = localStorage.getItem('totalufo') || TOTAL_NUMBER_UFO;
  time.value = localStorage.getItem('time') || TOTAL_TIME;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    localStorage.setItem('totalufo', totalufo.value);
    localStorage.setItem('time', time.value);
  });
});
