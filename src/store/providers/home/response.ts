export interface PlaceListResponse {
  error?: string
  places: {
    [key: string]: HomePlace
  }
}

export interface HomePlace {
  id: number
  name: string
  description: string
  image: string
  remoteness: number
  bookedDates: []
  price: number
}

export interface HomePlaceList {
  [key: string]: HomePlace
}
