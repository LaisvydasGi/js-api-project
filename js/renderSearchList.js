import {renderHTMLelement, capitalizeText} from "./function-module.js";

// Pridedam daugiau errors taisymu del universalaus metodo:
function renderSearchList(params) {
  // Isskleidziam objekta i atskirus kintamuosius:
  const {data, url, category, className} = params;

  // data ir url yra privalomi parametrai:
  if(!data || !url) {
    console.error('data and url must be included in this function');
    return '';
  }

  const searchListWrapper = renderHTMLelement('div', 'search-list-wrapper');
  
  if (className) {
    searchListWrapper.classList.add(className);
  }

  const searchListTitle = renderHTMLelement('h2', '', `No data :(`);
  
  if (category) {
    searchListTitle.textContent = `No ${category} :(`;
  }
  
  searchListWrapper.append(searchListTitle);
  
  if (data.length > 0) {
    searchListTitle.textContent = capitalizeText(`${category}:`);

    const searchList = document.createElement('ul')
    
    data.forEach(item => {
      const searchItem = document.createElement('li');

      const searchLink = renderHTMLelement('a', '', capitalizeText(item.title), url + item.id);
    
      searchItem.append(searchLink);
      
      searchList.append(searchItem);
    });
    searchListWrapper.append(searchList);
  }
  return searchListWrapper;
}

export default renderSearchList;