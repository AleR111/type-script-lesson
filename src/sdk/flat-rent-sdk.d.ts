export function cloneDate(date: Date): Date

export function addDays(date: Date, days: number): Date

export interface searchParam {
  city: string
  checkInDate: Date
  checkOutDate: Date
  priceLimit?: number
}

export class FlatRentSdk {

  get(id: string): Promise<object | null>

  search(parameters: searchParam): Promise<object>

  book(flatId: number, checkInDate: Date, checkOutDate: Date): number

}








