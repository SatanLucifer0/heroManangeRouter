var express = require('express');
var router = express.Router();
const path=require('path');


// 导入自己的包
const db = require(path.join(__dirname, '../utils', 'db.js'));


// 注册用户
router.post('/register', (req, res) => {

    // 先获取用户提交过来的数据
    const { username, password } = req.body;
    //通过操作数据库,把这个用户名和密码添加到对应的库表中去.
    //1.使用db.js查询一下这个用户名有没有被注册过. 
    db.connection.query(`select * from register where username='${username}'`, (err, results) => {
        console.log(err);         /* 错误信息提示 为null 表示没有错误信息 */
        console.log(results);    /* 操作数据库返回的结果 返回的是一个数组*/
        if (err == null) {
            if (results.length == 0) {     /* 返回的结果为数组,,数组路包含对象,,,数组长度为0表示获取的目标不在数据表格里 */
                db.connection.query(`insert into register(username,password) values('${username}','${password}')`, (error, resu) => {
                    console.log(resu);
                    if (error == null) {
                        res.send({
                            code: 200,
                            msg: '注册成功'
                        });
                    } else {
                        res.send({
                            code: 400,
                            msg: '注册失败'
                        });
                    }
                });
            } else {
                res.send({
                    code: 405,
                    msg: '账号已被注册,你无法使用'
                });
            }
        } else {
            res.send({
                code: 500,
                msg: '系统内部错误'
            });
        }
    });
});



// 用户登录

router.post('/login',(req,res)=>{

    const {username,password}=req.body;
    db.connection.query(`select * from register where username='${username}' and password='${password}'`,(error,results)=>{
        // 把获取到的数据赋值给参数去数据库里面查,,看有没有这样的数据
        console.log(results);
        console.log(error);
        
        if(error==null){
            if(results.length==0){
                res.send({
                    code:400,
                    msg:'账号密码错误'
                });
            }else{
                res.send({
                    code:200,
                    msg:'登录成功'
                });
            }
        }else{
            res.send({
                code:401,
                msg:'系统内部错误'
            });
        }
    });
});


module.exports = router