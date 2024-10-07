
//加载城市地图字典

export const fetchUrl = async (targetURL: string): Promise<{}> => {
  let weatherData = {};

  try {
    const response = await fetch(targetURL, {
      method: 'GET', // 使用 'GET' 方法
      headers: {
        'Content-Type': 'application/json' // 设置请求头
      },

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
