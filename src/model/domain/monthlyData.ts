import { getHttpCsv } from '../utils/httpCsvGetter'
import { BASE_URL } from '../globals/contants'

export interface MonthlyDataRecord {
  name: string
  team: string
  cost: number
}

export class MonthlyData {
  private data: MonthlyDataRecord[] | undefined = undefined
  private readonly UPDATE_UTC_SPAN = 60 * 60 * 24 * 1000

  constructor(
    public readonly year: number,
    public readonly month: number,
    public getDate: Date = new Date()
  ) {}

  // get monthly data
  public async get(name: string = '', team: string = ''): Promise<MonthlyDataRecord[]> {
    if (!this.data || this.getDate.getUTCDate() < Date.now() - this.UPDATE_UTC_SPAN) {
      this.data = await getHttpCsv(
        `${BASE_URL}${this.year.toString().padStart(4, '0')}-${this.month.toString().padStart(2, '0')}.csv`
      )
      this.getDate = new Date()
    }
    return this.data!.filter((r) => r.name.includes(name) && r.team.includes(team))
  }
}
