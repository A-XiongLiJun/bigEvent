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
        // 注册验证
    $('.zc').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('.zc [name=username]').val(),
            password: $('.zc [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
            console.log(res);
            if (res.status !== 0) {
                return console.log('注册失败');
            }
            layer.msg('注册成功，请登录！')
            $('#showLogin').click()
        })
    })
})