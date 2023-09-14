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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="forecast card">
      <div class="row">
        <div class="col">
          <h3>${formatDay(forecastDay.time)}</h3>
          <p class="forecast-high" id="forecast-high-2">
            ${Math.round(
              forecastDay.temperature.maximum
            )}/<span class="forecast-low" id="forecast-low-2">${Math.round(
          forecastDay.temperature.minimum
        )}</span>
          </p>
        </div>
        <div class="col">
          <div class="icon">
            <img src=" ${
              forecastDay.condition.icon_url
            } " class="small-weather"/>
          </div>
        </div>
      </div>
    </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//function to display data in current forecast card
function displayCurrent(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current) + "℃";
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
  let largeIcon = document.querySelector("#large-weather-icon");
  largeIcon.setAttribute("src", response.data.condition.icon_url);

  celsiusTemperature = response.data.temperature.current;
}

function search(city) {
  let apiKey = "48eb25c4a02543a3ta93fefffob47a4f";
  let = "New York";
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrlCurrent).then(displayCurrent);
  axios.get(apiUrlForecast).then(displayForecast);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSearch);

search("New York City");
