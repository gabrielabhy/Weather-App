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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let currentWeather = document.querySelector("#current-weather");

  currentTemp.innerHTML = `${temperature}°`;
  currentWeather.innerHTML = response.data.weather[0].main;
}

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

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = cityInput;
  search(cityInput);
}

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", handleSubmit);

// Initial search for a default city
search("São Paulo");
