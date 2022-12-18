const mysql = require('mysql')
user = mysql.createConnection({
   host: '127.0.0.1',// 数据库ip地址
   user: 'root', // mysql账号
   password: '123456',// 数据库密码
   database: 'username'// 数据库名字
})
const express = require('express')
const router = express.Router()

// 登录接口
router.get('/login', (req, res) => {
   let us = req.query.username
   let pad = req.query.password
   // 数据库
   let sqlstr = 'select * from user'
   user.query(sqlstr, (err, success) => {
      // 获得用户名字
      let username = []
      let password = []
      for (var i = 0; i < success.length; i++) {
         username.push(success[i].username)
         password.push(success[i].password)
      }
      if (us === 'xxl') {
         res.send({
            message: '成功',
            statusbar: 201,
            data: {
               username: username,
               password: password
            }
         })
      } else if (us != 'xxl') {
         if (username.indexOf(us) >= 0 && password.indexOf(pad) >= 0) {
            res.send({
               message: '成功',
               statusbar: 200,
            })
         } else {
            // 账号或者密码填写错误
            res.send({
               message: '失败',
               statusbar: 400,
               data: {
                  username: username,
                  password: password,
               },

            })
         }
      }
   })
})



// 注册账号接口
router.post('/regist', (req, res) => {
   let us = req.body.username
   let pad = req.body.password
   let uspad = { us, pad }
   // 数据库
   let sqlStr = `insert into user(username,password) value(?,?)`
   user.query(sqlStr, [uspad.us, uspad.pad], (err, success) => {
      if (us.length >= 3 && us.length <= 8 || pad.length >= 6 && pad.length <= 10) {
         res.send({
            message: '成功',
            statusbar: 200
         })
      } else {
         res.send({
            message: "失败",
            statusbar: 300
         })
      }

   })
})
// 判断接口
router.get('/judge', (req, res) => {
   let sqlstr = 'select * from user'
   user.query(sqlstr, (err, success) => {
      // 获取用户输入的内容
      let u = req.query
      let username = []
      let password = []
      for (var i = 0; i < success.length; i++) {
         username.push(success[i].username)
         password.push(success[i].password)
      }
      if (username.indexOf(u.username) >= 0 && password.indexOf(u.password) >= 0) {
         res.send({
            message: '成功',
            statusbar: 200
         })
      } else {
         res.send({
            message: '失败',
            statusbar: 300
         })
      }
   })
})
// 修改密码接口
router.post('/update', (req, res) => {
   // 获得前端的账号密码
   let usepad = req.body
   let UsepadName = usepad.username.length
   let UsepadPad = usepad.password.length
   // 数据库
   let del = 'update	user set password=?  where (username=?);'
   user.query(del, [usepad.password, usepad.username], (err, success) => {
      if (err) {
         console.log(err);
      } else if (UsepadName >= 6 && UsepadName <= 10 || UsepadPad >= 6 && UsepadPad <= 10) {
         res.send({
            message: '成功',
            statusbar: 200
         })
      } else {
         res.send({
            message: '失败',
            statusbar: 300
         })
      }
   })
})

// 删除接口
router.post('/delete', (req, res) => {
   let data = req.body
   let str = 'delete from username.user where username=?'
   user.query(str, [data.username], function (err, success) {
      if (err) {
         console.log(err);
      } else {
         res.send({
            message: '成功',
            statusbar: 200
         })
      }
   })
})

// 
module.exports = router

