var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : '127.0.0.1',
  port: 3306,
  user     : 'user',
  password : 'user_password',
  database : 'test'
});
 
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM message;";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
