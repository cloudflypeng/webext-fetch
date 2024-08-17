// 监听发送到@meanc-ext-fetch的消息, 并返回结果
// 设想中的数据结构是

interface FetchParams {
  url: string
  options: RequestInit
}

interface Message {
  source: string
  fetchParams?: FetchParams
}

interface EfetchRes {
  source: string
  res: string
}

const PACKAGE_SOURCE = '@meanc/webext-fetch'

function handleMessage(message: Message, _: any, sendResponse: Function) {
  if (message.source === PACKAGE_SOURCE && message.fetchParams) {
    // 通过fetchParams 执行 fetch 获取结果
    fetch(message.fetchParams.url, message.fetchParams.options)
      .then(res => res.json())
      .then((res) => {
        sendResponse({
          source: PACKAGE_SOURCE,
          res: JSON.stringify(res),
        })
      })
    return true
  }
}

function backgroundListener() {
  // 如果没有chrome 抛出异常
  if (!chrome?.runtime?.onMessage) {
    throw new Error('chrome is not defined, please use this package in chrome extension')
  }
  chrome.runtime.onMessage.addListener(handleMessage)
}

// 封装efetch方法, 返回promise, 将请求发送到后端, 然后将返回值封装成promise, 进行.then调用
async function efetch(url: string, options: any) {
  const efetchRes: EfetchRes = await chrome.runtime.sendMessage({
    source: PACKAGE_SOURCE,
    fetchParams: {
      url,
      options,
    },
  })

  if (efetchRes.source === PACKAGE_SOURCE && efetchRes.res) {
    return new Promise((resolve, reject) => {
      const fetchRes = JSON.parse(efetchRes.res)
      resolve(fetchRes)
      reject(new Error('Failed to fetch'))
    })
  }
  else {
    throw new Error('Failed to fetch')
  }
}

export default { backgroundListener, efetch }
