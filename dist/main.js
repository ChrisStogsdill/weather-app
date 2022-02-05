/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const currentLocationButton = document.getElementById('get-location');\nconst zipCodeInput = document.getElementById('zip-code-input');\nconst zipCodeSubmit = document.getElementById('zip-code-submit');\nconst cityInput = document.getElementById('city-input');\nconst citySearchSubmit = document.getElementById('city-search-submit');\nconst cityListContainer = document.getElementById('city-list-container');\n\nlet lat = '';\nlet lon = '';\nconst units = 'imperial';\nconst zipCode = 73130;\nlet zipCodeData = {};\nlet weatherData = {};\nlet cityList = [];\n\n// function to clear city list container\nfunction clearCityListContainer() {\n  const childrenCount = cityListContainer.children.length;\n  for (let i = 0; i < childrenCount; i += 1) {\n    cityListContainer.removeChild(cityListContainer.firstChild);\n  }\n}\n\n// function to fetch weather info from open weather api\nfunction getWeather(tempLat = lat, tempLon = lon, tempUnits = units) {\n  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${tempLat}&lon=${tempLon}&units=${tempUnits}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })\n    .then((response) => response.json())\n    .then((data) => {\n      weatherData = {\n        temp: data.main.temp,\n        humidity: data.main.humidity,\n        feelsLike: data.main.feels_like,\n      };\n      console.log(weatherData);\n    });\n}\n// function to get weather based on zip code\nfunction getZipCodes(tempZip = 73130) {\n  fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${tempZip}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })\n    .then((response) => response.json())\n    .then((data) => {\n      zipCodeData = data;\n      lat = data.lat;\n      lon = data.lon;\n      getWeather(lat, lon);\n    });\n}\n\n// function to get a list of cities\nfunction getCityList(tempCity) {\n  cityListContainer.classList.add('circle-loader')\n  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${tempCity}}&limit=15&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })\n    .then((response) => response.json())\n    .then((data) => {\n      // set cityList variable\n      cityList = data;\n\n      // clear any previous entries first\n      clearCityListContainer();\n\n      // response if no resluts found\n      if (cityList.length === 0) {\n        const response = cityListContainer.appendChild(document.createElement('div'));\n        response.classList.add('shadow', 'city-entry');\n        response.innerText = 'No Results';\n      }\n\n      // create entries for cities\n      for (let i = 0; i < cityList.length; i += 1) {\n        const cityEntry = cityListContainer.appendChild(document.createElement('div'));\n        cityEntry.classList.add('shadow', 'city-entry');\n        const cityName = cityEntry.appendChild(document.createElement('p'));\n        cityName.innerText = `Name: ${cityList[i].name}`;\n        const stateName = cityEntry.appendChild(document.createElement('p'));\n        stateName.innerText = `State: ${cityList[i].state}`;\n        const cityCountry = cityEntry.appendChild(document.createElement('p'));\n        cityCountry.innerText = `Country: ${cityList[i].country}`;\n\n        // name: 'Test Valley', lat: 51.13379045, lon: -1.5182864265840892, country: 'GB', state: 'England'\n      }\n    });\n}\n\n// function to set lat and lon from the geo location returned from setCurrentGeoPosition\nfunction setLocationFromCurrentPosition(position) {\n  lat = position.coords.latitude.toPrecision(4);\n  lon = position.coords.longitude.toPrecision(4);\n  // getWeather using the just set lat and lon\n  getWeather();\n}\n\n// event listener for current location button\ncurrentLocationButton.addEventListener('click', () => {\n  navigator.geolocation.getCurrentPosition(setLocationFromCurrentPosition);\n});\n\n// zip code event listener\nzipCodeSubmit.addEventListener('click', () => {\n  getZipCodes(zipCodeInput.value);\n});\n\n// state search event listener\ncitySearchSubmit.addEventListener('click', () => {\n  getCityList(cityInput.value);\n});\n\n// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}\n// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;