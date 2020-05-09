//check to make sure document is loaded, it only loads once
$(document).ready(function () {
    //get search history from localstorage
    const history = JSON.parse(localStorage.getItem('search-history')) || [];
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${caseFix}&appid=${apiKey}&units=imperial`;
    const fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    const queryUVIndex = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`
    const apiKey = `180c9f853ac8fcc595fe4080e0abf997`;
    renderBtns();
    function renderBtns() {
        $(".history").empty();
        history.forEach(function (x) {
            const recentCityButton = $("<li><button>" + x + "</button></li>");
            $(".history").prepend(recentCityButton);
        })
    }
    //on click gather weather data and render it on a div
    $("#search-button").on('click', function () {
        const searchVal = $('#search-value').val();
        searchClickHandler(searchVal);
    })

    $('.history').on('click', 'button', function () {
        searchClickHandler($(event.target).text());
    })

    const searchClickHandler = function (inputVal) {

        //filter user input string format
        let caseFix = inputVal.split(' ').map(a => {
            let newWord = a[0].toUpperCase() + a.substring(1, a.length).toLowerCase();
            return newWord;
        }).join(' ');

        
        //First Ajax to get Current Weather
        const currentWeatherAjax = $.ajax({
            url: currentWeatherURL,
            method: "GET",
            dataType: "json",
            success: function (res) {
                console.log("success! AJax1:");
                console.log(res);
                //create elments and add desired res
                const currentWeatherHTML =
                    `
                        <h3 class="card-title">${res.name} ${new Date().toLocaleDateString()}</h3>
                        <div class="card">
                            <div class="card-body" id="currentWeather">
                                <h3 class="card-title">${res.name} (${new Date().toLocaleDateString()})
                                    <img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png"/>
                                </h3>
                                <p class="card-text">Temperature: ${res.main.temp} °F</p>
                                <p class="card-text">Humidity: ${res.main.humidity}%</p>
                                <p id="endajax1" class="card-text">Wind Speed: ${res.wind.speed} MPH</p>
                            </div>
                        </div>
                    `;
                //Create Button With city name and prepend to history
                history.includes(caseFix) ? '' : history.push(caseFix); // ternay
                //render buttons looping through them
                renderBtns();
                //store local 
                localStorage.setItem('search-history', JSON.stringify(history));
                //add to the UI page
                $("#today").html(currentWeatherHTML);
                //Latitude and Longitude from first ajax
                var latitude = res.coord.lat;
                var longitude = res.coord.lon;
                return (latitude, longitude);
                //clear search input container
                $('#search-value').val('');
                uvAjax();
            },
            error: function () {
                //clear search input container
                $('#search-value').val('');
                return;
            }
        });
    }

    //Second Ajax to get UV Index
    const uvAjax = function () {
    $.ajax({
        url: queryUVIndex,
        method: "GET",
        dataType: "json",
        success: function (uv) {
            const uvIndex = uv.value;
            console.log("success! AJax2:");
            console.log(uv);
            $("#currentWeather").append(`<p class="card-text">UV Index: + ${uvIndex}</p>`);
            return (uvIndex);
        }
    });
}
//Third Ajax to get 5 day forecast
const forcastAjax = function () {

    $.ajax({
        url: fiveDayForecastUrl,
        method: "GET",
        dataType: "json",
        success: function (forecast) {
            console.log(forecast);
            $('#forecast').empty();
            for (i = 7; i < forecast.list.length; i = i + 7) {
                const fiveDayForecastHtml =
                    `
                    <div class="forecastCards card-body col-2 shadow bg-primary text-white">
                    <h3 class="card-title">${forecast.city.name}
                    <img src="https://openweathermap.org/img/w/${forecast.list[i].weather[0].icon}.png"/>
                    </h3>
                    <p class="card-text">Temperature: ${forecast.list[i].main.temp} °F</p>
                    <p class="card-text">Humidity: ${forecast.list[i].main.humidity}%</p>
                    <p class="card-text">Wind Speed: ${forecast.list[i].wind.speed} MPH</p>
                    <p class="card-text">UV Index: + ${uvIndex}</p>
                    </div>
                    `
                $("#forecast").prepend(fiveDayForecastHtml)
                return (forecast);
            }
        }
    });
}

    //document.ready end  
});

    // var referneces dom

    // const - mutable and it takes into considetation of the lexical context

    // let - mutable and it takes into considetation of the lexical context

    //Api key 180c9f853ac8fcc595fe4080e0abf997

    //Make UV Index Color Coded

    //  "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue "&appid=ketyhere&units=imperial",