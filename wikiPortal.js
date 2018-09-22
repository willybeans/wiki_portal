let counter;

$(document).ready(function() {
    hover();

    $(".random").click(function() {
        randomWiki();
    });

    $("form").submit(function(e) {
        e.preventDefault();
        let searchContent = $("#srch-term").val();
        searchContent = encodeURI(searchContent);
        userWiki(searchContent);
    });
});

function hover() {
    $(".random").mouseover(function() {
            $(".random").css('color', 'blue');
        })
        .mouseout(function() {
            $(".random").css('color', 'black');
        });
}

function randomWiki() {
    let randomWiki = "https://en.wikipedia.org/wiki/Special:Random";
    window.open(randomWiki);
}

function userWiki(search) {
    let wikiEndPoint = "https://en.wikipedia.org"
    let url = "/w/api.php?action=opensearch&format=json&origin=*&search=" + search;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: wikiEndPoint + url,
        success: function(data) {
            let html = "";
            let blank = "";
            counter = data[1].length;
            for (let i = 0; i < counter; i++) {
                html += "<div class = 'articleContainer article" + i + " shadow'>";

                for (let j = 1; j < data.length; j++) {
                    if (data[j] === data[1]) {
                        html += "<h3>" + data[j][i] + "</h3>"
                    } else if (data[j] === data[2]) {
                        html += "<p>" + data[j][i] + "</p>";
                        if (data[j][i] === blank) {
                            html += "<p>" + data[j][i] + "Click Here for more information" + "</p>";
                        }
                    } else if (data[j] === data[3]) {
                        html += "<a href=" + data[j][i] + ">" + "</a>";
                        html += "</div><br>";
                    }
                }
            }

            $(".data").html(html);
            userClick();
            $(".articleContainer").css('background', '#f6f6f6');
            $(".articleContainer").css('padding', '1em');

        },
        error: function(xhr, status, error) {
            console.log("status: " + status);
            console.log("error: " + error);
            console.log("xhr: " + xhr);
        },
        cache: false //this is important
    });
}

function userClick() {
    for (let i = 0; i < counter; i++) {
        $('.article' + i).click(function() {
            window.location = $(this).children("a:first").attr("href");
            return false;
        });
    }
}
