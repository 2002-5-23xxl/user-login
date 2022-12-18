// 打开页面就发起ajax  get请求  把后台的username响应到前端
$.ajax({
   method: 'GET',
   dataType: 'json',
   url: 'http://127.0.0.1:8080/judge',
   success: function (res) {
      let data = res.datas
      AsLike(data)
   }
})
// 用户input框失去焦点拿到用户输入的内容

function AsLike (names) {
   // 账号输入框失去焦点
   $('.use').blur(function () {
      let data = $('.use').val()
      // 判断用户输入的格式是否正确
      if (data.length <= 8 && data.length >= 3) {
         // 判断数据库中是否有这个账号
         if (names.indexOf(data) >= 0 || data.indexOf(' ') >= 0) {
            $('.have').text('账号存在，换一个把')
         }
         else if (names.indexOf(data) === -1) {
            $('.have').text('这个可以的哦~')
            let user = $('.use').val()
            localStorage.setItem('username', user)
         }

      } else if (data.length > 8 || data.length < 3) {
         $('.have').text('格式不对哦~')
      }
   })

   // // 账号输入框得到焦点
   $('.use').focus(function () {
      let data = $('.use').val()
      if (data.length > 8 || data.length < 3) {
         $('.have').text('输入3~8位英文数字')
      }
   })
   // 密码失去焦点
   $('.pad').blur(function () {
      let data = $('.pad').val()
      if (data.length < 6 || data.length > 10) {
         $('.no').text('格式不对哦~')
      } else if (data.length >= 6 && data.length <= 10) {
         $('.no').text('这个密码可以哒~')
         let pad = $('.pad').val()
         localStorage.setItem('password', pad)
      }
   })

   // 密码获得焦点
   $('.pad').focus(function () {
      let data = $('.pad').val()
      if (data.length >= 6 && data.length <= 10) {
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
      } else if (data != data1) {
         $('.ps').text('不对哦~开小眼睛看看呗')
      }
   })
}
// img小眼睛
$('img').on('click', function () {
   if ($('.pad').attr('type') == 'password') {
      $('.pad').attr('type', 'text')
      $('.pad1').attr('type', 'text')
      $('img').attr('src', '../image/eye-fill.png')
   } else if ($('.pad').attr('type') == 'text') {
      $('.pad').attr('type', 'password')
      $('.pad1').attr('type', 'password')
      $('img').attr('src', '../image/eye slash-fill.png')
   }
})
// 点击注册
$('.regist').on('click', function () {
   // 没填写完的提示
   if ($('.use').val().length === 0 || $('.pad').length === 0 || $('.pad1').length === 0) {
      $('.err').stop().fadeIn()
      $('.box').addClass('filter')

   } else {
      // 填写完的提示
      $('.err1').stop().fadeIn()
      $('.box').addClass('filter')
      // 获取用户信息
      let user = localStorage.getItem('username')
      let pad = localStorage.getItem('password')
      ax(user, pad)
   }
   $('.back').on('click', function () {
      $('.err').stop().fadeOut(500)
      $('.box').removeClass('filter')
   })

})
// 点击注册成功的却仍按钮
$('.back1').on('click', function () {
   let good = document.querySelector('.good')
   let num = 4
   let time = setInterval(function () {
      good.innerHTML = `还有${num - 1}秒跳转到登录页面`
      num -= 1
      if (num === 0) {
         $('.err1').stop().fadeOut()
         window.open('http://127.0.0.1:5500/15.users-login/html/login.html')
         clearInterval(time)
      }
   }, 1000)
})
function ax (user, pad) {
   let url = `http://127.0.0.1:8080/regist`
   $.ajax({
      method: 'POST',
      url: url,
      data: {
         username: user,
         password: pad
      },
      success: function (res) {

      }
   })
}



