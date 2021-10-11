// day and time
let timeDate = document.querySelector("#timeDate");
let now = new Date();

let mins = now.getMinutes();
mins = mins > 9 ? mins : "0" + mins;
let time = now.getHours() + ":" + mins;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
timeDate.innerHTML = `${day} ${time}`;

//display weather search

function showTemperature(response) {
  console.log(response);

  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].description;
}

// search engine

function searchCity(city) {
  let apiKey = "25fad9f7e87157d33dde0f82ab269ee8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "25fad9f7e87157d33dde0f82ab269ee8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
