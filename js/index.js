import mainHeader from './navigation.js';

function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());
}

init();