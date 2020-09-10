$(function() {
    $('#showReg').on('click', function() {
        $('.dl').hide().siblings().show()
            // $('.zc').show()
    })
    $('#showLogin').on('click', function() {
        $('.zc').hide().siblings().show()
    })
})