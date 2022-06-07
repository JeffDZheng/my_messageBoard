var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql');

var app = express()

// body-parser 用來抓取 HTML Form Post 數據
// 加入後 req 就會多出 body 這個屬性
// 就可透過 req.body 得到 POST 的數據
// parse 請求報文主體的型別: <application/x-www-form-urlencoded>
app.use(bodyParser.urlencoded({ extended: false }))
// parse 請求報文主體的型別: <application/json>
app.use(bodyParser.json())

//建立MySQL連線
var con = mysql.createConnection({
  host     : '127.0.0.1',
  port: 3306,
  user     : 'user',
  password : 'user_password',
  database : 'test',
  dateStrings : true
});
  
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

    var sql = "SELECT * FROM message ORDER BY dateTime DESC;";
    //引入MySQL留言資料
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render('index.html', {
      comments: result
    });
  })
})

// Post page
app.get('/post', function (req, res) {
  res.render('post.html')
})

// Click submit on post page
app.post('/submit', function (req, res) {
  var comment = req.body
  var username = comment.name
  var message = comment.message

  var sql = "INSERT INTO message (name,message,dateTime)VALUES('"+username+"','"+message+"',NOW());";
    //引入MySQL留言資料
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
})

//需要關鍵字輸入****
app.get('/search',function (req,res){
  //解析query string
  var search_query = req.query
  var input_rname = search_query.name
  var input_keyword = search_query.message

  //轉為MySQL語言向Database發送要求
  var sql = "SELECT * FROM message WHERE name LIKE '%"+input_rname+"%' and message LIKE '%"+input_keyword+"%' ORDER BY dateTime DESC;";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(sql);
      res.render('index.html', {
        comments: result
      });
    });
})

// 若頁面不存在則導向到 404 page
app.get('*', function (req, res) {
  res.status(404).render('404.html')
})

app.listen(3000, function () {
  console.log('running...')
})