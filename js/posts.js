import mainHeader from './navigation.js';
import {API_URL, POSTS_LIMIT} from './config.js';
import {capitalizeText, getId, fetchData, renderHTMLelement} from './function-module.js';

// _expand adds parent resource
// _embed adds child resource
async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());

  const id = getId('user_id');

  let fetchURL;

  if (id) {
    fetchURL = `${API_URL}/posts?_expand=user&_embed=comments&userId=${id}`;
  } else {
    fetchURL = `${API_URL}/posts?_limit=${POSTS_LIMIT}&_expand=user&_embed=comments`;
  }

  const postsData = await fetchData(fetchURL);

  const content = document.querySelector('#content');

  const postsTitle = renderHTMLelement('h1', '', 'Posts:');
  const postsList = renderPostsList(postsData);
  content.append(postsTitle, postsList);
}

init();


function renderPostsList(posts) {
  const postsList = renderHTMLelement('ul', 'posts-list');

  posts.forEach(post => {
    const userId = post.userId;
    const postId = post.id;

    const postTitle = post.title;
    const postUserName = post.user.name;
    const postCommentsAmount = post.comments.length;

    const postItem = renderHTMLelement('li', 'post-item');

    const postLink = renderHTMLelement('a', '', `${capitalizeText(postTitle)} (${postCommentsAmount} comments)`, './post.html?post_id=' + postId);

    const userLink = renderHTMLelement('a', '', postUserName, './user.html?user_id=' + userId);

    postItem.append(postLink, ' - ', userLink);
    postsList.append(postItem);
  })

  return postsList;
}