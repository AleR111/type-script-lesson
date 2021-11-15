export interface PlaceListResponse {
  error?: string
  places: {
    [key: string]: FlatRentPlace
  }
}

export interface FlatRentPlace {
  id: string
  title: string
  details: string
  photos: Array<string>
  coordinates: [number, number]
  bookedDates: []
  totalPrice: number
}

export type FlatRentPlaceList = Array<FlatRentPlace>