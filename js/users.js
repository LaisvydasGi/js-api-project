import mainHeader from './navigation.js';
import {API_URL} from './config.js';
import {fetchData, renderHTMLelement} from './function-module.js';

async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());

  const usersData = await fetchData(`${API_URL}/users?_embed=posts`);
  
  const content = document.querySelector('#content');
  const usersTitle = renderHTMLelement('h1', '', 'All users:');
  const usersList = renderUsersList(usersData);
  content.append(usersTitle, usersList);
}

init();

function renderUsersList(users) {
  const usersWrapper = renderHTMLelement('div', 'users-wrapper');
  const usersList = renderHTMLelement('ul', 'users-list');

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

  usersWrapper.append(usersList);
  return usersWrapper;
}