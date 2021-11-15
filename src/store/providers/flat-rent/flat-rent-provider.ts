import { Provider } from '../../domain/provider.js';
import {SearchFilter} from '../../domain/search-filter.js';
import { Place } from '../../domain/place.js';
import { FlatRentPlaceList } from './response.js';
import { FlatRentSdk } from '../../../sdk/flat-rent-sdk.js';

const sdk = new FlatRentSdk()

export class FlatRentProvider implements Provider {
  static provider = 'flat-rent'

  find(filter: SearchFilter): Promise<Place[]> {
    return sdk.search(filter)
      .then((filteredData) => this.convertToStandard(filteredData))
  }

  private convertToStandard(data: FlatRentPlaceList): Place[] {
    return data.map(el => {
      return new Place(
        FlatRentProvider.provider,
        el.id,
        el.bookedDates,
        el.details,
        [...el.photos],
        el.title,
        el.totalPrice,
      )
    })

  }

}
