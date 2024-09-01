import { MonthlyYearData } from '../src/model/domain/monthlyYearData'
import dayjs from 'dayjs'

describe('MonthlyYearData', () => {
  describe('get', () => {
    it('default', async () => {
      const monthlyData = new MonthlyYearData(2024)
      const records = await monthlyData.find()
      console.log(records)
    })
    it('name', async () => {
      const monthlyData = new MonthlyYearData(2024)
      const records = await monthlyData.find('test-1')
      console.log(records)
    })
    it('name and team', async () => {
      const monthlyData = new MonthlyYearData(2024)
      const records = await monthlyData.find('test-1', 'A')
      console.log(records)
    })
    it('team', async () => {
      const monthlyData = new MonthlyYearData(2024)
      const records = await monthlyData.find('', 'A')
      console.log(records)
    })
  })
  describe('get: update', () => {
    it('default', async () => {
      const monthlyData = new MonthlyYearData(2024, dayjs().subtract(1, 'day'))
      const initUnixtime = monthlyData.getDate.utcOffset()
      await monthlyData.find()
      expect(initUnixtime).not.toEqual(monthlyData.getDate) // 1日以上経過したので更新されていること
    })
  })
})
