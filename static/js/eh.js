function commenting() {
    var star = $('#star').val()
    var comment = $('#comment').val()

    $.ajax({
        type: 'POST',
        url: '/test',
        data: { star_give: star, comment_give: comment },
        success: function (response) {
            alert(response['msg'])
            show_commenting();
                }
    });
}


function show_commenting() {
    $.ajax({
        type: "GET",
        url: "/test/comment",
        data: {},
        success: function (response) {
            var rows = response['comments']
            for (var i = 0; i < rows.length; i++) {
                var star = rows[i]['star']
                console.log(response)
                var comment = rows[i]['comment']

                var star_image = '⭐'.repeat(parseInt(star))
                var temp_html = `<div class="card">
                                    <div class="card-body">
                                        <blockquote class="blockquote mb-0">
                                            <p>${comment}</p>
                                            <footer class="blockquote-footer">${star_image}</footer>
                                        </blockquote>
                                    </div>
                                </div>`
                $('.eh-cards').empty()                
                $('.eh-cards').append(temp_html)
            }
        },
        complete : function(response){
            console.log(response)
        }
    })
}

function eh_open_box() {
    $('#post-box2').show()
}
function close_box() {
    $('#post-box2').hide()
}