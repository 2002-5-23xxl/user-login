// img小眼睛
$('img').on('click', function () {
   if ($('.pad').attr('type') == 'password') {
      $('.pad').attr('type', 'text')

      $('img').attr('src', '../image/eye-fill.png')
   } else if ($('.pad').attr('type') == 'text') {
      $('.pad').attr('type', 'password')

      $('img').attr('src', '../image/eye slash-fill.png')
   }
})
// 点击登录发送请求对比用户输入的账号密码对不对
$('.login').on('click', function () {
   // 获得用户输入的内容
   let us = $('.use').val()
   let pad = $('.pad').val()
   let url = 'http://127.0.0.1:8080/login'
   $.ajax({
      method: 'GET',
      url: url,
      data: {
         username: us,
         password: pad
      },
      success: function (res) {
         JudegErr(res)

      }
   })
})
function JudegErr (res) {
   let us = $('.use').val()
   localStorage.setItem('username', us)
   if (res.statusbar === 200) {
      $('.run').stop().fadeIn(1000)
      $('.box').addClass('filter')
      // 登录成功页面按钮
      $('.go').on('click', function () {
         let num = 3
         let time = setInterval(function () {
            num -= 1
            $('.yes').text('还有秒' + num + '跳转')
            if (num === 0) {
               $('.run').stop().fadeOut()
               $('.box').removeClass('filter')
               window.open('http://127.0.0.1:5500/15.users-login/html/user-login.html')
               clearInterval(time)
            }
         }, 1000)
      })
   } else if (res.statusbar === 400) {
      $('.err').stop().fadeIn(1000)
      $('.box').addClass('filter')
      // 登录失败页面按钮
      $('.back').on('click', function () {
         $('.err').stop().fadeOut(500)
         $('.box').removeClass('filter')
      })
   } else if (res.statusbar === 201) {
      $('.yes').text('管理员来啦')
      $('.run').stop().fadeIn(1000)
      $('.box').addClass('filter')
      $('.go').on('click', function () {
         let us = $('.use').val()
         localStorage.setItem('username', us)
         let num = 3
         let time = setInterval(function () {
            num -= 1
            $('.yes').text('还有秒' + num + '跳转')
            if (num === 0) {
               $('.run').stop().fadeOut()
               $('.box').removeClass('filter')
               window.open('http://127.0.0.1:5500/15.users-login/html/administrtor.html')
               clearInterval(time)
            }
         }, 1000)
      })
   }
}

// 给注册按钮绑定事件
$('.regist').on('click', function () {
   window.open('http://127.0.0.1:5500/15.users-login/html/regist.html')
})
