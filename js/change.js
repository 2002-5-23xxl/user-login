// 点击修改按钮后的事件
$('.yes').on('click', function () {
   let u = $('.use').val()
   let o = $('.old').val()
   let p = $('.pad').val()
   let p1 = $('.pad1').val()
   let data = []
   if (u.length < 3 || u.length > 10 || o.length < 6 || o.length > 10 || p.length < 6 || p.length > 10 || p1.length < 6 || p1.length > 10) {
      console.log('不符合');
      $('.err').stop().fadeIn(1000)
      $('.box').addClass('filter')
   } else {
      if (p == o || p1 == o) {
         $('.err1').stop().fadeIn(1000)
         $('.box').addClass('filter')
      } else {
         ManyAjax(u, o, p1)
      }
   }
})
function ManyAjax (u, o, p1) {
   let url = 'http://127.0.0.1:8080/judge'
   $.ajax({
      method: 'GET',
      url: url,
      data: {
         username: u,
         password: o
      },
      success: function (res) {
         if (res.statusbar === 200) {

            let url = 'http://127.0.0.1:8080/update'
            $.ajax({
               method: 'POST',
               url: url,
               data: {
                  username: u,
                  password: p1
               },
               success: function (res) {
                  if (res.statusbar === 200) {
                     $('.ok').stop().fadeIn()
                     $('.box').addClass('filter')
                  } else {
                     $('.err').stop().fadeIn(1000)
                     $('.box').addClass('filter')
                  }
               }
            })
         } else {
            $('.err').stop().fadeIn(1000)
            $('.box').addClass('filter')
         }
      }
   })
}
$('.back,.back1').on('click', function () {
   $('.err,.err1').stop().fadeOut()
   $('.box').removeClass('filter')
})
$('.go').on('click', function () {
   let num = 3
   let time = setInterval(function () {
      num -= 1
      $('.good').text('还有' + num + '秒跳转')
      if (num === 0) {
         window.open('http://127.0.0.1:5500/15.users-login/html/login.html')
         clearInterval(time)
         $('.ok').stop().fadeOut()
         $('.box').removeClass('filter')
      }
   }, 1000)
})
// 密码失去焦点
$('.pad').blur(function () {
   let data = $('.pad').val()
   let o = $('.old').val()
   if (data.length < 6 || data.length > 10) {
      $('.no').text('格式不对哦~')
   } else if (data.length >= 6 && data.length <= 10 && data != o) {
      $('.no').text('这个密码可以哒~')
      let pad = $('.pad').val()
      localStorage.setItem('password', pad)
   } else if (data === o) {
      $('.no').text('与旧密码不能一样哦~')
   }
})

// 密码获得焦点
$('.pad').focus(function () {
   let data = $('.pad').val()
   let o = $('.old').val()
   if (data.length >= 6 && data.length <= 10 && data != o) {
      $('.no').text('这个密码可以哒~')
   } else if (data.length >= 0 || data.length < 6 && data.length > 10) {
      $('.no').text('输入6~10位英文或数字')
   }
})

// 确认密码
$('.pad1').blur(function () {
   let data = $('.pad').val()
   let data1 = $('.pad1').val()
   if (data === data1) {
      $('.ps').text('两个密码一样的哦~')
   } else if (data != data1 && data1.length > 0) {
      $('.ps').text('不对哦~开小眼睛看看呗')
   }
})

$('.pad1').focus(function () {
   let data = $('.pad').val()
   let data1 = $('.pad1').val()
   if (data === data1) {
      $('.ps').text('两个密码一样的哦~')
   } else if (data != data1 && data1.length > 0) {
      $('.ps').text('不对哦~开小眼睛看看呗')
   }
})

// 小眼睛
// 第一个小眼睛
$('.eye').on('click', function () {
   if ($('.old').attr('type') == 'password') {
      $('.old').attr('type', 'text')
      $('.eye').attr('src', '../image/eye-fill.png')
   } else if ($('.old').attr('type', 'text')) {
      $('.old').attr('type', 'password')
      $('.eye').attr('src', '../image/eye slash-fill.png')
   }
})
// 后面两个小眼睛
$('.eye1,.eye2').on('click', function () {
   if ($('.pad').attr('type') == 'password') {
      $('.pad').attr('type', 'text')
      $('.pad1').attr('type', 'text')
      $('.eye1,.eye2').attr('src', '../image/eye-fill.png')
   } else if ($('.pad').attr('type') == 'text') {
      $('.pad').attr('type', 'password')
      $('.pad1').attr('type', 'password')
      $('.eye1,.eye2').attr('src', '../image/eye slash-fill.png')
   }
})
