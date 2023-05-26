import mainHeader from './navigation.js';
import {API_URL, ALBUMS_LIMIT} from './config.js';
import {capitalizeText, fetchData, renderHTMLelement} from './function-module.js';

async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());

  const albumsData = await fetchData(`${API_URL}/albums?_limit=${ALBUMS_LIMIT}&_expand=user&_embed=photos`);

  const contentElement = document.querySelector('#content');
  const albumsTitle = renderHTMLelement('h1', '', 'Albums:');

  const albumsListElement = renderAlbumsList(albumsData);

  contentElement.append(albumsTitle, albumsListElement);
}

init();

function renderAlbumsList(albums) {
  const albumsList = renderHTMLelement('div', 'albums-list');

  albums.forEach(album => {
    const title = album.title;
    const author = album.user.name;
    const photosAmount = album.photos.length;

    const randomIndex = Math.floor(Math.random() * photosAmount);
    const randomImage = album.photos[randomIndex];
    const randomImageUrl = randomImage.url;
    const randomImageTitle = randomImage.title;

    const albumItem = renderHTMLelement('div', 'album-item');
    const albumLink = renderHTMLelement('a', 'album-link', '', './album.html?album_id=' + album.id);

    albumItem.append(albumLink);

    const albumImage = document.createElement('img');
    albumImage.src = randomImageUrl;
    albumImage.alt = randomImageTitle;

    const albumInfo = renderHTMLelement('div', 'album-info');

    const albumTitle = renderHTMLelement('h4', 'album-title', capitalizeText(title));
    const albumAuthor = renderHTMLelement('span', 'album-author', `Author: ${author}`);

    albumInfo.append(albumTitle, albumAuthor);
    albumLink.append(albumImage, albumInfo);

    albumsList.append(albumItem);
  })

  return albumsList;
}