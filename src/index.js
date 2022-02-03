const currentLocationButton = document.getElementById('get-location');
const zipCodeInput = document.getElementById('zip-code-input');
const zipCodeSubmit = document.getElementById('zip-code-submit');

let lat = '';
let lon = '';
const units = 'imperial';

// function to fetch weather info from open weather api
function getWeather(tempLat = lat, tempLon = lon, tempUnits = units) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${tempLat}&lon=${tempLon}&units=${tempUnits}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => console.table(data));
}

function getZipCodes(tempZip = 73130) {
  fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${tempZip}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => console.table(data));
}

// function to set lat and lon from the geo location returned from setCurrentGeoPosition
function setLocationFromCurrentPosition(position) {
  lat = position.coords.latitude.toPrecision(4);
  lon = position.coords.longitude.toPrecision(4);
  // getWeather using the just set lat and lon
  getWeather();
}

currentLocationButton.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(setLocationFromCurrentPosition);
});

zipCodeSubmit.addEventListener('click', () => {
  getZipCodes();
});

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
