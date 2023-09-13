let apiKey = "48eb25c4a02543a3ta93fefffob47a4f";
let apiUrlCurrent =
  "https://api.shecodes.io/weather/v1/current?query={query}&key={apiKey}";
let apiUrlCord =
  "https://api.shecodes.io/weather/v1/current?lon={lon}&lat={lat}&key={key}";
let apiUrlForecast =
  "https://api.shecodes.io/weather/v1/forecast?query={query}&key={apiKey}";
let apiUrlCorecastCord =
  "https://api.shecodes.io/weather/v1/forecast?lon={lon}&lat={lat}&key={key}";

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
  localTime.innerHTML = response.data.time;
}

axios
  .get("https://api.shecodes.io/weather/v1/current?query={query}&key={apiKey}")
  .then(displayCurrent);
