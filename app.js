var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

// 會先載入的留言紀錄(模擬)
var comments = [
  {
    name: 'User 1',
    message: 'Hello',
    dateTime: '2021-5-27 18:20:54'
  },
  {
    name: 'User 2',
    message: 'There',
    dateTime: '2021-5-27 18:20:54'
  }
]

http.createServer(function (req, res) {
    
    // parseObj = url.parse(urlStr, parseQueryString = false)
    // urlStr : url字串
    // parseQueryString : 預設false, true 會解析query string
    // parseObj : 解析後的url物件
    //      .protocol : 通訊協定
    //      .auth : 認證信息
    //      .username : 使用者帳號
    //      .password : 使用者密碼
    //      .host : 主機名稱 + 端口數
    //      .hostname : 主機名稱
    //      .port : 端口數
    //      .pathname : 網址
    //      .query : query string
    //      .hash : URL 的片段
    //      .href : 完整url
    //      .origin : url來源
    var parseObj = url.parse(req.url, true)
    var pathname = parseObj.pathname
    /* 
       在讀取首頁時，parseObj 為：
       Url { protocol: null, slashes: null, auth: null, host: null, port: null, hostname: null,
        hash: null, search: null, query: [Object: null prototype] {}, pathname: '/', path: '/', href: '/' }

       在 Post 頁，Submit 後 parseObj 為：
       Url { protocol: null, slashes: null, auth: null, host: null, port: null, hostname: null, hash: null,
         search: '?name=Leon&message=Say+something', query: [Object: null prototype] { name: 'Leon', message: 'Say something' },
          pathname: '/submit', path: '/submit?name=Leon&message=Say+something', href: '/submit?name=Leon&message=Say+something' }

       可看出不同的地方為：search, query, pathname, path, href，而等等我們就要用這個 query 來取得我們 submit 的值

       擷取網址列的路徑 (會忽略 ? 之後的內容)
       eg. http://localhost:3000/post?name=Leon&message=Say+something
       只會抓到 /post
    */

    // 路由邏輯
    // Homepage
    if (pathname === '/') {
      // data = ./views/index.html
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          return res.end('Loading index page failed.')
        }
        // 因為 data 是二進制，所以須轉為 string
        var htmlStr = template.render(data.toString(), { comments: comments })
        res.end(htmlStr)
      })
    }
    // Post page
    else if (pathname === '/post') {
      // data = ./views/post.html
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('Loading post page failed.')
        }
        res.end(data)
      })
    }

    // Opening access to folder public (若不開放 user 存取則可省略)
    // eg. http://localhost:3000/public/js/main.js
    else if (pathname.indexOf('/public/') === 0) {
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('Loading public folder failed.')
        }
        res.end(data)
      })
    }
    // Click submit
    else if (pathname === '/submit') {

      // 取得 submit 的 data
      // comment = query: [Object: null prototype] { name: 'Leon', message: 'Say something' }
      var comment = parseObj.query
      
      // 取得submit日期時間
      // today =  2021-05-28T18:40:03.622Z
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;
      comment.dateTime = dateTime

      // 將留言放在留言串前端
      comments.unshift(comment)

      // 設定狀態碼為 302 (網頁重定向)，跳轉到首頁
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    }
    // 設定 page 404 
    else {
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })

  .listen(3000, function () {
    console.log('running...')
  })