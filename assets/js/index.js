$(function() {
        xinxi()

        $('#logout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index)
            })
        })
    })
    // 获取用户信息
function xinxi() {
    $.ajax({
        // 默认git请求  并且不需要传参数
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            xuanran(res.data)
        },
        // complete: function(res) {
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 获取并渲染用户头像和昵称
function xuanran(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;' + name)
    if (user.user_pic !== null) {
        // 渲染头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}