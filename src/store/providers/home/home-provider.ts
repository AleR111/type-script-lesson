import { Provider } from '../../domain/provider.js';
import {SearchFilter} from '../../domain/search-filter.js';
import { Place } from '../../domain/place.js';
import { HomePlaceList } from './response.js';

export class HomeProvider implements Provider {
  static provider = 'home'
  private static apiURL = 'https://lockalhost:3040/places'

  find(filter: SearchFilter): Promise<Place[]> {
    return fetch(HomeProvider.apiURL)
      .then(data => data.json())
      .then((data) => this.filterData(data, filter))
      .then((filteredData) => this.convertToStandard(filteredData))
  }

  private filterData(data: HomePlaceList, filter: SearchFilter): Promise<HomePlaceList> {
    for (const el in data) {
      if (data[el].price > filter.priceLimit) delete data[el]
    }
    return Promise.resolve(data)
  }

  private convertToStandard(data: HomePlaceList): Place[] {
    const places = [] as Place[]
    for (const el in data) {
      const convertPlace = new Place(
        HomeProvider.provider,
        data[el].id,
        data[el].bookedDates,
        data[el].description,
        [data[el].image],
        data[el].name,
        data[el].price,
      )
      places.push(convertPlace)
    }

    return places

  }

}
