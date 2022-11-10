let currentTime = new Date();
let replaceTime = document.querySelector(".date");
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesay",
  "Thursday",
  "Friday",
  "Saturday",
];
replaceTime.innerHTML = `${weekdays[currentTime.getDay()]} ${(
  "0" + currentTime.getHours()
).slice(-2)}:${("0" + currentTime.getMinutes()).slice(-2)}`;

//clickable cel and far
let celcius = document.querySelector(".celcius");
let farenheit = document.querySelector(".farenheit");

function showCelcius() {
  let tempNow = document.querySelector(".temperature-now");
  tempNow.innerHTML = 20;
}
function showFarenheit() {
  let tempNow = document.querySelector(".temperature-now");
  tempNow.innerHTML = (20 * 9) / 5 + 32;
}

celcius.addEventListener("click", showCelcius);
farenheit.addEventListener("click", showFarenheit);

//showing searched location as current city
function showLocation(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#searchedCity").value;

  let apiKey = "c18b6b68b5cc25859e397f4602261945";
  let units = "metric";
  let urlApiforCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${units}`;

  axios.get(urlApiforCity).then(showTemperature);
}
//the form and eventlistener
let locations = document.querySelector("#locations");
locations.addEventListener("submit", showLocation);

//current btn and navigator
let currentbtn = document.querySelector("#currentWeatherbtn");
currentbtn.addEventListener("click", (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
});
//location current  navigator
//
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c18b6b68b5cc25859e397f4602261945";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

//setting all new variables to current location//
//
function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let country = response.data.sys.country;
  let cityName = response.data.name;
  let humidity = Math.round(response.data.main.humidity);
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let wind = Math.round(response.data.wind.speed);
  let timezone = response.data.timezone;
  let description = response.data.weather[0].description;
  console.log(response);
  //setting sunrise
  let sunrise = (timezone + response.data.sys.sunrise - 3600) * 1000;
  sunrise = new Date(sunrise);
  let sunriseHours = ("0" + sunrise.getHours()).slice(-2);
  let sunriseMinutes = ("0" + sunrise.getMinutes()).slice(-2);
  //setting sunset
  let sunset = (timezone + response.data.sys.sunset - 3600) * 1000;
  sunset = new Date(sunset);
  let sunsetHours = ("0" + sunset.getHours()).slice(-2);
  let sunsetMinutes = ("0" + sunset.getMinutes()).slice(-2);
  //
  let descriptionNow = document.querySelector("#description-now");
  let temperatureNow = document.querySelector("#temperature-now");
  let cityNow = document.querySelector("#currentCity");
  let countryNow = document.querySelector("#currentCountry");
  let humidityNow = document.querySelector("#humidity");
  let maxTempNow = document.querySelector("#max-temp");
  let minTempNow = document.querySelector("#min-temp");
  let windNow = document.querySelector("#wind");
  let sunriseNow = document.querySelector("#sunrise");
  let sunsetNow = document.querySelector("#sunset");

  descriptionNow.innerHTML = description;
  countryNow.innerHTML = country;
  sunriseNow.innerHTML = sunriseHours + ":" + sunriseMinutes;
  sunsetNow.innerHTML = sunsetHours + ":" + sunsetMinutes;
  windNow.innerHTML = wind + "km/h";
  maxTempNow.innerHTML = maxTemp + "°";
  minTempNow.innerHTML = minTemp + "°";
  cityNow.innerHTML = cityName;
  humidityNow.innerHTML = humidity + "%";
  temperatureNow.innerHTML = temp;
}
//
//navigator
