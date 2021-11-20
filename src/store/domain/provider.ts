import { Place } from './place.js';
import { SearchFilter } from './search-filter.js';

export interface Provider {

  find(filter: SearchFilter): Promise<Place[]>

}
