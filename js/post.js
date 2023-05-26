import mainHeader from './navigation.js';
import {API_URL} from './config.js';
import {capitalizeText, getId, fetchData, renderHTMLelement} from './function-module.js';

async function init() {
  const container = document.querySelector('.container');
  container.prepend(mainHeader());

  const id = getId('post_id');
  
  if (!id) {
    contentElement.innerHTML = 
    `<h1>Something went wrong...</h1>
    <p>You will find posts <a href="./posts.html">here</a>.</p>`

    return;
  }

  const postData = await fetchData(`${API_URL}/posts/${id}?_expand=user&_embed=comments`);

  const contentElement = document.querySelector('#content');

  const sectionElement = renderPostItem(postData);
  contentElement.append(sectionElement);
}

init();

function renderPostItem(post) {
  const sectionWrapper = renderHTMLelement('div', 'section-wrapper');

  const postWrapper = renderHTMLelement('div', 'post-wrapper');

  const postTitleWrapper = renderHTMLelement('div', 'post-title-wrapper');
  const postTitle = renderHTMLelement('h1', 'post-title', capitalizeText(post.title));
  const postAuthor = renderHTMLelement('span', 'post-author', 'Created by: ');
  const postAuthorName = renderHTMLelement('a', 'post-author-name', post.user.name, './user.html?user_id=' + post.user.id);

  postAuthor.append(postAuthorName);
  postTitleWrapper.append(postTitle, postAuthor);

  const postBodyWrapper = renderHTMLelement('div', 'post-body-wrapper');

  const postBody = renderHTMLelement('p', 'post-body', capitalizeText(post.body));
  const moreAuthorPosts = renderHTMLelement('a', '', 'More posts from this author...', './posts.html?user_id=' + post.user.id);

  postBodyWrapper.append(postBody, moreAuthorPosts);

  postWrapper.append(postTitleWrapper, postBodyWrapper);

  
  const commentsWrapper = renderHTMLelement('div', 'comments-wrapper');
  const commentsWrapperTitle = renderHTMLelement('h2', '', 'No comments...');

  commentsWrapper.append(commentsWrapperTitle);
  
  if (post.comments.length > 0) {
    commentsWrapperTitle.textContent = 'Comments:';

    const commentsList = renderHTMLelement('div', 'comments-list');
    
    post.comments.forEach(comment => {
      const {name, body, email} = comment;

      const commentItem = renderHTMLelement('div', 'comment-item');
      const commentTitle = renderHTMLelement('h3', '', capitalizeText(name));
      const commentBody = renderHTMLelement('p', '', capitalizeText(body));
      const commentAuthor = renderHTMLelement('span', 'comment-author', `Comment by: ${email}`);

      commentItem.append(commentTitle, commentBody, commentAuthor);
      commentsList.append(commentItem);
    });
    commentsWrapper.append(commentsList);
  }
  sectionWrapper.append(postWrapper, commentsWrapper);

  return sectionWrapper;
}
