//Date and timezone
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let dayOfWeek = now.getDay();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${weekDays[dayOfWeek]} ${currentHour}:${currentMinutes}`;
}

//Current temperature and weather condition
let celsiusTemperature = null;

function showTemperature(response) {
  celsiusTemperature = response.data.temperature.current;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let timestamp = response.data.time * 1000;
  let formattedDate = formatDate(timestamp);
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formattedDate;

  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)} km/h`;

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);

  getForecast(response.data.city);
}

//Search
function search(city) {
  let apiKey = "1ed039bb5aff4d1bc9cc5ao633ta3438";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios
    .get(apiUrl)
    .then(showTemperature)
    .catch(function (error) {
      console.error("Error:", error);
    });
}

// Submit
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = cityInput;
  search(cityInput);
}

//Celcius and Fahrenheit conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

//Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "1ed039bb5aff4d1bc9cc5ao633ta3438";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <div>
              <img class="forecast-icon" src="${day.condition.icon_url}"/>
            </div>
            <div class="forecast-temperatures">
              <div class="forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="forecast-temperature">
              ${Math.round(day.temperature.minimum)}°
              </div>
            </div>
          </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#next-days");
  forecastElement.innerHTML = forecastHtml;
}

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Initial search
search("Florianopolis");
