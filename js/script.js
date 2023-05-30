import mainHeader from './navigation.js';

function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());
  
  console.log(mainHeader);
  console.log('veikia');
}

init();