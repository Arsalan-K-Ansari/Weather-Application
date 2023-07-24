// dependencies
var searchForm = document.querySelector("#search");
var searchInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-bttn");
var searchHistory = document.querySelector("#history");
var currentWeather = document.querySelector("#current");
var forecast = document.querySelector("#5day");
var cityNameEl = document.querySelector("#city-name");
var tempEl = document.querySelector("#temperature");
var windEl = document.querySelector("#wind speed");
var humidityEl = document.querySelector("#humidity");
var cityWeather;

function makeRequest() {
  var openWeatherAPIKey = "4f9c37dbda4edac1d11258b52be2b443";
  var city = searchInput.value;
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
function displayStuff() {
  var lastCity = JSON.parse(localStorage.getItem("localWeather"));
  var lastSearchBttn = document.createElement("button");
  lastSearchBttn.textContent = lastCity.name;
  lastSearchBttn.classList.add("btn");
  searchHistory.append(lastSearchBttn);
  lastSearchBttn.addEventListener("click", function () {
    currentWeather.textContent = savedCity.name;
    var openWeatherAPIKey = "4f9c37dbda4edac1d11258b52be2b443";
    var city = savedCity.name;
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
  });
}
searchBtn.on("click", function (event) {
  event.preventDefault;
  if (searchInput.value !== " ") {
    makeRequest();
    cityWeather = {
      name: searchInput.value,
    };
    cityNameEl.textContent = searchInput.value;
    localStorage.setItem("localWeather", JSON.stringify(cityWeather));
    searchInput.value = " ";

    displayStuff();
  }
});
