export interface HomePlace {
  id: string
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
