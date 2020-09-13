$(function() {
    var form = layui.form
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

    // 编辑按钮
    // 每打开一个弹层(layer.open)都会返回一个index
    //关闭的时候关闭对应的变量就行
    var editAdd = null
    $('body').on('click', '.btnEdit', function() {
        editAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        });
        var editID = $(this).attr('data-id')
        $.ajax({
            url: `/my/article/cates/${editID}`,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-Edit', res.data)
            }
        })
    })

    // 确认修改按钮事件
    $('body').on('submit', '#form-Edit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/updatecate',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                getCatelist()
                layer.close(editAdd)
            }
        })
    })

    // 删除按钮事件
    $('body').on('click', '.btnDelete', function() {
        var DeleteID = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: `/my/article/deletecate/${DeleteID}`,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    getCatelist()
                }
            })
            layer.close(index);
        });
    })



})