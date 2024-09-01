import axios from 'axios'
import { parse } from 'csv-parse/sync'

/**
 * CSVデータ取得
 * @param url
 * @returns CSVデータオブジェクト列
 */
export const getHttpCsv = async (url: string) => {
  //https://raw.githubusercontent.com/kocya-dev/github-csv-content-view-sample/main/data/2024-08.csv,
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-type': 'text/csv'
      }
    })
    /*
    .then((res: any) => console.log(res.data))
    .catch((error: any) => console.error(error))
  */

    const records = parse(response.data, {
      columns: true, // 全列を取得
      skip_empty_lines: true, // 空行をスキップ
      relax_column_count: true // 列数をチェックしない
    })
    return records
  } catch (error) {
    console.error(`get error: ${url}`)
    console.error(error)
    return []
  }
}
