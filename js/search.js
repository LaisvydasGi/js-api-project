// Galima ieškoti tik po vieną žodį su URL :((

import mainHeader from './navigation.js';
import {API_URL, SEARCH_ITEMS_LIMIT} from "./config.js";
import {fetchData, getId, renderHTMLelement, renderUsersList, renderAlbumsList, renderPostsList} from "./function-module.js";

async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());

  const contentElement = document.querySelector('#content');

  const searchValue = getId('search_value');

  const users = await fetchData(`${API_URL}/users?q=${searchValue}&_limit=${SEARCH_ITEMS_LIMIT}`);
  const posts = await fetchData(`${API_URL}/posts?q=${searchValue}&_limit=${SEARCH_ITEMS_LIMIT}`);
  
  const albums = await fetchData(`${API_URL}/albums?q=${searchValue}&_limit=${SEARCH_ITEMS_LIMIT}`);

  if(users.length === 0 && posts.length === 0 && albums.length === 0) {
    contentElement.innerHTML = 
    `<h1>No search results for "${searchValue}".</h1>
    <p>Search for something different...</p>`

    return;
  }

  const searchTitle = renderHTMLelement('h1', '', `Search results for "${searchValue}":`);

  const usersList = renderUsersList(users);
  const postsList = renderPostsList(posts);
  const albumsList = renderAlbumsList(albums);

  contentElement.append(searchTitle, usersList, postsList, albumsList)
}

init();