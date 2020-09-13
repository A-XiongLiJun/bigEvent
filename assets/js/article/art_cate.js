$(function() {
    getCatelist()
        // 获取文章类别
    function getCatelist() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd = null
        // 添加事件
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 弹出层里面的添加事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                getCatelist()
                layer.close(indexAdd)
            }
        })
    })

})