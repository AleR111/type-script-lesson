import { renderBlock } from './lib.js';
import {Place, Places} from './search-form.js'
import {reRenderUserBlock} from './index.js';

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

interface FavoritePlaces {
  [key: string]: Partial<Place>
}

const isFavoriteItem = (obj: unknown): obj is FavoritePlaces => {
  return typeof obj === 'object'
    && obj !== null
}

const toggleFavoriteItem = (e: Event, data: Places): void => {
  const button = e.target as HTMLInputElement

  if (!button.classList.contains('favorites')) return

  const favoriteItemsJSON = localStorage.getItem('favoriteItems')
  const favoriteItems = JSON.parse(favoriteItemsJSON)
  const favoriteItemsData = isFavoriteItem(favoriteItems) ? favoriteItems : {} as Places

  const favoritesAmountJSON = localStorage.getItem('favoritesAmount')
  const favoritesAmount = JSON.parse(favoritesAmountJSON)
  let numberFavoritesAmount = typeof favoritesAmount === 'number' ? favoritesAmount : 0

  if (!favoriteItemsData[button.id]) {
    button.classList.add('active')

    const favoriteItem: Partial<Place> = {
      id: data[button.id].id,
      name: data[button.id].name,
      image: data[button.id].image
    }

    favoriteItemsData[button.id] = favoriteItem
    numberFavoritesAmount++
  } else {
    (e.target as HTMLInputElement).classList.remove('active')
    delete favoriteItemsData[button.id]
    numberFavoritesAmount--
  }

  localStorage.setItem('favoriteItems', JSON.stringify(favoriteItemsData));
  localStorage.setItem('favoritesAmount', JSON.stringify(numberFavoritesAmount))

  reRenderUserBlock(numberFavoritesAmount)
}


export function renderSearchResultsBlock(data?: Places) {
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
