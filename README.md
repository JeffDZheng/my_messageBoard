一個簡易留言板
===
這是我為了練習node.js與SQL所建立的第一個作品，參考自[YC's Weekly Journal](https://ycjhuo.gitlab.io/blogs/NodeJS-Express-Build-Bulletins.html)。

#專案結構

##public：資料夾內放置 css, image, js 等網站會用到的資源、圖片等
---
##views：放置各個頁面的 html (方便管理)
##app.js：業務邏輯
##package.json：專案設定 & 用到的各種套件

```
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
```
