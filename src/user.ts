import { renderBlock } from './lib.js';

export function renderUserBlock(
  name: string,
  avatarUrl: string,
  favoriteItemsAmount?: number
) {
  const favoritesCaption = favoriteItemsAmount
    ? favoriteItemsAmount
    : 'ничего нет';
  const hasFavoriteItems = !!favoriteItemsAmount;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarUrl}" alt="${name}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${
  hasFavoriteItems ? ' active' : ''
}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
