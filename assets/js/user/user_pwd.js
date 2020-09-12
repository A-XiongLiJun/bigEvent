$(function() {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function(value) {
            var newPwd = $('.layui-form [name=oldPwd]').val()
            if (newPwd === value) {
                return '新旧密码不能一致'
            }
        },
        rePwd: function(value) {
            var rePwd = $('.layui-form [name=newPwd]').val()
            if (rePwd !== value) {
                return '两次密码不一致'
            }
        }

    })

    // 修改密码跳转事件
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                top.window.location.href = '/login.html'
            }
        })
    })
})