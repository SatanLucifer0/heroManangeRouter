var express = require('express')
var router = express.Router()

const path=require('path');
// 导入自己的包
const db = require(path.join(__dirname, '../utils', 'db.js'));





// 获取所有英雄信息
router.get('/herolist',(req,res)=>{

    db.connection.query(`select * from heromassage`,(error,results)=>{

        if(error==null){
            res.send({
                code:201,
                msg:'获取成功',
                results
            });
        }else{
            res.send({
                code:402,
                msg:'获取失败' 
            });
        }
    });
});


//根据id查某个英雄
router.get('/getHeroById',(req,res)=>{
    //接收到用户传递过来的id.
    const {id} = req.query;
    //调用db.js操作数据库,获取当前id的英雄.
    db.connection.query(`select id,name,skill,icon from heromassage where  id = ${id}`,(err,data)=>{
        if(err == null){
            res.send({
                code:200,
                msg:'查询成功',
                data
            });
        }else {
            res.send({
                code:500,
                msg:'服务器内部错误'
            });
        }
    });

});

module.exports = router