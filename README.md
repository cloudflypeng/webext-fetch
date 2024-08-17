这是一个chrome插件, 用于使用 background 进行数据交互代理

1. 安装
  npm i @meanc/webext-fetch
2. 开启background
  import {backgroundListener} from '@meanc/webext-fetch'
  backgroundListener()
3. 使用
  import {efetch} from '@meanc/webext-fetch'
  efetch('https://api.meanc.cn/v1/user/info', {
    method: 'GET',
  }).then(res => {
    console.log(res)
  })
