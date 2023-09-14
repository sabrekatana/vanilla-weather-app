let apiUrlCord =
  "https://api.shecodes.io/weather/v1/current?lon={lon}&lat={lat}&key={key}";
let apiUrlForecast =
  "https://api.shecodes.io/weather/v1/forecast?query={query}&key={apiKey}";
let apiUrlCorecastCord =
  "https://api.shecodes.io/weather/v1/forecast?lon={lon}&lat={lat}&key={key}";

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let now = new Date();
  let daily = now.getDate();
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
  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "December",
  ];
  let month = months[now.getMonth()];
  let today = document.querySelector("#todays-date");
  today.innerHTML = `${day}, ${month} ${daily}`;
  return ` ${hours}:${minutes}`;
}

//write function to format temp with degree symbol

//function to display data in current forecast card
function displayCurrent(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  let conditions = document.querySelector("#conditions");
  conditions.innerHTML = response.data.condition.description;
  let feels = document.querySelector("#feels");
  feels.innerHTML = Math.round(response.data.temperature.feels_like);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let localTime = document.querySelector("#current-time");
  localTime.innerHTML = formatTime(response.data.time * 1000);

  celsiusTemperature = response.data.temperature.current;
}

function search(city) {
  let apiKey = "48eb25c4a02543a3ta93fefffob47a4f";
  let = "New York";
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}`;
  axios.get(apiUrlCurrent).then(displayCurrent);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

function convertTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  convertBack.classList.remove("active");
  converter.classList.add("active");
  let convertedTemp = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(convertedTemp);
}

function convertBackTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  convertBack.classList.add("active");
  converter.classList.remove("active");
  temp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let converter = document.querySelector("#Fahrenheit");
converter.addEventListener("click", convertTemp);

let convertBack = document.querySelector("#Celsius");
convertBack.addEventListener("click", convertBackTemp);

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSearch);

search("Paris");
