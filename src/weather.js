const COORDS = "coords";
const WEATHER_KEY = "5bc237fd1f9840c10e6355ebdc9aef89";

function createWeather(weather) {
  const textTemp = document.querySelector(".header__weather--temperature");
  const textLoaction = document.querySelector(".header__weather--location");
  const weatherIcon = document.querySelector(".header__weather--ico");
  const weatherContainer = document.querySelector(
    ".header__weather--container"
  );
  const temp = weather.main.temp;
  const name = weather.name;

  textTemp.innerText = `${temp}°`;
  textLoaction.innerText = name;
}

function getWeather(coords) {
  const lat = coords.latitude;
  const lon = coords.longitude;
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((json) => createWeather(json))
    .catch((error) => console.log("error", error));
  console.log("ok");
}

function saveCoords(coordsobj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsobj));
}

function succCoordsHandle(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(coordsObj);
  saveCoords(coordsObj);
}

function errLoacitonHandle() {
  console.log("cant access geo location");
}

function loadCoords() {
  navigator.geolocation.getCurrentPosition(succCoordsHandle, errLoacitonHandle);
}

function init() {
  const coords = localStorage.getItem(COORDS);
  if (coords === null) {
    loadCoords();
  } else {
    const coordsParse = JSON.parse(coords);
    getWeather(coordsParse);
    setInterval(() => getWeather(coordsParse), 60000);
  }
}

init();