import { getHttpCsv } from '../src/model/utils/httpCsvGetter'

describe('httpCsvGetter', () => {
  it('works', async () => {
    const res = await getHttpCsv(
      'https://raw.githubusercontent.com/kocya-dev/github-csv-content-view-sample/main/data/2024-08.csv'
    )
    console.log(res)
  })
})
