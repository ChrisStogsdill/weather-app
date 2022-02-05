const currentLocationButton = document.getElementById('get-location');
const zipCodeInput = document.getElementById('zip-code-input');
const zipCodeSubmit = document.getElementById('zip-code-submit');
const cityInput = document.getElementById('city-input');
const citySearchSubmit = document.getElementById('city-search-submit');
const cityListContainer = document.getElementById('city-list-container');

let lat = '';
let lon = '';
const units = 'imperial';
const zipCode = 73130;
let zipCodeData = {};
let weatherData = {};
let cityList = [];

// function to clear city list container
function clearCityListContainer() {
  const childrenCount = cityListContainer.children.length;
  for (let i = 0; i < childrenCount; i += 1) {
    cityListContainer.removeChild(cityListContainer.firstChild);
  }
}

// function to fetch weather info from open weather api
function getWeather(tempLat = lat, tempLon = lon, tempUnits = units) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${tempLat}&lon=${tempLon}&units=${tempUnits}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {
      weatherData = {
        temp: data.main.temp,
        humidity: data.main.humidity,
        feelsLike: data.main.feels_like,
      };
      console.log(weatherData);
    });
}
// function to get weather based on zip code
function getZipCodes(tempZip = 73130) {
  fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${tempZip}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {
      zipCodeData = data;
      lat = data.lat;
      lon = data.lon;
      getWeather(lat, lon);
    });
}

// function to get a list of cities
function getCityList(tempCity) {
  cityListContainer.classList.add('circle-loader')
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${tempCity}}&limit=15&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {
      // set cityList variable
      cityList = data;

      // clear any previous entries first
      clearCityListContainer();

      // response if no resluts found
      if (cityList.length === 0) {
        const response = cityListContainer.appendChild(document.createElement('div'));
        response.classList.add('shadow', 'city-entry');
        response.innerText = 'No Results';
      }

      // create entries for cities
      for (let i = 0; i < cityList.length; i += 1) {
        const cityEntry = cityListContainer.appendChild(document.createElement('div'));
        cityEntry.classList.add('shadow', 'city-entry');
        const cityName = cityEntry.appendChild(document.createElement('p'));
        cityName.innerText = `Name: ${cityList[i].name}`;
        const stateName = cityEntry.appendChild(document.createElement('p'));
        stateName.innerText = `State: ${cityList[i].state}`;
        const cityCountry = cityEntry.appendChild(document.createElement('p'));
        cityCountry.innerText = `Country: ${cityList[i].country}`;

        // name: 'Test Valley', lat: 51.13379045, lon: -1.5182864265840892, country: 'GB', state: 'England'
      }
    });
}

// function to set lat and lon from the geo location returned from setCurrentGeoPosition
function setLocationFromCurrentPosition(position) {
  lat = position.coords.latitude.toPrecision(4);
  lon = position.coords.longitude.toPrecision(4);
  // getWeather using the just set lat and lon
  getWeather();
}

// event listener for current location button
currentLocationButton.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(setLocationFromCurrentPosition);
});

// zip code event listener
zipCodeSubmit.addEventListener('click', () => {
  getZipCodes(zipCodeInput.value);
});

// state search event listener
citySearchSubmit.addEventListener('click', () => {
  getCityList(cityInput.value);
});

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
