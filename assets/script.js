var citiesList = [];
var cityEl = document.querySelector("#city");
var submitCityEl = document.querySelector("#submitCity");
var myApiKey = "&appid=190c95f54172c125e0f544a8140e5ed4";
var listedCityEl = document.querySelector("#listedCity");
var btnClick = document.querySelector(".list-group-item-action");

var getWeather = function(newCity) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + newCity + myApiKey + "&units=imperial")
        .then(function(response) {
            if (response.ok) {
                return response.json().then(function (response) {
                    document.getElementById("cityDisplayName").innerHTML = response.name;
                    console.log(response);
                    console.log(response.name);
                    var today = moment().format('L');
                    console.log(today);
                    document.getElementById("todayDateDisplay").innerHTML = today;
                    console.log(response.weather[0].icon);
                    var iconCodeUrl = response.weather[0].icon;
                    console.log(iconCodeUrl);
                    document.getElementById("iconWeather").src = "http://openweathermap.org/img/wn/" + iconCodeUrl + "@2x.png";
                    document.getElementById("currentTemp").innerHTML = response.main.temp + " ºF";
                    document.getElementById("currentHumidity").innerHTML = response.main.humidity + "%";
                    document.getElementById("currentWind").innerHTML = response.wind.speed + " mph";
                    var latitude = response.coord.lat;
                    var longitude = response.coord.lon;
                    console.log(latitude);
                    console.log(longitude);
                    fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + myApiKey)
                        .then(function(response) {
                            return response.json().then(function (response) {
                                var uvIndex = response.value;
                                console.log(uvIndex);
                                document.getElementById("currentUv").innerHTML = uvIndex;
                                if (uvIndex <= 3) {
                                    var currentUvEl = document.getElementById("currentUv");
                                    currentUvEl.classList.add("bg-success");
                                } else if (uvIndex > 3 && uvIndex <= 7) {
                                    var currentUvEl = document.getElementById("currentUv");
                                    currentUvEl.classList.add("bg-warning");
                                } else {
                                    var currentUvEl = document.getElementById("currentUv");
                                    currentUvEl.classList.add("bg-danger");
                                }                
                            })
                        })
                                 
                })
            }
        })
}

var getForecast = function(newCity) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + newCity + myApiKey + "&units=imperial")
        .then(function(response) {
            if (response.ok) {
                return response.json().then(function (response) {
                    var forecast = response.list;
                    var day1Forecast = forecast[5];
                    var iconCodeUrl1 = forecast[5].weather[0].icon;
                    var day2Forecast = forecast[13];
                    var iconCodeUrl2 = forecast[13].weather[0].icon;
                    var day3Forecast = forecast[21];
                    var iconCodeUrl3 = forecast[21].weather[0].icon;
                    var day4Forecast = forecast[29];                    
                    var iconCodeUrl4 = forecast[29].weather[0].icon;
                    var day5Forecast = forecast[37];
                    var iconCodeUrl5 = forecast[37].weather[0].icon;
                    // day 1 forecast
                    var day1 = moment().add(1, 'days').format('L');
                    document.getElementById("day1").innerHTML = day1;
                    document.getElementById("day1Pic").src = "http://openweathermap.org/img/wn/" + iconCodeUrl1 + "@2x.png";
                    document.getElementById("day1Temp").innerHTML = day1Forecast.main.temp + " ºF";
                    document.getElementById("day1Humid").innerHTML = day1Forecast.main.humidity + "%";
                    // day 2 forecast
                    var day1 = moment().add(2, 'days').format('L');
                    document.getElementById("day2").innerHTML = day1;
                    document.getElementById("day2Pic").src = "http://openweathermap.org/img/wn/" + iconCodeUrl2 + "@2x.png";
                    document.getElementById("day2Temp").innerHTML = day2Forecast.main.temp + " ºF";
                    document.getElementById("day2Humid").innerHTML = day2Forecast.main.humidity + "%";
                    // day 3 forecast
                    var day1 = moment().add(3, 'days').format('L');
                    document.getElementById("day3").innerHTML = day1;
                    document.getElementById("day3Pic").src = "http://openweathermap.org/img/wn/" + iconCodeUrl3 + "@2x.png";
                    document.getElementById("day3Temp").innerHTML = day3Forecast.main.temp + " ºF";
                    document.getElementById("day3Humid").innerHTML = day3Forecast.main.humidity + "%";
                    //day 4 forecast
                    var day1 = moment().add(4, 'days').format('L');
                    document.getElementById("day4").innerHTML = day1;
                    document.getElementById("day4Pic").src = "http://openweathermap.org/img/wn/" + iconCodeUrl4 + "@2x.png";
                    document.getElementById("day4Temp").innerHTML = day4Forecast.main.temp + " ºF";
                    document.getElementById("day4Humid").innerHTML = day4Forecast.main.humidity + "%";
                    // day 5 forecast
                    var day1 = moment().add(5, 'days').format('L');
                    document.getElementById("day5").innerHTML = day1;
                    document.getElementById("day5Pic").src = "http://openweathermap.org/img/wn/" + iconCodeUrl5 + "@2x.png";
                    document.getElementById("day5Temp").innerHTML = day5Forecast.main.temp + " ºF";
                    document.getElementById("day5Humid").innerHTML = day5Forecast.main.humidity + "%";
                })
            } 
        })       
}

var newCityButton = function(newCity) {
    var currentCities = JSON.parse(localStorage.getItem("weatherInfo"));
    console.log(currentCities);
    var citySavedBtn = createCityBtn(newCity);
    listedCityEl.prepend(citySavedBtn);
}

var createCityBtn = function(cityName) {
     var newButton = document.createElement("button");
     newButton.textContent = cityName;
     newButton.addClass = "list-group-item-action";
     newButton.display = "inline";
     newButton.type = "submit";
     newButton.onclick = buttonClicked(cityName);
     console.log(newButton.innerText);
     return newButton;
}    
            
var addCity = function(event) {
    event.preventDefault();
    var newCity = cityEl.value.trim();
    citiesList = JSON.parse(localStorage.getItem("weatherInfo")) || [];
    console.log(citiesList);
    citiesList.unshift(newCity);
    console.log(citiesList);     
    
    console.log(citiesList);
    localStorage.setItem("weatherInfo", JSON.stringify(citiesList));
    console.log(citiesList);
    getWeather(newCity);
    getForecast(newCity);
   newCityButton(newCity);
};

var buttonClicked = function(newCity) {
    console.log(newCity);
    getWeather(newCity);
    getForecast(newCity);
}

var loadOldCities = function() {
    citiesList = JSON.parse(localStorage.getItem("weatherInfo"));
    if (citiesList == null) {
        citiesList = [];
    }
    for (var i = 0; i < citiesList.length; i++) {
        console.log(citiesList[i]);
        var newButton = createCityBtn(citiesList[i]);
        listedCityEl.append(newButton);
    }
}

submitCityEl.addEventListener("submit", addCity);
