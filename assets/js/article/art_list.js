$(function() {
    var form = layui.form
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章的状态
    }
    initTable()
    initCate()
        // 渲染文章标题
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 过滤时间函数
    template.defaults.imports.dataFormat = function(date) {
            var dt = new Date(date)
            var y = padZero(dt.getFullYear())
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }
        // 补零函数
    function padZero(n) {
        return n < 10 ? '0' + n : n
    }
    // 渲染所有分类
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    // layui的执行机制  需要手动调用它的方法重新渲染
                form.render()
            }
        })
    }
    // 点击筛选按钮  获取表单里面的值
    // 把值赋值给对象(q)里面对应的键
    // 发起ajax请求  渲染文章列表
    $('#formSearch').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable() //渲染文章标题
    })
})