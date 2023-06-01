import {API_URL, SEARCH_ITEMS_LIMIT} from "./config.js";
import {fetchData, renderHTMLelement} from "./function-module.js";
import renderSearchList from "./renderSearchList.js";
// import {renderUsersList, renderAlbumsList, renderPostsList} from "./function-module.js";

async function createSearchResults(searchPhrase, parentElement) {
  const users = await fetchData(`${API_URL}/users?q=${searchPhrase}&_limit=${SEARCH_ITEMS_LIMIT}`);
  const posts = await fetchData(`${API_URL}/posts?q=${searchPhrase}&_limit=${SEARCH_ITEMS_LIMIT}`);
  const albums = await fetchData(`${API_URL}/albums?q=${searchPhrase}&_limit=${SEARCH_ITEMS_LIMIT}`);

  if(users.length === 0 && posts.length === 0 && albums.length === 0) {
    parentElement.innerHTML = 
    `<h1>No search results for "${searchValue}".</h1>
    <p>Search for something different...</p>`

    return;
  }

  // Sukuriam nauja objekta. Pakeiciam name i title.
  const updatedUsers = users.map(user => {
    const userData = {
      id: user.id,
      title: user.name,
    }
    return userData;
  })


  const searchTitle = renderHTMLelement('h1', '', `Search results for "${searchPhrase}":`);

  // const usersList = renderUsersList(users);
  // const postsList = renderPostsList(posts);
  // const albumsList = renderAlbumsList(albums);

  // const usersList = createSearchList(updatedUsers, './user.html?user_id=', 'users-list-wrapper', 'users');
  // const postsList = createSearchList(posts, './post.html?post_id=', 'posts-list-wrapper', 'posts');
  // const albumsList = createSearchList(albums, './album.html?album_id=', 'albums-list-wrapper', 'albums');

  // kad nesvarbu butu funkcijos parametru eiliskumas, galim dirbti su objektais:
  const postsParams = {
    data: posts,
    className: '',
    category: 'posts',
    url: 'post.html?post_id=',
  };

  const usersParams = {
    data: updatedUsers,
    className: 'users-list-wrapper',
    category: 'users',
    url: './user.html?user_id=',
  }

  const usersList = renderSearchList(usersParams);
  const postsList = renderSearchList(postsParams);
  const albumsList = renderSearchList({
    data: albums, 
    url: './album.html?album_id=', 
    className: 'albums-list-wrapper', 
    category: 'albums'
  });

  parentElement.innerHTML = '';
  parentElement.append(searchTitle, usersList, postsList, albumsList);
}

export default createSearchResults;