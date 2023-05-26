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

function renderUsersList(users) {
  const usersWrapper = renderHTMLelement('div', 'users-wrapper');
  const usersList = renderHTMLelement('ul', 'users-list');

  usersWrapper.append(usersList);

  users.forEach(user => {
    const userId = user.id;

    const userItem = renderHTMLelement('li', 'user-item');

    const userLink = renderHTMLelement('a', '', `${user.name} (${user.posts.length} posts)`, './user.html?user_id=' + userId);
    // userLink.textContent = `${user.name} (${user.posts.length} posts)`;
    // userLink.href = './user.html?user_id=' + userId;

    userItem.append(userLink);
    usersList.append(userItem);
  })

  return usersWrapper;
}

init();