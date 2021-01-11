
import { message } from 'antd'

async function fetching(url, item = {}) {


  const {
    method = "GET",
    body = {},
    data = {},
    headers = {}
  } = item
  const pramas = {
    method,
  }

  if (method === 'POST') {
    pramas.body = JSON.stringify(body)
    pramas.headers = {
      ...headers,
      'Content-Type': 'application/json'
    }
  } else if (method === 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      if (data[key]) {
        dataStr += key + '=' + data[key] + '&';
      }
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
    pramas.headers = {
      ...headers,
    }
  }

 
    return fetch(url, pramas)
      .then(response => response.json())
      .then(res => {
        if (!res || (res && res.code !== 200)) {
          throw res;
        } else return res
      })
      .catch((err) => {
        alert('错误提示 '+ JSON.stringify(err ))
        console.log('err', err)
      })
 

}

export default fetching