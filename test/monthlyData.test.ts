import exp = require('constants')
import { MonthlyData } from '../src/model/domain/monthlyData'

describe('MonthlyData', () => {
  describe('get', () => {
    it('default', async () => {
      const monthlyData = new MonthlyData(2024, 8)
      const records = await monthlyData.get()
      expect(records.length).toBe(3)
      expect(records[0].name).toBe('test-1')
      expect(records[1].name).toBe('test-2')
      expect(records[2].name).toBe('test-3')
      expect(records[0].team).toBe('A')
      expect(records[1].team).toBe('B')
      expect(records[2].team).toBe('A')
    })
    it('name', async () => {
      const monthlyData = new MonthlyData(2024, 8)
      const records = await monthlyData.get('test-1')
      expect(records.length).toBe(1)
      expect(records[0].name).toBe('test-1')
      expect(records[0].team).toBe('A')
    })
    it('name and team', async () => {
      const monthlyData = new MonthlyData(2024, 8)
      const records = await monthlyData.get('test-1', 'A')
      expect(records.length).toBe(1)
      expect(records[0].name).toBe('test-1')
      expect(records[0].team).toBe('A')
    })
    it('team', async () => {
      const monthlyData = new MonthlyData(2024, 8)
      const records = await monthlyData.get('', 'A')
      expect(records.length).toBe(2)
      expect(records[0].name).toBe('test-1')
      expect(records[1].name).toBe('test-3')
      expect(records[0].team).toBe('A')
      expect(records[1].team).toBe('A')
    })
  })
  describe('get: update', () => {
    it('default', async () => {
      const monthlyData = new MonthlyData(2024, 8, new Date(Date.now() - 60 * 60 * 24 * 1000))
      const initUnixtime = monthlyData.getDate.getUTCDate()
      await monthlyData.get()
      expect(initUnixtime).not.toEqual(monthlyData.getDate) // 1日以上経過したので更新されていること
    })
  })
})
