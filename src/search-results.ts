import { renderBlock } from './lib.js';
import { Place } from './store/domain/place.js'
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

const toggleFavoriteItem = (e: Event, data: Place[]): void => {

  const button = e.target as HTMLInputElement

  if (!button.classList.contains('favorites')) return

  const favoriteItemsJSON = localStorage.getItem('favoriteItems')
  const favoriteItems = JSON.parse(favoriteItemsJSON)
  const favoriteItemsData = isFavoriteItem(favoriteItems) ? favoriteItems : {} as FavoritePlaces

  const favoritesAmountJSON = localStorage.getItem('favoritesAmount')
  const favoritesAmount = JSON.parse(favoritesAmountJSON)
  let numberFavoritesAmount = typeof favoritesAmount === 'number' ? favoritesAmount : 0

  if (!favoriteItemsData[button.id]) {
    button.classList.add('active')

    const favoritePlace = data.find(el => el.id === button.id)

    const favoriteItem: Partial<Place> = {
      id: favoritePlace.id,
      name: favoritePlace.name,
      image: favoritePlace.image
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

const sortByPriceCheap = (one, two) => {
  if (one.price > two.price) {
    return 1
  } else if (one.price < two.price) {
    return -1
  } else {
    return 0
  }
}

const sortByPriceExpensive = (one, two) => {
  if (one.price < two.price) {
    return 1
  } else if (one.price > two.price) {
    return -1
  } else {
    return 0
  }
}

export const sortPlaces = (data, param) => {
  switch (param) {
  case 'cheap':
    data.sort(sortByPriceCheap)
    break
  case 'expensive':
    data.sort(sortByPriceExpensive)
    break
  }

  return data
}

export function renderSearchResultsBlock(data: Place[]) {

  const renderList = (data) => {
    let list = ''

    data.forEach( el => {
      list += `<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div id="${el.id}" class="favorites"></div>
            <img class="result-img" src="${el.image[0]}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${el.name}</p>
              <p class="price">${el.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">${el.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`
    })

    renderBlock('place-list', list)
  }


  if (!data.length) renderBlock('search-results-block',
    `<div class="search-results-header">
            <p>Не удалось найти</p>
          </div>`)
  else {
    renderBlock(
      'search-results-block',
      `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select id="placesSort">
                <option selected value="cheap">Сначала дешёвые</option>
                <option value="expensive">Сначала дорогие</option>
                <option value="closer">Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul id="place-list" class="results-list">
    </ul>
    `
    );
    renderList(data)

    document.getElementsByClassName('results-list')[0]
      .addEventListener('click', (e: Event): void => {
        toggleFavoriteItem(e, data)
      })

    document.getElementById('placesSort')
      .addEventListener('change', (e) => {
        const position = e.target.selectedIndex
        const value = e.target.options[position].value
        const sortData = sortPlaces(data, value)
        renderList(sortData)
      })
  }
}
