$(document).ready(function () {

    var music = ["Rock and Roll", "Guitar", "Drums", "Piano", "Imagine Dragons"];

    function renderButtons() {
        $("#buttonHolder").empty();

        for (var i = 0; i < music.length; i++) {
            var a = $("<button>");
            a.addClass("music");
            a.attr("data-name", music[i]);
            a.text(music[i]);
            $("#buttonHolder").prepend(a);
        }

    }

    $("#add-music").on("click", function (event) {
        event.preventDefault();
        var song = $("#music-input").val().trim();
        music.push(song);
        renderButtons();

    });

    renderButtons();

    function displayMusicInfo() {
        var music = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + music + "&api_key=Bror7Y5B9RmQxVbkERlKBxsBJWK9f0sK&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.data);
            for (var i = 0; i < 10; i++) {

                var imgStill = response.data[i].images.fixed_height_still.url;
                var imgAnimate = response.data[i].images.fixed_height.url;
                var image = $("<img>").attr("src", imgStill);
                image.attr("data-state", "still");
                image.attr("still", imgStill);
                image.attr("animate", imgAnimate);
                $(".imageHolder").prepend(image);
                var responseRating = response.data[i].rating;
                var r = $("<p>").text("Rating: " + responseRating);
                $(".imageHolder").prepend(r);


            }

            // enter code here
            $("img").on("click", function () {
                console.log("clicked image");
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("animate"));
                    $(this).attr("data-state", "animate");
                    console.log(this);
                } else {
                    $(this).attr("src", $(this).attr("still"));
                    $(this).attr("data-state", "still");
                }
            });

        });
    }

    // Used twice and would populate two buttons after submitting form
    // $("#add-music").on("click", function(evemt) {
    //     event.preventDefault();
    //     var m = $("#music-input").val().trim();
    //     music.push(m);
    //     renderButtons ();
    // });
    $(document).on("click", ".music", displayMusicInfo)

    // Used twice and would populate two buttons after submitting form
    // renderButtons ();
    // two buttons show up after entering in form
});

