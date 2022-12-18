
// 小箭头
$('.select').hide()
$('.administrtor').hide()
$('.yh').on('click', function (e) {
   let target = e.target.className
   if (target === 'yh') {
      $('.select').stop().fadeIn(1500)
      $('.yh').addClass('yh move')
   } else if (target === 'yh move') {
      $('.select').stop().fadeOut(1500)
      $('.yh').removeClass('move')
      $('.yh').addClass('yh moves')
   } else if (target === 'yh moves') {
      $('.select').stop().fadeIn(1500)

      $('.yh').removeClass('moves')
      $('.yh').addClass('yh move')
   }
}
)
$('.gly').on('click', function (e) {
   let target = e.target.className
   if (target === 'gly') {
      $('.administrtor').stop().fadeIn(1500)
      $('.gly').addClass('gly move')
   } else if (target === 'gly move') {
      $('.administrtor').stop().fadeOut(1500)
      $('.gly').removeClass('move')
      $('.gly').addClass('gly moves')
   } else if (target === 'gly moves') {
      $('.administrtor').stop().fadeIn(1500)
      $('.gly').removeClass('moves')
      $('.gly').addClass('gly move')
   }
})
var res = (function () {
   var jsonData;
   $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:8080/login',
      dataType: 'json',
      async: false,
      success: function (res) {
         jsonData = res
      }
   })
   return jsonData
})()
let username = res.data.username
let password = res.data.password
selectall(username, password)
if (res.statusbar === 400) {
   if ($('.txt').blur()) {
      $('.slt').on('click', function () {
         $('.each').hide()
         let txt = $('.txt').val()
         let num = username.indexOf(txt)
         if (username.indexOf(txt) >= 0 && txt != $('.u').text()) {
            let num1 = username.indexOf(txt)
            let li = $(`<li>
                  <span class="u">${txt}</span>
                  <span class="p">${password[num]}</span>
                  <span><a href="javascript:;">删除</a></span>
               </li>`)
            $('.zh').append(li)
            // 点击删除当前的账号
            $('a').on('click', function () {
               $(this).parents()[1].remove()
               let u = $(this).parents()[0].previousElementSibling.previousElementSibling
               let na = u.innerHTML
               let url = 'http://127.0.0.1:8080/delete'
               $.ajax({
                  method: 'POST',
                  url: url,
                  data: {
                     username: na
                  },
                  success: function (res) {
                     if (res.statusbar === 200) {
                        $('.ok').stop().fadeIn(800)
                        setTimeout(function () {
                           $('.ok').stop().fadeOut(800)
                        }, 800)
                     }
                  }
               })
            })
         }
         $('.slt').attr('disabled', 'disabled')
      })
   }
   $('.txt').focus(function () {
      $('.slt').removeAttr('disabled')
   })
   // 点击删除当前的账号
   $('a').on('click', function () {
      $(this).parents()[1].remove()
      let u = $(this).parents()[0].previousElementSibling.previousElementSibling
      let na = u.innerHTML
      let url = 'http://127.0.0.1:8080/delete'
      $.ajax({
         method: 'POST',
         url: url,
         data: {
            username: na
         },
         success: function (res) {
            console.log(res.statusbar);
            if (res.statusbar === 200) {
               $('.ok').stop().fadeIn(800)
               setTimeout(function () {
                  $('.ok').stop().fadeOut(800)
               }, 800)
            }
         }
      })
   })
}
$('.selectall').on('click', function () {
   $('.each').show()
})
function selectall (username, password) {
   for (var i = 0; i < username.length; i++) {
      let li = $(`               <li>
                  <span class="u">${username[i]}</span>
                  <span class="p">${password[i]}</span>
                  <span><a href="javascript:;">删除</a></span>
               </li>`)
      $('.ul').append(li)
   }


}


//管理员
// 点击添加的时候跳出来的动画
$('.insert').on('click', function () {
   let us = $('.user').val()
   let pad = $('.pad').val()
   let add = (function () {
      let dataJson
      $.ajax({
         method: 'POST',
         url: 'http://127.0.0.1:8080/regist',
         async: false,
         data: {
            username: us,
            password: pad
         },
         success: function (res) {
            dataJson = res
         }
      })
      return dataJson
   })()
   console.log(add);
   if (add.statusbar === 200) {
      $('.add').stop().fadeIn(800)
      setTimeout(function () {
         $('.add').stop().fadeOut(800)
      }, 800)
   }
})

// 管理员信息
let administrtor = (function () {
   let admin
   $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:8080/login',
      async: false,
      success: function (res) {
         admin = res
      }
   })
   return admin
})()
if (administrtor.statusbar === 400) {
   let num = administrtor.data.username
   let pads = administrtor.data.password
   for (var i = 0; i < num.length; i++) {
      if (num.indexOf('xxl') >= 0) {
         $('.names span').eq(0).text('许新亮')
         $('.names span').eq(1).text(pads[num.indexOf('xxl')])
         $('.names span').eq(2).text('在线')
      }
   }
}