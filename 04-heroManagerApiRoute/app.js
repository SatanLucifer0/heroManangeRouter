const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const user = require(path.join(__dirname,'route','userRoute.js'));
const hero = require(path.join(__dirname,'route','heroRoute.js'));



// 创建服务器
const app = express();

// 用的 post 所以要设置请求头
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));



//使用中间件来使用 路由文件.
app.use('/user',user);
app.use('/hero', hero);




// 开启服务器
app.listen(4000, () => {
    console.log('开起了');

});