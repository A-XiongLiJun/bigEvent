$(function() {
    $('#showReg').on('click', function() {
        $('.dl').hide().siblings().show()
            // $('.zc').show()
    })
    $('#showLogin').on('click', function() {
        $('.zc').hide().siblings().show()
    })
    var form = layui.form
    form.verify({
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function(value) {
            var pwd = $('.zc [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致！'
            }
        }
    })
})