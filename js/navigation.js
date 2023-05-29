// export default - eksportuojamas tik vienas metodas .js faile.

export default function mainHeader() {
  const headerElement = document.createElement('header');
  headerElement.classList.add('main-header');

  const menuItems = [
    {
      title: "users",
      path: "users.html",
    },
    {
      title: "posts",
      path: "posts.html",
    },
    {
      title: "albums",
      path: "albums.html",
    },
  ];

  const navigationElement = document.createElement('nav');
  navigationElement.classList.add('main-navigation');

  const logoWrapper = document.createElement('a');
  logoWrapper.href = './index.html';
  const logoElement = document.createElement('img');
  logoElement.src = './images/project.png';
  logoElement.style.width = '4rem';
  logoWrapper.append(logoElement);

  const searchForm = document.createElement('form');
  searchForm.action = './search.html';

  const searchInput = document.createElement('input');
  searchInput.style.width = '8rem';
  searchInput.type = 'text';
  searchInput.name = 'search_value';
  searchInput.id = 'search_value';

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.textContent = 'Search';

  searchForm.append(searchInput, searchButton);

  headerElement.append(logoWrapper, navigationElement);

  const menuList = document.createElement('ul');
  menuList.classList.add('main-menu');

  menuItems.forEach(item => {
    const { title, path } = item;
    
    const menuItem = document.createElement('li');
  
    const menuLink = document.createElement('a');

    if (location.pathname === '/' + path) {
      menuLink.classList.add('active');
      console.log('veikia');
    }

    menuItem.append(menuLink);
  
    menuLink.textContent = title;
    menuLink.href = './' + path;

    menuList.append(menuItem);
  })

  navigationElement.append(menuList, searchForm);

  return headerElement;
}