
// Log-in
document.getElementById('login').addEventListener('click', function () {
    var ID = document.getElementById("userID").value
    var PW = document.getElementById("userPW").value
    console.log(ID,PW)
    $('.nav-btn').toggle('ym-hide')
    $('.nav-input-box').toggle('ym-hide')

    document.getElementById('user').innerText = ID
    document.getElementsByClassName('welcome')[0].style.display="inline-block"
    document.getElementsByClassName('welcome')[1].style.display="inline-block"
    // document.getElementsByClassName('nav-btn')[0].classList.toggle('ym-hide')
    // document.getElementsByClassName('nav-btn')[1].classList.toggle('ym-hide')
    // document.getElementsByClassName('nav-btn')[2].classList.toggle('ym-hide')
    // document.getElementsByClassName('nav-input-box')
    // $.ajax({
    //     type: "POST",
    //     url: "/user",
    //     data: {
    //         id_give: ID,
    //         pw_give: PW
    //     },
    //     success: function (response) {
            // alert(response['msg'])
            // document.getElementsByClassName('nav-btn')[0].classList.toggle('ym-hide')
            // document.getElementsByClassName('nav-btn')[1].classList.toggle('ym-hide')
            // document.getElementsByClassName('nav-btn')[2].classList.toggle('ym-hide')
    //     }
    // })

})

// Log-out
document.getElementById('logout').addEventListener('click',function(){
    $('.nav-btn').toggle('ym-hide')
    $('.nav-input-box').toggle('ym-hide')

    document.getElementsByClassName('welcome')[0].style.display="none"
    document.getElementsByClassName('welcome')[1].style.display="none"
})


// Join us
document.getElementById('join').addEventListener('click', function () {
    
})