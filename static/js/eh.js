// function scoring() {
//     let url = $('#url').val()
//     let score = $('#score').val()
//     let comment = $('#comment').val()

//     $.ajax({
//         type: 'POST',
//         url: '/',
//         data: { url_give: url, score_give: score, comment_give: comment },
//         success: function (response) {
//             alert(response['msg'])
//             window.location.reload()
//         }
//     });
// }

function open_box() {
    $('#post-box').show()
}
function close_box() {
    $('#post-box').hide()
}
