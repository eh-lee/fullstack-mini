
$(document).ready(function () {
        show_webtoon();
    });

    function show_webtoon(){
        $.ajax({
            type: "GET",
            url: "/webtoon-list",
            data: {},
            success: function (response) {
                let webtoon_list = response['webtoon-list'];

                console.log(webtoon_list);

                for (item in webtoon_list) {
                    console.log(item);
                    var img = webtoon_list[item]['img'];
                    var url = webtoon_list[item]['url'];
                    var title = webtoon_list[item]['title'];
                    var genre = webtoon_list[item]['genre'];
                    var desc = webtoon_list[item]['desc'];

                    console.log(img, url, title, genre, desc);

                    var temp_html =
                        `<li onClick="open_box()">
                            <a href="${url}">
                                <div class="webtoon-box">
                                    <img src="${img}" alt="웹툰 이미지">
                                    <h6>${title}</h6>
                                    <span>${genre}</span>
                                    <p>${desc}</p>
                                </div>
                            </a>
                        </li>`;

                    $('#webtoons-list').append(temp_html);
                }
            }
        });
    }