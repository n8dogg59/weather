var citiesList = [];
var cityEl = document.querySelector("#city");
var submitCityEl = document.querySelector("#submitCity");
var myApiKey = "&appid=1a5f641d53d92a941175897deb11a82c";
var listedCityEl = document.querySelector("#listedCity");

var getWeather = function(newCity) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + newCity + myApiKey)
        .then(function(response) {
            if (response.ok) {
                return response.json().then(function (response) {
                    document.getElementById("cityDisplayName").innerHTML = response.name;
                    console.log(response.name);
                    var today = moment().format('L');
                    console.log(today);
                    document.getElementById("todayDateDisplay").innerHTML = today;
                    console.log(response.weather[0].icon);
                    var iconCodeUrl = response.weather[0].icon;
                    console.log(iconCodeUrl);
                    document.getElementById("iconWeather").src = "http://openweathermap.org/img/wn/" + iconCodeUrl + "@2x.png";
                    document.getElementById("currentTemp").innerHTML = response.main.temp;
                    document.getElementById("currentHumidity").innerHTML = response.main.humidity;
                    document.getElementById("currentWind").innerHTML = response.wind.speed;
                    var latitude = response.coord.lat;
                    var longitude = response.coord.lon;
                    console.log(latitude);
                    console.log(longitude);
                    indexUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + myApiKey;
                    console.log(indexUrl);
                    console.log(indexUrl.current);
                    var uvIndex = indexUrl.current.uvi;
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
            }
        })
}

var getForecast = function(newCity) {
    fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + newCity + "&cnt=6" + myApiKey)
        .then(function(response) {
            if (response.ok) {
                return response.json().then(function (response) {
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
    var citySavedBtn = createCityBtn(newCity);
    listedCityEl.prepend(citySavedBtn);

}
    
        
            
var addCity = function(event) {
    event.preventDefault();
    var newCity = cityEl.value.trim();
    var cityArrOrder = 0;
    citiesList = JSON.parse(localStorage.getItem("weatherInfo"));
    console.log(citiesList);
    if (citiesList === null) {
        citiesList = [];
        citiesList.unshift(newCity);
    } else  {
        for (var i = 0; i < citiesList.length; i++) {
            if (newCity.toLowerCase() == citiesList[i].toLowerCase()) {
                return cityArrOrder;
            }
        }
        citiesList.unshift(newCity);   
        console.log(citiesList);     
    }
    console.log(citiesList);
    localStorage.setItem("weatherInfo", JSON.stringify(citiesList));
    console.log(citiesList);
    getWeather(newCity);
    getForecast(newCity);
};


submitCityEl.addEventListener("submit", addCity);