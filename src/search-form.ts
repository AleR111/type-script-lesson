import { renderBlock } from './lib.js';
import { formatDate, getLastDayOfNextMonth, shiftDate } from './date-utils.js';

export function renderSearchFormBlock(checkInDate?: Date, checkOutDate?: Date) {
  const nowDate = new Date();
  const checkIn = formatDate(checkInDate || shiftDate(nowDate, 1));
  const checkOut = formatDate(
    checkOutDate || shiftDate(checkInDate || nowDate, 2)
  );
  const minDate = formatDate(nowDate);
  const maxDate = formatDate(getLastDayOfNextMonth(nowDate));
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkIn}" min="${minDate}" max="${maxDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkOut}" min="${minDate}" max="${maxDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}

interface SearchFormData {
  city: string,
  checkIn: string,
  checkOut: string,
  maxPrice: number
}

const search = (data: SearchFormData): void => {
  console.log(data)
}

export const searchHandler = (): void => {
  const city = document.getElementById('city') as HTMLInputElement
  const checkIn = document.getElementById('check-in-date') as HTMLInputElement
  const checkOut = document.getElementById('check-out-date') as HTMLInputElement
  const maxPrice = document.getElementById('max-price') as HTMLInputElement

  const searchData: SearchFormData = {
    city: city.value,
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    maxPrice: Number(maxPrice.value)
  }

  search(searchData)
}
