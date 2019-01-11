微信 jssdk 的签名的步骤：

1. 得到 jsapi_ticket   https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
   1. 必须使用 access_token 来得到 jsapi_ticket

2. 得到 随机字符串 noncestr

3. 得到 当前时间戳 timestamp ， 单位是秒

4. 得到 需要调取功能的页面的页面url地址 url

5. 将上面4个步骤中的数据做一个字典排序拼接成字符串通过 & 拼接。得到 一个 字符串

6. 将 第5步中 的 字符串做一个 签名 sha1() , 得到一个签名数据 signature

7. 最后将前端需要的数据返回给前端
   wx.config({
     appId: '',
     noncestr: '',
     timestamp: '',
     signature: '',
     jsapiList: [

     ]
   })


PS:
1. access_token 与 jsapi_ticket 有接口限制。需要我们做存储。
2. 端口只能是 80 或者 443


异步操作的几种手法

1. 回调函数
2. 事件的方法
3. generator 处理将 异步代码写成同步的方式
4. 大绝招     async await   ES8 中的代码


### async / await 将异步的方法转成 同步的写法

fs.readFile(, () =>)

fs.readFileSync

回调地狱的示例

function () => {
  () => {
    () => {
      () => {
        () => {
          () => {

          }
        }
      }
    }
  }
}

经过promise处理一下
() => {

}
.then()
.then()
.then()
.then()

经过 async wait 处理
async () => {
  await fn1();
  await fn2();
  await fn3();
}
