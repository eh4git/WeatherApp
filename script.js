//check to make sure document is loaded, it only loads once
$(document).ready(function () {

    //on click gather weather data and render it on a div
    $("#search-button").on('click', function () {

        //get user input data
        const searchVal = $('#search-value').val();
        
        //define apiKey
        const apiKey = `180c9f853ac8fcc595fe4080e0abf997`;
        
        //construct a query url (template literal)
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${apiKey}&units=imperial`;
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
            success: function (res) {
                console.log(res);
                //create elments and add desired res
                const currentWeatherHTML =
                `
                <h3 class="card-title">${res.name} ${new Date().toLocaleDateString()}</h3>
                    <div class="card">
                    <div class="card-body">
                    <h3 class="card-title">${res.name} (${new Date().toLocaleDateString()})
                    <img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png">
                    </h3>
                    <p class="card-text">Temperature: ${res.main.temp} °F</p>
                    <p class="card-text">Humidity: ${res.main.humidity}%</p>
                    <p class="card-text">Wind Speed: ${res.wind.speed} MPH</p>
                    </div>
                    </div>
                    `;
                    const recentCityButton = $("<li><button>" + res.name + "</button></li>");
                    $(".history").prepend(recentCityButton).on("click", function () {
                        $("#today").html(currentWeatherHTML);
                    });
                    $("#today").html(currentWeatherHTML);
                    var latitude = res.coord.lat;
                    var longitude = res.coord.lon;
                    const queryUVIndex = `https://api.openweathermap.org/data/2.5/uvi/forecast?&appid=${apiKey}`
                    $.ajax({
                        url: queryUVIndex + "&lat=" + latitude + "&lon=" + longitude,
                        method: "GET",
                        dataType: "json",
                        success: function (res) {
                            $(`<p class="card-text">Wind Speed: ${latitude} MPH</p>`)
                            console.log(res)
                        }
                    });
                    //clear search input container
                    $('#search-value').empty();
            }
        });
        
    });
});

//template literals

// var referneces dom

// const - mutable and it takes into considetation of the lexical context

// let - mutable and it takes into considetation of the lexical context

//Api key 180c9f853ac8fcc595fe4080e0abf997


//  "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue "&appid=ketyhere&units=imperial",