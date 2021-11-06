import { renderBlock } from './lib.js';
import {Place} from './search-form.js'
import { getUserData, isUserData} from './getData.js';
import {renderUserBlock} from './user.js';

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

interface FavoriteItem {
  id: number,
  name: string,
  image: string
}

const toggleFavoriteItem = (e: Event, data: Place): void => {
  const button = e.target as HTMLInputElement

  if (!button.classList.contains('favorites')) return

  const favoriteItemsJSON = localStorage.getItem('favoriteItems')
  const favoriteItems = JSON.parse(favoriteItemsJSON) || {}

  const favoritesAmountJSON = localStorage.getItem('favoritesAmount')
  let favoritesAmount = JSON.parse(favoritesAmountJSON) || 0
  console.log(favoriteItems)
  if (!favoriteItems[button.id]) {
    button.classList.add('active')

    const favoriteItem: FavoriteItem = {
      id: data[button.id].id,
      name: data[button.id].name,
      image: data[button.id].image
    }
    favoriteItems[button.id] = favoriteItem
    console.log(button.id, favoriteItems)
    favoritesAmount++
  } else {
    (e.target as HTMLInputElement).classList.remove('active')
    delete favoriteItems[button.id]
    favoritesAmount--
  }

  localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  localStorage.setItem('favoritesAmount', JSON.stringify(favoritesAmount))

  const numberFavoritesAmount = typeof favoritesAmount === 'number' ? favoritesAmount : null

  const gettingUserData = getUserData()
  const userData = isUserData(gettingUserData)  ? gettingUserData : null

  renderUserBlock(userData.userName, userData.avatarUrl, numberFavoritesAmount);
}


export function renderSearchResultsBlock(data?: Place) {
  console.log(data)
  let list = ''

  if (!data) renderBlock('search-results-block',
    `<div class="search-results-header">
            <p>Не удалось найти</p>
          </div>`)
  else {
    for (const el in data) {
      list += `<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div id="${el}" class="favorites"></div>
            <img class="result-img" src="${data[el].image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${data[el].name}</p>
              <p class="price">${data[el].price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">${data[el].description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`
    }
    renderBlock(
      'search-results-block',
      `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
        ${list}
    </ul>
    `
    );

    document.getElementsByClassName('results-list')[0]
      .addEventListener('click', (e: Event): void => {
        toggleFavoriteItem(e, data)
      })
  }
}
