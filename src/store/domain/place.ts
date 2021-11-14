export class Place {
  constructor(
    private readonly provider: string,
    readonly originalId: string,
    readonly bookedDates: [],
    readonly description: string,
    readonly image: Array<string>,
    readonly name: string,
    readonly price: number
  ) {}

  get id () {
    return this.provider + '-' + this.originalId
  }
}
