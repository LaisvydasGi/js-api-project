// Galima ieškoti tik po vieną žodį su URL :((

import mainHeader from './navigation.js';
import createSearchResults from "./createSearchResults.js";
import {getId} from "./function-module.js";


async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());

  const searchForm = document.querySelector('#search-form');

  const contentElement = document.querySelector('#content');

  const searchValue = getId('search_value');
  createSearchResults(searchValue, contentElement);

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const searchInputValue = form.search.value;

    createSearchResults(searchInputValue, contentElement);

    form.reset();
  })
}

init();