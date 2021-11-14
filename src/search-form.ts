import { renderBlock } from './lib.js';
import { formatDate, getLastDayOfNextMonth, shiftDate } from './date-utils.js';
import { renderSearchResultsBlock } from './search-results.js'
import { SearchParam } from './sdk/flat-rent-sdk.js';
import { HomeProvider } from './store/providers/home/home-provider.js';
import { FlatRentProvider } from './store/providers/flat-rent/flat-rent-provider.js';
// import { Provider } from './store/domain/provider.js';

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
          <div class="providers">
            <label><input type="checkbox" name="provider" value="home" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flatRent" checked /> FlatRent</label>
          </div>
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
            <div><button id="search">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}

// interface SearchFormData {
//   city: string,
//   checkInDate: Date,
//   checkOutDate: Date,
//   priceLimit?: number
// }

// export interface Place {
//     bookedDates: Array<any>,
//     description: string,
//     id: number,
//     image: string,
//     name: string,
//     price: number,
//     remoteness: number
// }

// export type Places = Record<string, Place>

export type SelectedProviders = Record<string, boolean>



// class ProvidersData {
//   homyData: Places
//   flatData: Places
//   constructor() {
//     this.homyData = null
//     this.flatData = null
//   }
//
//   loadHomy = () => {
//     if (!this.homyData) {
//       return fetch('http://localhost:3000/places')
//         .then((response) => {
//           return response.text()
//         })
//         .then<Places>((responseText) => {
//           return JSON.parse(responseText)
//         }).then((data) => {
//           this.homyData = data
//           return data
//         })
//     } else return Promise.resolve(this.homyData)
//   }
//
//   loadFlatRent = (searchData: SearchParam) => {
//     if (!this.flatData) {
//       return sdk.search(searchData)
//         .then(data => {
//           const lastIndex = this.homyData ? Object.keys(this.homyData).length : 0
//           const formatData = {}
//           data.forEach((el, index) => {
//             console.log(el)
//             formatData[lastIndex + index + 1] = {
//               bookedDates: el.bookedDates,
//               description: el.details,
//               id: el.id,
//               image: el.photos[0],
//               name: el.title,
//               price: el.price,
//               remoteness: 0
//             }
//           })
//           this.flatData = formatData
//           console.log(this.flatData)
//           return formatData
//         })
//     } else return Promise.resolve(this.flatData)
//   }
// }

// const providersData = new ProvidersData()
// const sdk = new FlatRentSdk()

const search = (searchData: SearchParam, providers: SelectedProviders) => {

  const allProviders = {
    home: new HomeProvider(),
    flatRent: new FlatRentProvider()
  }

  const checkedProviders = Object.keys(providers).map(el => {
    if (providers[el]) return allProviders[el].find(searchData)
    return []
  })

  Promise.all(checkedProviders)
    .then((results) => {
      console.log([...results[0], ...results[1]])
      // renderSearchResultsBlock(...results)
    })

  // if (providers.homy && providers['flat-rent']) {
  //   providersData.loadHomy().then((data) => {
  //     for (const el in data) {
  //       if (data[el].price > searchData.priceLimit) delete data[el]
  //     }
  //     return data
  //   })
  //     .then(data => {
  //       const result = {...data}
  //       providersData.loadFlatRent(searchData).then((dataFR) => {
  //         if(!Object.keys(result).length) renderSearchResultsBlock()
  //         else renderSearchResultsBlock({...result, ...dataFR})
  //       })
  //     })
  //   return
  // }
  //
  // if (providers.homy) {
  //   providersData.loadHomy().then((data) => {
  //     for (const el in data) {
  //       if (data[el].price > searchData.priceLimit) delete data[el]
  //     }
  //     if(!Object.keys(data).length) renderSearchResultsBlock()
  //     else renderSearchResultsBlock(data)
  //   })
  //   return
  // }
  // if (providers['flat-rent']) {
  //   providersData.loadFlatRent(searchData).then((data) => {
  //     if(!Object.keys(data).length) renderSearchResultsBlock()
  //     else renderSearchResultsBlock(data)
  //   })
  //   return;
  // }
}

export const searchHandler = (): void => {
  const city = document.getElementById('city') as HTMLInputElement
  const checkIn = document.getElementById('check-in-date') as HTMLInputElement
  const checkOut = document.getElementById('check-out-date') as HTMLInputElement
  const maxPrice = document.getElementById('max-price') as HTMLInputElement
  const provider = document.getElementsByName('provider') as  NodeListOf<HTMLInputElement>

  const searchData: SearchParam = {
    city: city.value,
    checkInDate: new Date(checkIn.value),
    checkOutDate: new Date(checkOut.value),
    priceLimit: Number(maxPrice.value)
  }
  const selectedProviders = {} as SelectedProviders
  for (const el of provider) {
    selectedProviders[el.value] = el.checked
  }

  search(searchData, selectedProviders)
}
