export function getId(param) {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get(param);

  return id;
}

export function capitalizeText(str) {
  const output = str.at(0).toUpperCase() + str.slice(1);
  return output;
}

export async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function renderHTMLelement(type, className, text, href) {
  const item = document.createElement(type);

  if (className !== '') {
    item.classList.add(className);
  }

  if (text !== '') {
    item.textContent = text;
  }

  if (type === 'a') {
    item.href = href;
  }

  return item;
}

export function renderUsersList(users) {
  const usersWrapper = renderHTMLelement('div', 'users-wrapper');
  const usersWrapperTitle = renderHTMLelement('h2', '', '');
  const usersList = renderHTMLelement('ul', 'users-list');
  
  if (users.length > 0) {
    usersWrapperTitle.textContent = `Users (${users.length}):`;
  
    users.forEach(user => {
      const userId = user.id;
  
      const userItem = renderHTMLelement('li', 'user-item');
  
      const userLink = renderHTMLelement('a', '', `${user.name}`, './user.html?user_id=' + userId);
  
      if (user.posts) {
        userLink.textContent = `${user.name} (${user.posts.length} posts)`;
      }
  
      userItem.append(userLink);
      usersList.append(userItem);
    })
    usersWrapper.append(usersWrapperTitle, usersList);
  }
  return usersWrapper;
}

export function renderPostsList(posts) {
  const postsWrapper = renderHTMLelement('div', 'user-posts-wrapper');

  const postsWrapperTitle = renderHTMLelement('h2', '', 'No Posts...');
  
  if (posts.length > 0) {
    postsWrapperTitle.textContent = `Posts (${posts.length}):`;
  
    const postsList = document.createElement('ul');
  
    posts.forEach(post => {
      const postId = post.id;

      const postItem = renderHTMLelement('li', 'post-item');
      const postLink = renderHTMLelement('a', '', capitalizeText(post.title), './post.html?post_id=' + postId);
      
      postItem.append(postLink);
      postsList.append(postItem);
    })

    postsWrapper.append(postsWrapperTitle, postsList)
  }
  return postsWrapper;
}

export function renderAlbumsList(albums) {
  const albumsWrapper = renderHTMLelement('div', 'user-albums-wrapper');

  const albumsWrapperTitle = renderHTMLelement('h2', '', 'No Albums:');
  
  if (albums.length > 0) {
    albumsWrapperTitle.textContent = `Albums (${albums.length}):`;
  
    const albumsList = document.createElement('ul');
  
    albums.forEach(album => {
      const albumId = album.id;

      const albumItem = document.createElement('li');

      const albumLink = renderHTMLelement('a', '', capitalizeText(album.title), './album.html?album_id=' + albumId);
      
      albumItem.append(albumLink);

      albumsList.append(albumItem);
    })

    albumsWrapper.append(albumsWrapperTitle, albumsList)
  }

  return albumsWrapper;
}

