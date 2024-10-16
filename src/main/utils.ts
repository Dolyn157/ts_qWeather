
//加载城市地图字典

import fs from "fs";
import {finished} from "stream/promises";
import {parse} from "csv-parse";

export const getCityMap = async (csvFile: string): Promise<Map<any, any>> => {
  let cityM = new Map<string, object>()
  const parser = fs
    .createReadStream(csvFile, { encoding: 'utf8'})
    .pipe(parse({
      // CSV options if any
      skip_empty_lines:true,
      columns:true,
      trim:true
    }));
  parser.on('readable', function(){
    let record; while ((record = parser.read()) !== null) {
      // Work with each record
      const obj = {'Location_ID': record.Location_ID, 'Latitude': record.Latitude, 'Longitude': record.Longitude};
      cityM.set(record.Location_Name_ZH, obj)
    }
  });
  await finished(parser);
  return cityM;
};

/*interface ServerResponse {
  code: string
  updateTime: string
  fxLink: string
  now: object
  refer: object
}
*/

export const fetchUrl = async (targetURL: string): Promise<object> => {
  let weatherData: object = {}

  try {
    const response = await fetch(targetURL, {
      method: 'GET', // 使用 'GET' 方法
      headers: {
        'Content-Type': 'application/json' // 设置请求头
      }
    });

    if (response.ok) {
      weatherData = await response.json(); // 解析 JSON 数据
    } else {
      console.error('Network response was not ok:', response.statusText);
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

  return weatherData // 返回获取的数据
}
