// 로그인 상태인지 아닌지 확인 : localStorage.getItem("log")
// 로그인 중이면 "True", 로그아웃 상태면 "False" 반환
// 로그인 상태인 ID에 접근 : localStorage.getItem("liveUser")
// 아이디 값 반환.
// 로그인 유저의 이름 : localStorage.getItem("name")

let is_logon = localStorage.getItem("log")

// console.log(window.outerWidth)
$(document).ready(function () {
    console.log(is_logon)
    if (is_logon == "true") {
        console.log(localStorage.getItem("log"))
        document.getElementById('user').innerText = localStorage.getItem("name")
        console.log("유저네임")
        console.log(document.getElementById('user').innerText)
        document.getElementsByClassName('nav-input-box')[0].style.display = "none"

        document.getElementsByClassName('welcome')[0].style.display = "inline-block"
        document.getElementsByClassName('welcome')[1].style.display = "inline-block"
        $('.welcome').style = "display : inline-block;"

        $('.nav-btn').toggle('.ym-hide')
    } else if (is_logon == "false") {
    }
    document.getElementsByClassName('hd-div')[0].classList.add('move-img')
});
document.getElementById('btn-logo').addEventListener('click', function () {
    window.location.reload()
})

// scroll event
window.addEventListener('scroll', function () {
    if (window.scrollY >= 55) {
        // document.getElementsByClassName('nav-default').classList.add('nav-fix')
        $('.nav-default').addClass('nav-fix')
    } else if (window.scrollY < 55) {
        $('.nav-default').removeClass('nav-fix')
    }
    // console.log(this.scrollY)
});

// Log-in
document.getElementById('login').addEventListener('click', function () {
    var ID = document.getElementById("userID").value
    var PW = document.getElementById("userPW").value

    checkUser(ID, PW)
})
function checkUser(id, password) {
    if (id == "" || password == "") {
        alert("아이디/비밀번호를 입력하세요.")
    } else {
        $.ajax({
            type: "POST",
            url: "/user/login",
            data: {
                id_give: id,
                password_give: password
            },
            success: function (response) {
                if (response['is_success'] == "성공") {
                    alert(response['msg'])
                    localStorage.setItem("liveUser", id)
                    localStorage.setItem("log", true)
                    localStorage.setItem("name", response['userName'])
                    window.location.reload()
                } else if (response['is_success'] == "실패") {
                    alert("로그인 실패")
                }
            }
        })
    }
}

// Log-out
document.getElementById('logout').addEventListener('click', function () {
    localStorage.setItem("log", false)
    localStorage.setItem("liveUser", null)

    console.log(localStorage.getItem("liveUser"))
    window.location.reload()
})


// Join btn(modal open)
document.getElementById('join').addEventListener('click', function () {
    document.getElementsByClassName('ym-modal-join')[0].classList.remove('ym-hide')
})


// Join Close btn(modal close)
document.getElementById('close-join').addEventListener('click', function () {
    document.getElementsByClassName('ym-modal-join')[0].classList.add('ym-hide')
})

// Join Submit btn
document.getElementById('submit-join').addEventListener('click', function () {
    var submitID = document.getElementById('submit-id').value
    var submitPW = document.getElementById('submit-pw').value
    var submitName = document.getElementById('submit-name').value

    if (document.getElementById('male').checked) {
        var submitSex = "남자"
    } else if (document.getElementById('female').checked) {
        var submitSex = "여자"
    }

    $.ajax({
        type: "POST",
        url: "/user",
        data: {
            id_give: submitID,
            password_give: submitPW,
            name_give: submitName,
            sex_give: submitSex
        },
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
})