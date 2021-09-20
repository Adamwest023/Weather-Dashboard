var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector('#city-container');
var content = document.querySelector('#dailyForecast');
var date = moment().format("(MM/DD/YYYY)");
var date1 = moment().add(1, 'days').format("(MM/DD/YYYY)");
var date2 = moment().add(2, 'days').format("(MM/DD/YYYY)");
var date3 = moment().add(3, 'days').format("(MM/DD/YYYY)");
var date4 = moment().add(4, 'days').format("(MM/DD/YYYY)");
var date5 = moment().add(5, 'days').format("(MM/DD/YYYY)");
var weekForecast = document.getElementById('5-day-forecast');
var pastCitiesContainerEl = document.getElementById("city-container");


//function to fetch both of our weather apis 
function getUserCities(userInput) {
    //get the api
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial&appid=71c8690292d6042d2e5133616017daf0";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                alert('City not found');
            }
        }).then(function (data) {
            displayWeather(data);
            var cityLat = data.coord.lat;
            var cityLong = data.coord.lon;
            // fetch the second api

            var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLong + "&units=imperial&appid=71c8690292d6042d2e5133616017daf0";

            fetch(apiOneCall)
                .then(function (response) {
                    if (response) {
                        return response.json()
                    }
                }).then(function (oneCallData) {
                    uviDisplay(oneCallData)
                    displayWeekWeather(oneCallData);
                    updatePastCities();
                    console.log(oneCallData)
                })
        })

};

//call the uvi from the second api to be used in the displayWeather function
var uviDisplay = function (oneCallData) {
    var uvi = document.getElementById('uvi');
    var currentUvi = parseInt(oneCallData.current.uvi);
    uvi.textContent += currentUvi;
    if (currentUvi >= 11) {
        uvi.style.color = 'purple';
    } else if (currentUvi >= 8) {
        uvi.style.color = 'red';
    } else if (currentUvi >= 6) {
        uvi.style.color = 'orange';
    } else if (currentUvi >= 3) {
        uvi.style.color = '#F1C40F';
    } else
        uvi.style.color = 'green'
            ;
};

// display the current weather
var displayWeather = function (data) {
    var weather = " "
    var temp = parseInt(data.main.temp)
    var weatherImg = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

    weather +=
        `<div class=" text-start border border-dark">
        <div class="col">
            <h2 class="col-2" id='city-title'>${data.name + date}</h2> 
            <img class="col-2" src = ${weatherImg}> 
        </div>
        <p> <span>Temp:</span> ${temp} &degF </p>
        <p> Wind: ${data.wind.speed} MPH</p>
        <p> Humitidy: ${data.main.humidity} % </p>
        <p id="uvi">UV Index: </p>
    </div>`
    content.innerHTML = weather
};

//display the 5 day forecast 
var displayWeekWeather = function (oneCallData) {
    var weekWeather = ""
    //temperatures parsed
    var temp1 = parseInt(oneCallData.daily[1].temp.day);
    var temp2 = parseInt(oneCallData.daily[2].temp.day);
    var temp3 = parseInt(oneCallData.daily[3].temp.day);
    var temp4 = parseInt(oneCallData.daily[4].temp.day);
    var temp5 = parseInt(oneCallData.daily[5].temp.day);

    var weatherImg1 = "https://openweathermap.org/img/wn/" + oneCallData.daily[1].weather[0].icon + "@2x.png"
    var weatherImg2 = "https://openweathermap.org/img/wn/" + oneCallData.daily[2].weather[0].icon + "@2x.png"
    var weatherImg3 = "https://openweathermap.org/img/wn/" + oneCallData.daily[3].weather[0].icon + "@2x.png"
    var weatherImg4 = "https://openweathermap.org/img/wn/" + oneCallData.daily[4].weather[0].icon + "@2x.png"
    var weatherImg5 = "https://openweathermap.org/img/wn/" + oneCallData.daily[5].weather[0].icon + "@2x.png"

    // oneCallData.daily.forEach(function(day){
    weekWeather += ` 
        <div class="5-day-title class='row">
            <h3>5 Day forcast:</h3>
        </div>
        <div id="5-day-list"  class= "row row-col-5 justify-content-end">
            <div  id="day-card" class= "col">
            <h3>${date1}</h3>
            <img src=${weatherImg1}>
            <p>Temp: ${temp1} &degF </p>
            <p>Wind: ${oneCallData.daily[1].wind_speed} MPH </p>
            <p>Humidity: ${oneCallData.daily[1].humidity}%</p>
            </div>
            <div id="day-card"class= "col"">
            <h3>${date2}</h3>
            <img src=${weatherImg2}>
            <p>Temp: ${temp2} &degF </p>
            <p>Wind: ${oneCallData.daily[2].wind_speed} MPH </p>
            <p>Humidity: ${oneCallData.daily[2].humidity}%</p>
            </div>
            <div id="day-card" class= "col"">
            <h3>${date3}</h3>
            <img src=${weatherImg3}>
            <p>Temp: ${temp3} &degF </p>
            <p>Wind: ${oneCallData.daily[3].wind_speed} MPH </p>
            <p>Humidity: ${oneCallData.daily[3].humidity}%</p>
            </div>
            <div id="day-card" class= "col">
            <h3>${date4}</h3>
            <img src=${weatherImg4}>
            <p>Temp: ${temp4} &degF </p>
            <p>Wind: ${oneCallData.daily[4].wind_speed} MPH </p>
            <p>Humidity: ${oneCallData.daily[4].humidity}%</p>
            </div>
            <div id="day-card" class= "col">
            <h3>${date5}</h3>
            <img src=${weatherImg5}>
            <p>Temp: ${temp5} &degF </p>
            <p>Wind: ${oneCallData.daily[5].wind_speed} MPH </p>
            <p>Humidity: ${oneCallData.daily[5].humidity}%</p>
            </div>
        </div>
        </div>`
    // });

    weekForecast.innerHTML = weekWeather
};

// view past cities

var pastSearchedCities = JSON.parse(localStorage.getItem("city-list")) || [];

function pastCities() {
    // pastSearch = '';
    var pastSearch = JSON.parse(localStorage.getItem("city-list")) || [];
    var pastSearchEl = document.querySelector("#city-container");
    
    for (var i = 0; i < pastSearch.length; i++) {
        var pastSearchBtn = document.createElement("button")
        pastSearchBtn.classList.add("past-button");
        pastSearchBtn.setAttribute('id', pastSearch[i])
        pastSearchBtn.innerHTML = pastSearch[i];
        pastSearchEl.appendChild(pastSearchBtn);
        
    }
};


function updatePastCities() {
    var pastSearchEl =document.querySelector("#city-container");
    var pastSearch = document.getElementById("city").value;
    if (pastSearchedCities.indexOf(pastSearch) == -1) {
        pastSearchedCities.push(pastSearch);
        localStorage.setItem('city-list', JSON.stringify(pastSearchedCities));
    }
    pastSearchEl.innerHTML = "";
    pastCities();
};


//usability of the past buttons
$("#city-container").on('click', "button", function() {
    var pastSearch = $(this).attr("id");
    document.getElementById('city').value = pastSearch
    document.querySelector("#citySearch").click();
    
});



// function to trigger api pulls on click
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getUserCities(city);
        
        // pastCities(city);



    } else {
        alert("Please enter a city");
    }
};

pastCities();


document.getElementById("citySearch").addEventListener('click', formSubmitHandler);