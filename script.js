// dependencies
var searchFormEl = document.querySelector("#search");
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#history");
var currentWeatherEl = document.querySelector("#current");
var forecastEl = document.querySelector("#5day");
var previousSearches = localStorage.getItem("WeatherSearches");
var searchList = previousSearches ? JSON.parse(previousSearches) : [];

function makeRequest() {
  var openWeatherAPIKey = "67500ba9ac78c4f9498327daec0bfbc6";
  var city = searchCity.value;
  console.log(city);
  var weatherQuery =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    openWeatherAPIKey;

  fetch(weatherQuery)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      windEl.textContent = "Wind Speed: " + data.wind.speed + "mph";
      tempEl.textContent =
        "Temperature: " +
        Math.floor(((data.main.temp - 273.15) * 9) / 5 + 32) +
        "F";
      humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    });
}
