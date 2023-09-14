let apiUrlCord =
  "https://api.shecodes.io/weather/v1/current?lon={lon}&lat={lat}&key={key}";
let apiUrlForecast =
  "https://api.shecodes.io/weather/v1/forecast?query={query}&key={apiKey}";
let apiUrlCorecastCord =
  "https://api.shecodes.io/weather/v1/forecast?lon={lon}&lat={lat}&key={key}";

//video has function to convert date time lesson 6
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return ` ${hours}:${minutes}`;
}

//function to display data in current forecast card
function displayCurrent(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  let conditions = document.querySelector("#conditions");
  conditions.innerHTML = response.data.condition.description;
  let feels = document.querySelector("#feels");
  feels.innerHTML = response.data.temperature.feels_like;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let localTime = document.querySelector("#current-time");
  localTime.innerHTML = formatDate(response.data.time * 1000);
}

function search(city) {
  let apiKey = "48eb25c4a02543a3ta93fefffob47a4f";
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}`;
  axios.get(apiUrlCurrent).then(displayCurrent);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSearch);
