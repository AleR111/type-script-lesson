export function cloneDate(date: Date): Date

export function addDays(date: Date, days: number): Date

export interface SearchParam {
  city: string
  checkInDate: Date
  checkOutDate: Date
  priceLimit?: number
}

export interface FlatRentData {
  bookedDates: Array<any>
  coordinates: [number, number]
  details: string
  id: string
  photos: Array<string>
  title: string
  totalPrice: number
}

export class FlatRentSdk {

  get(id: string): Promise<object | null>

  search(parameters: SearchParam): Promise<Array<FlatRentData>>

  book(flatId: number, checkInDate: Date, checkOutDate: Date): number

}








