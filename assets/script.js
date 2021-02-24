var citiesList = [];
var cityEl = document.querySelector("#city");
var submitCityEl = document.querySelector("#submitCity");
var myApiKey = "&appid=190c95f54172c125e0f544a8140e5ed4";
var listedCityEl = document.querySelector("#listedCity");
var listedCityClass = document.getElementsByClassName("bg-primary");

// This function gets called after either a new city is entered and the search button with the magnifying class is clicked or if a button is
// clicked in the list of previous searched cities.  The functions returns the current weather conditions for the city. 
var getWeather = function(newCity) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + newCity + myApiKey + "&units=imperial")
        .then(function(response) {
            if (response.ok) {
                return response.json().then(function (response) {
                    document.getElementById("cityDisplayName").innerHTML = response.name;
                    var today = moment().format('L');
                    document.getElementById("todayDateDisplay").innerHTML = today;
                    var iconCodeUrl = response.weather[0].icon;
                    document.getElementById("iconWeather").src = "http://openweathermap.org/img/wn/" + iconCodeUrl + "@2x.png";
                    document.getElementById("currentTemp").innerHTML = response.main.temp + " ºF";
                    document.getElementById("currentHumidity").innerHTML = response.main.humidity + "%";
                    document.getElementById("currentWind").innerHTML = response.wind.speed + " mph";
                    var latitude = response.coord.lat;
                    var longitude = response.coord.lon;
                    fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + myApiKey)
                        .then(function(response) {
                            return response.json().then(function (response) {
                                var uvIndex = response.value;
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

// This function gets called after either a new city is entered and the search button with the magnifying class is clicked or if a button is
// clicked in the list of previous searched cities.  The functions returns the 5 day forecast for the city. 
var getForecast = function(newCity) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + myApiKey + "&units=imperial")
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
    var citySavedBtn = createCityBtn(newCity);
    listedCityEl.prepend(citySavedBtn);
}

var createCityBtn = function(cityName) {
     var newButton = document.createElement("button");
     newButton.textContent = cityName;
     newButton.type = "submit";
     newButton.classList.add("bg-light", "btn-large", "btn-block", "py-2");
     newButton.onclick = () => cityButtonClicked(cityName);
     return newButton;
}    
            
// This function gets the city the user entered and add that city to the front of the citiesList array.  It also call the getWeather function
// which will populate the current weather conditions, the getForecast function which will populate the 5 day forecast, and the newCityButton
// which will create a new button that will be stored in local storage and can be clicked on later to get the city's weather again.
var addCity = function(event) {
    event.preventDefault();
    var newCity = cityEl.value.trim();
    citiesList = JSON.parse(localStorage.getItem("weatherInfo")) || [];
    if (citiesList === null) {  
        citiesList.unshift(newCity);
    } else {
        for (var i = 0; i < citiesList.length; i++) {
            if (newCity.toLowerCase() === citiesList[i].toLowerCase()) {
                getWeather(newCity);
                getForecast(newCity);
                return;
            }
        }
        citiesList.unshift(newCity);
    }
    
    localStorage.setItem("weatherInfo", JSON.stringify(citiesList));
    getWeather(newCity);
    getForecast(newCity);
    newCityButton(newCity);
};

//  This function is call when one of the buttons is clicked in the list of buttons that show the cities the user has searched before.
var cityButtonClicked = function (cityName) {
    getWeather(cityName);
    getForecast(cityName);
}

// This function is called when the page loads and gets the array of stored cities and then calls the function to create a button for each 
// city in the array.
var storedCities = function () {
    citiesList = JSON.parse(localStorage.getItem("weatherInfo")) || [];
    for (var i = 0; i < citiesList.length; i++) {
        var citySavedBtn = createCityBtn(citiesList[i]);
        listedCityEl.append(citySavedBtn);
    }
}

// Called on page load
storedCities();

// Calls the addCity function when the search button is clicked by the user.
submitCityEl.addEventListener("submit", addCity);