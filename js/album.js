import mainHeader from './navigation.js';
import {API_URL, PHOTOS_LIMIT} from './config.js';
import {capitalizeText, getId, fetchData, renderHTMLelement} from './function-module.js';

async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());

  const contentElement = document.querySelector('#content');

  const id = getId('album_id');

  if (!id) {
    contentElement.innerHTML = 
    `<h1>Something went wrong...</h1>
    <p>Search for more albums <a href="./albums.html">here</a>.</p>`

    return;
  }

  const albumsData = await fetchData(`${API_URL}/albums/${id}?_expand=user&_embed=photos`);

  const albumElement = renderAlbumItem(albumsData);
  contentElement.append(albumElement);
}

init();

function renderAlbumItem(album) {
  const selectedAlbumPhotos = album.photos.slice(0, PHOTOS_LIMIT);

  const albumWrapper = renderHTMLelement('div', 'album-wrapper');
  const albumInfo = renderHTMLelement('div', 'album-info');

  const albumAuthorLink = renderHTMLelement('a', '', album.user.name, `./user.html?user_id=${album.user.id}`);
  const albumAuthor = renderHTMLelement('span', '', 'Created by: ');
  albumAuthor.append(albumAuthorLink);
  
  const albumTitle = renderHTMLelement('h1', '', capitalizeText(album.title));

  albumInfo.append(albumTitle, albumAuthor);

  const photosWrapper = renderHTMLelement('div', 'photos-list');

  selectedAlbumPhotos.forEach(photo => {
    const photoItem = document.createElement('img');
    photoItem.alt = photo.title;
    photoItem.src = photo.thumbnailUrl;

    photosWrapper.append(photoItem);
  })
  albumWrapper.append(albumInfo, photosWrapper);
  return albumWrapper;
}