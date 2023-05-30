// Galima ieškoti tik po vieną žodį su URL :((

import mainHeader from './navigation.js';
import {API_URL} from "./config.js";
import {fetchData, getId, renderHTMLelement, renderAlbumsList, renderPostsList} from "./function-module.js";

async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());

  const contentElement = document.querySelector('#content');

  const searchValue = getId('search_value');

  const posts = await fetchData(`${API_URL}/posts?q=${searchValue}`);

  const albums = await fetchData(`${API_URL}/albums?q=${searchValue}`);

  if(posts.length === 0 || albums.length === 0) {
    contentElement.innerHTML = 
    `<h1>No search results for "${searchValue}".</h1>
    <p>Search for something different...</p>`

    return;
  }

  const searchTitle = renderHTMLelement('h1', '', `Search results for "${searchValue}":`);

  const postsList = renderPostsList(posts);
  const albumsList = renderAlbumsList(albums);

  contentElement.append(searchTitle, postsList, albumsList)
}

init();