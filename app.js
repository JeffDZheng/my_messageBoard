var express = require('express')
var bodyParser = require('body-parser')

var app = express()


// body-parser 用來抓取 HTML Form Post 數據
// 加入後 req 就會多出 body 這個屬性
// 就可透過 req.body 得到 POST 的數據

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// 每次重開服務時，預先保存的留言(可省略)
var comments = [
  {
    name: 'User 1',
    message: 'Hello',
    dateTime: '2021-6-2 17:30:32'
  },
  {
    name: 'User 2',
    message: 'There',
    dateTime: '2021-6-2 17:30:32'
  }
]

// 先將 art-template 模板引擎引入 express
// 第一個參數表示將哪種頁面的副檔名 (html, jade, art) 帶入模板引擎中
app.engine('html', require('express-art-template'))


// Opening access to folder public (若不開放 user 存取則可省略)
// eg. http://localhost:3000/public/css/main.css

// 若省略第一個參數，則存取 public folder 內的檔案時則不須在網址列加上 /public
// eg. http://localhost:3000/css/main.css
app.use('/public/', express.static('./public/'))

// 路由邏輯
// Homepage
app.get('/', function (req, res) {
    // res.render('HTML 檔名), {要帶入的 data})
    // 第一個參數不須寫路徑，預設會去 views folder 裡面找
    // 若要更改默認目錄，則用 app.set('views', '默認目錄的路徑')
    res.render('index.html', {
    comments: comments
  })
})

// Post page
app.get('/post', function (req, res) {
  res.render('post.html')
})

// Click submit on post page
app.post('/submit', function (req, res) {
  var comment = req.body
  
  // today =  2021-05-28T18:40:03.622Z
  var today = new Date();
  
  var date = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time
  comment.dateTime = dateTime
  
  comments.unshift(comment)

  // submit 結束後跳轉至首頁
  res.redirect('/')
})

// 若頁面不存在則導向到 404 page
app.get('*', function (req, res) {
  res.status(404).render('404.html')
})

app.listen(3000, function () {
  console.log('running...')
})