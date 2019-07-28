const bodyParser=require('body-parser');
const multer=require('multer');
const cors=require('cors');

const express=require('express');
const path=require('path');
const db=require(path.join(__dirname,'utils','db.js'));

// 创建服务器
const app=express();

// 注册路由
app.get('/all',(req,res)=>{
    
    // 用我们自定义的db.js模块来操作数据库
    db.connection.query(`select * from heromassage`,(error,results)=>{

        if(error==null){
            res.send('获取成功')
            console.log(results);
            
        }else{
            res.send({
                code:500,
                msg:'服务器内部错误'
            });
        }
    });
});

// 开启服务器
app.listen(4000,()=>{
    console.log('开启了2');
});