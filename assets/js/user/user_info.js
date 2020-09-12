$(function() {
    var form = layui.form
    form.verify({
        nc: function(value, itme) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })
    initUserInfo()

    // 获取的数据赋值到form表单里
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                window.parent.xinxi()
            }
        })
    })
})