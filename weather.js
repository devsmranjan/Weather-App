$(document).ready(function () {
    var api = "https://fcc-weather-api.glitch.me/api/current?";
    var actualPosition;
    var latitude;
    var longitude;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            // $("#data").html("latitude: " + latitude + "<br>longitude: " + longitude);

            getWeather(latitude, longitude);


        });


    } else {
        $("#data").html("Geo location not available.");
    }


    // Weather 

    function getWeather(latitude, longitude) {
        actualPosition = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;


        $.getJSON(actualPosition, function (data) {
            $("#city").html(data.name + ", " + data.sys.country);
            $("#temp").html(data.main.temp + "˚ C")
            $("#temp").addClass("celcius");
            $("#desc").html(data.weather[0].main);
            $("#icon").html("<img src=\"" + data.weather[0].icon + "\">");

            converter(data.main.temp);

        });
    }


    var farenhit;

    function converter(temp) {
        $(".converter").click(function () {
            if ($("#temp").text() != "") {
                if ($("#temp").hasClass("celcius")) {
                    farenhit = ((temp * 9) / 5) + 32;
                    $("#temp").removeClass("celcius").addClass("farenhit");
                    $("#temp").html(farenhit + "˚ F");
                    $(".converter").html("Convert to ˚C");

                } else if ($("#temp").hasClass("farenhit")) {
                    $("#temp").removeClass("farenhit").addClass("celcius");
                    $("#temp").html(temp + "˚ C");
                    $(".converter").html("Convert to ˚F");

                }
            }
        });
    }



});