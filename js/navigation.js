import {MENU_ITEMS} from './config.js';
import {renderHTMLelement} from './function-module.js';

// export default - eksportuojamas tik vienas metodas .js faile.
export default function mainHeader() {
  const headerElement = renderHTMLelement('header', 'main-header');

  const navigationElement = renderHTMLelement('nav', 'main-navigation');

  const logoWrapper = renderHTMLelement('a', '', '', './index.html');
  const logoElement = document.createElement('img');
  logoElement.src = './images/project.png';
  logoElement.style.width = '4rem';
  logoWrapper.append(logoElement);

  if (!location.pathname.endsWith('search.html')) {
    const searchForm = createSearchForm();
    navigationElement.append(searchForm);
  }

  headerElement.append(logoWrapper, navigationElement);

  const menuList = renderHTMLelement('ul', 'main-menu');

  MENU_ITEMS.forEach(item => {
    const { title, path } = item;
    
    const menuItem = document.createElement('li', 'menu-item');
  
    const menuLink = renderHTMLelement('a', 'menu-link', title, './' + path);

    if (location.pathname === '/' + path) {
      menuLink.classList.add('active');
    }

    menuItem.append(menuLink);
    menuList.append(menuItem);
  })

  navigationElement.prepend(menuList);

  return headerElement;
}

function createSearchForm() {
  const searchForm = document.createElement('form');
  searchForm.action = './search.html';

  const searchInput = document.createElement('input');
  searchInput.style.width = '8rem';
  searchInput.type = 'text';
  searchInput.name = 'search_value';
  searchInput.id = 'search_value';

  const searchButton = renderHTMLelement('button', '', 'Search');
  searchButton.type = 'submit';

  searchForm.append(searchInput, searchButton);

  return searchForm;
}