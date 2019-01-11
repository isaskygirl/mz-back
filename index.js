// 演示 async 与 await 的使用

// ```
// setTimeout(() => {
//   console.log('setTimeout');
// }, 2000);

// console.log('init');
// ```

// 以上代码，先输入 init 然后输出 setTimeout

// 想要： 先输入  setTimeout 然后输入 init

// 1. 代码的最外层必须是一个 async 的函数
// 2. 需要转成 同步的异步代码 也得改造。改造成一个 promise , 也就是要返回一个 promise 对象
// 3. 在 外层 async 方法中 调用 2步中的函数的时候，需要在其前面加上 await

// PS： 2步中的改造，需要明确，什么时候等待完成（也就是异步操作执行完成的后，需要告诉外面）就得调用 resolve();
const http = require('http');

function timeout () {
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    //   console.log('setTimeout');
    //   // 完成了
    //   resolve();
    // }, 2000);

    http.get('http://58.87.126.209:9091/api/film?type=1&pageNum=1&pageSize=10', (res) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      })

      res.on('end', () => {
        // console.log(rawData);
        resolve(rawData);
      })
    }).on('error', (error) => {
      // console.log('请求失败', error);
      reject('请求失败');
    })
  })
}

async function main() {

  try {
    let name = await timeout();
    console.log(name);

    console.log('init');
  } catch (error) {
    console.log('错误', error);
  }



}

main();
