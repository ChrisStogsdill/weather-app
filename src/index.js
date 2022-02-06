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

// function to clear city list container
function clearCityListContainer() {
  const childrenCount = cityListContainer.children.length;
  for (let i = 0; i < childrenCount; i += 1) {
    cityListContainer.removeChild(cityListContainer.firstChild);
  }
}

// function to set weather
function setWeather(setTemp, setHighTemp, setLowTemp, setPrecipitation, setUnits) {
  const divTemp = document.getElementById('main-temp');
  const divDegreeIcon = document.getElementById('degree-icon-container');
  const divPrecipitation = document.getElementById('precipitation');
  const divHighTemp = document.getElementById('high-temp');
  const divLowTemp = document.getElementById('low-temp');
  const precipitationChance = setPrecipitation * 100;

  divTemp.innerHTML = `Temp: ${setTemp}<span>&#176;</span>`;
  divPrecipitation.innerText = `Rain Chance: ${precipitationChance}%`;
  divHighTemp.innerHTML = `High: ${setHighTemp}<span>&#176;</span>`;
  divLowTemp.innerHTML = `Low: ${setLowTemp}<span>&#176;</span>`;
}

// function to fetch weather info from open weather api
function getWeather(tempLat = lat, tempLon = lon, tempUnits = units) {
  fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${tempLat}&lon=${tempLon}&units=${tempUnits}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {
      weatherData = {
        temp: data.current.temp,
        feelsLike: data.current.feels_like,
        highTemp: data.daily[0].temp.max,
        lowTemp: data.daily[0].temp.min,
        humidity: data.current.humidity,
        precipitation: data.hourly[0].pop,
      };
      setWeather(
        weatherData.temp,
        weatherData.highTemp,
        weatherData.lowTemp,
        weatherData.precipitation,
      );
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
  // add circle loader class for loading animation
  cityListContainer.classList.add('circle-loader');

  // fetch the weather data
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${tempCity}}&limit=15&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {
      // set cityList variable
      const cityList = data;

      // clear any previous entries first
      clearCityListContainer();

      // response if no results found
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

        // setup event listener for each of the entries
        // uses capture instead of bubble to make sure child elements are not selected
        cityEntry.addEventListener('click', (clickEvent) => {
          const parent = clickEvent.currentTarget.parentElement;
          const childrenArray = Array.from(parent.children);
          const selectedIndex = childrenArray.indexOf(clickEvent.currentTarget);
          const selectedCity = cityList[selectedIndex];

          clearCityListContainer();

          getWeather(selectedCity.lat, selectedCity.lon);
        });
      }
    });
  // remove circle loader class so that it does not constantly show loading after a selection
  cityListContainer.classList.remove('circle-loader');
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
