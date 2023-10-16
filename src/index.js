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

const customIcons = {
  "clear sky": "clear-day.svg",
  "few clouds": "sun-clouds.svg",
  "scattered clouds": "cloud.svg",
  "broken clouds": "cloud.svg",
  "shower rain": "heavy-rain.svg",
  rain: "rain.svg",
  thunderstorm: "thunderstorm.svg",
  snow: "snow.svg",
  mist: "smog.svg",
};

let celsiusTemperature = null;

//Current temperature and weather condition
function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let timestamp = response.data.dt * 1000;
  let timezone = response.data.timezone;
  let formattedDate = formatDate(timestamp, timezone);
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formattedDate;

  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)} km/h`;

  let iconElement = document.querySelector("#main-icon");
  if (customIcons.hasOwnProperty(currentWeather)) {
    iconElement.setAttribute("src", `src/icons/${customIcons[currentWeather]}`);
    iconElement.setAttribute("alt", response.data.weather[0].main);
  } else {
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }
}

//Search
function search(city) {
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

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

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Initial search
search("São Paulo");
