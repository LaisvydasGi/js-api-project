import mainHeader from './navigation.js';
import {API_URL} from './config.js';
import {getId, fetchData, renderHTMLelement, renderAlbumsList, renderPostsList} from './function-module.js';

async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());
  
  const id = getId('user_id');
  const userData = await fetchData(`${API_URL}/users/${id}?_embed=posts&_embed=albums`);

  const contentElement = document.querySelector('#content');

  const userInfo = renderUserInfo(userData);
  const userPosts = renderPostsList(userData.posts, userData.name);
  const userAlbums = renderAlbumsList(userData.albums, userData.name);

  contentElement.append(userInfo, userPosts, userAlbums);
}

init();

function renderUserInfo(user) {
  const userInfoWrapper = renderHTMLelement('div', 'user-info-wrapper');

  const {name, username, email, phone, website} = user;
  const {city, street, suite, zipcode} = user.address;
  const {lat, lng} = user.address.geo;
  const companyName = user.company.name;

  const mapURL = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const addressText = `${street} ${suite}, ${zipcode} ${city}`;
  
  userInfoWrapper.innerHTML = 
  `<h1>${name} (${username})</h1>
  <ul>
    <li>Email: <a href="mailto:${email}">${email}</a></li>
    <li>Address: <a href="${mapURL}">${addressText}</a></li>
    <li>Phone: <a href="tel:${phone}">${phone}</a></li>
    <li>Website: <a href="https://${website}" target="blank">${website}</a></li>
    <li>Company: ${companyName}</li>
  </ul>
  `;

  return userInfoWrapper;
}