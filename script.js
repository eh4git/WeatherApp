//check to make sure document is loaded, it only loads once
$(document).ready(function () {

    //on click gather weather data and render it on a div
    $("#search-button").on('click', function () {

        //get user input data
        const searchVal = $('#search-value').val();

        //clear search input container
        $('#search-value').empty();

        //define apiKey
        const apiKey = `180c9f853ac8fcc595fe4080e0abf997`;

        //construct a query url (template literal)
        const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${apiKey}&units=imperial`;
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
            success: function(res) {
                console.log(res);
                //create elments and add desired res
                const currentWeatherresHTML =
                `
                <h3 class="card-title">${res.name} ${new Date().toLocaleDateString()}</h3>
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">${res.name} (${new Date().toLocaleDateString()})
                            <img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png">
                        </h3>
                        <p class="card-text">Temperature: ${res.main.temp} °F</p>
                        <p class="card-text">Humidity: ${res.main.humidity}%</p>
                        <p class="card-text">Wind Speed: ${res.wind.speed} MPH</p>
                    </div>
                </div>
                `;
                $("#today").html(currentWeatherresHTML);
            }
        })

    });


});

//template literals

// var referneces dom

// const - mutable and it takes into considetation of the lexical context

// let - mutable and it takes into considetation of the lexical context

//Api key 180c9f853ac8fcc595fe4080e0abf997


//  "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue "&appid=ketyhere&units=imperial",