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
                    document.getElementById("currentTemp").innerHTML = response.main.temp + " degrees";
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
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + newCity + myApiKey)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                console.log(response.list[0].dt);
                return response.json().then(function (response) {
                    console.log(response);
                    for (var i = 1; i < 6; i++) {
                        var today = moment().add(i, 'days').format('L');
                            console.log(today);
                            document.getElementById("#day" + i).innerHTML(today);
                            var iconCodeUrl = response.daily[i].weather[0].icon;
                            document.getElementById("day" + i + "Pic").src = "http://openweathermap.org/img/wn/" + iconCodeUrl + "@2x.png";
                            document.getElementById("day" + i + "Temp").innerHTML = response.daily[i].temp.day;
                            document.getElementById("day" + i + "Humid").innerHTML = response.daily[i].humidity;
                    }
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
    // for (var i = 0; i < citiesList.length; i++) {
    //     if (newCity.toLowerCase() == citiesList[i].toLowerCase()) {
    //         return;
    //     }
    // }
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
