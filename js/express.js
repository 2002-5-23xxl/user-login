const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))
const router = require('./mysql')
const cors = require('cors')
app.use(cors())// 解决跨域
app.use('/', router)
app.listen(8080, () => {
   console.log('app running at http://localhost:8080/login');
})