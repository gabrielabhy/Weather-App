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
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°`;

  let timestamp = response.data.dt * 1000;
  let timezone = response.data.timezone;
  let formattedDate = formatDate(timestamp, timezone);

  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formattedDate;

  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = response.data.weather[0].main;
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

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", handleSubmit);

// Initial search
search("São Paulo");
