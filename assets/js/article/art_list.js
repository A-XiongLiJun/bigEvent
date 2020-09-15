$(function() {
    var form = layui.form
    var laypage = layui.laypage
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章的状态
    }
    initTable()
    initCate()
        // 渲染文章数据table
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
                renderPage(res.total)
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
        // 渲染分页函数
    function renderPage(total) {
        laypage.render({
            elem: 'renderPage', //配置id
            count: total, //总条数
            limit: q.pagesize, //每页的条数
            curr: q.pagenum, //起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            jump: function(obj, first) {
                q.pagenum = obj.curr
                if (!first) {
                    q.pagesize = obj.limit
                    initTable()
                }
            }
        })
    }
    // 删除文章按钮事件
    $('body').on('click', '.btn-delete', function() {
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id')

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: `/my/article/delete/${id}`,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })

            layer.close(index);
        });
    })
})