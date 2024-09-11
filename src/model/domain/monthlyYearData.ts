import { MonthlyData } from './monthlyData'
import type { MonthlyDataRecord } from './monthlyData'
import dayjs from 'dayjs'

export interface MonthlyYearDataRecord {
  name: string
  team: string
  labels: string[]
  data: MonthlyDataRecord[][]
}

export class MonthlyYearData {
  private monthlyDataList: MonthlyData[] = []
  private readonly UPDATE_UTC_SPAN = 60 * 60 * 24 * 1000
  private labels: string[] = []

  constructor(
    public readonly year: number,
    public getDate: dayjs.Dayjs = dayjs(),
    private startDate: dayjs.Dayjs = dayjs().subtract(1, 'year').add(1, 'month'),
    private endDate: dayjs.Dayjs = dayjs()
  ) {
    startDate.day(1)
    startDate.hour(0)
    startDate.minute(0)
    startDate.second(0)
    startDate.millisecond(0)

    endDate.day(1)
    endDate.hour(0)
    endDate.minute(0)
    endDate.second(0)
    endDate.millisecond(0)
  }

  // get monthly data
  public async find(name: string = '', team: string = ''): Promise<MonthlyYearDataRecord> {
    if (this.monthlyDataList.length === 0 || this.getDate.isBefore(dayjs().subtract(1, 'day'))) {
      this.getDate = dayjs()
      for (let date = this.startDate; date.isBefore(this.endDate); date = date.add(1, 'month')) {
        const monthly = new MonthlyData(date.year(), date.month(), this.getDate)
        this.monthlyDataList?.push(monthly)
        this.labels.push(monthly.getLabel())
      }
    }

    const data: (MonthlyDataRecord[] | undefined)[] = await Promise.all(
      this.monthlyDataList.map((m) => m.find(name, team))
    )
    return {
      name: name,
      team,
      labels: this.labels,
      data
    } as MonthlyYearDataRecord
  }
}
