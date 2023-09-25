let now = new Date();
let dayOfWeek = now.getDay();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let date = document.querySelector("#current-date");
date.innerHTML = `${weekDays[dayOfWeek]} ${currentHour}:${currentMinutes}`;

let cardToday = document.querySelector("#card-today");
cardToday.innerHTML = weekDays[dayOfWeek];

let cardTomorrow = document.querySelector("#card-tomorrow");
let tomorrow = (dayOfWeek + 1) % 7;
cardTomorrow.innerHTML = weekDays[tomorrow];

let cardThree = document.querySelector("#card-three");
let dayThree = (dayOfWeek + 2) % 7;
cardThree.innerHTML = weekDays[dayThree];

let cardFour = document.querySelector("#card-four");
let dayFour = (dayOfWeek + 3) % 7;
cardFour.innerHTML = weekDays[dayFour];

let cardFive = document.querySelector("#card-five");
let dayFive = (dayOfWeek + 4) % 7;
cardFive.innerHTML = weekDays[dayFive];

function userCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = cityInput;

  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

document.addEventListener("DOMContentLoaded", function () {
  let searchCity = document.querySelector("#city-search");
  searchCity.addEventListener("submit", userCity);
});

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°`;
}
