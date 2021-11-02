import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
import {setLocalStorage, getUserData, getFavoritesAmount, UserData, isUserData} from './getData.js';

setLocalStorage()
const favoritesAmount = getFavoritesAmount()
const numberFavoritesAmount = typeof favoritesAmount === 'number' ? favoritesAmount : null

const gettingUserData = getUserData()
const userData = isUserData(gettingUserData)  ? gettingUserData : null

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(userData.userName, userData.avatarUrl, numberFavoritesAmount);
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderToast(
    {
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success',
    },
    {
      name: 'Понял',
      handler: () => {
        console.log('Уведомление закрыто');
      },
    }
  );
});
