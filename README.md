<h1>簡易留言板</h1>
<p>這是我為了練習node.js與SQL所建立的第一個作品，參考自 <a href="https://ycjhuo.gitlab.io/blogs/NodeJS-Express-Build-Bulletins.html"> YC's Weekly Journal </a>。</p>
<hr>
<h2>資料夾結構</h2>
<p>
<strong>public：</strong>資料夾內放置 css, image, js 等網站會用到的資源、圖片等<br>
<strong>views：</strong>放置各個頁面的 html (方便管理)<br>
<strong>app.js：</strong>業務邏輯<br>
<strong>package.</strong>json：專案設定 & 用到的各種套件
</p>

<pre>
my_messageBoard
└── public
    └── css
        └── main.css
    ├── image
    └── js
└── views
    ├── index.html
    ├── post.html
    └── 404.html
├── app.js
└── package.json
</pre>

<h2>環境設定</h2>
<h3>npm套件安裝</h3>
<pre>
npm install art-template
npm install body-parser
npm install express
npm install express-art-template
npm install mysql
</pre>
<h3>MySQL資料庫設定</h3>
<p>本次的MySQL所使用的table須預先設置。</p>
<pre>
USE test;
CREATE TABLE message (name VARCHAR(8), message VARCHAR(255), dateTime DATETIME);
SELECT * FROM message;
</pre>
<hr>
<h2><span>&#9888;</span>提醒</h2>
<P>內容中有使用到來自外部網站連結的css，基於職業習慣，我有對它進行 <a href="https://www.virustotal.com/">Virustotal</a> 的掃描，若不放心可再自行透過其他管道檢查。</P>
