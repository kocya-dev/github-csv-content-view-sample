import { getHttpCsv } from '../utils/httpCsvGetter'
import { BASE_URL } from '../globals/contants'
import dayjs from 'dayjs'
import { round } from '../utils/numUtils'

export interface MonthlyDataRecord {
  name: string
  team: string
  cost: number
}

export class MonthlyData {
  private data: MonthlyDataRecord[] | undefined = undefined
  private static SAVE_ROW_COUNT = 20

  constructor(
    public readonly year: number,
    public readonly month: number,
    public getDate: dayjs.Dayjs = dayjs()
  ) {}

  public getLabel(): string {
    return `${this.year.toString().padStart(4, '0')}-${this.month.toString().padStart(2, '0')}`
  }

  public async get(name: string = '', team: string = ''): Promise<MonthlyDataRecord[] | undefined> {
    if (dayjs(`${this.year}-${this.month}-01`) < dayjs('2024-06-01')) return undefined

    if (!this.data || this.getDate.isBefore(dayjs().subtract(1, 'day'))) {
      const data: MonthlyDataRecord[] = await getHttpCsv(
        `${BASE_URL}${this.year.toString().padStart(4, '0')}-${this.month.toString().padStart(2, '0')}.csv`
      )
      this.data = data.slice(0, MonthlyData.SAVE_ROW_COUNT).map((r) => {
        return {
          name: r.name,
          team: r.team,
          cost: round(Number(r.cost), 3)
        }
      })
      this.getDate = dayjs()
    }
    return this.data?.filter((r) => r.name.includes(name) && r.team.includes(team))
  }
  // find monthly data
  public async find(
    name: string = '',
    team: string = ''
  ): Promise<MonthlyDataRecord[] | undefined> {
    if (dayjs(`${this.year}-${this.month}-01`).isBefore(dayjs('2024-06-01'))) return undefined
    const data = await this.get(name, team)
    return data
  }
}
