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

eval("const currentLocationButton = document.getElementById('get-location');\nconst zipCodeInput = document.getElementById('zip-code-input');\nconst zipCodeSubmit = document.getElementById('zip-code-submit');\n\nlet lat = '';\nlet lon = '';\nconst units = 'imperial';\nconst zipCode = 73130;\nlet zipCodeData = {};\nlet weatherData = {};\n\n// function to build weather\nfunction buildWeather() {\n  const tempTemp = weatherData.main.temp;\n  const tempHumidity = weatherData.main.humidity;\n  const tempFeelsLike = weatherData.main.feels_like;\n  console.log(tempTemp, tempHumidity, tempFeelsLike);\n}\n\n// function to fetch weather info from open weather api\nfunction getWeather(tempLat = lat, tempLon = lon, tempUnits = units) {\n  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${tempLat}&lon=${tempLon}&units=${tempUnits}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })\n    .then((response) => response.json())\n    .then((data) => {\n      weatherData = data;\n      console.log(weatherData.main);\n      buildWeather();\n    });\n}\n\nfunction getZipCodes(tempZip = 73130) {\n  fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${tempZip}&appid=90b04ea300e9c1626525544025aafc02`, { mode: 'cors' })\n    .then((response) => response.json())\n    .then((data) => {\n      zipCodeData = data;\n      lat = data.lat;\n      lon = data.lon;\n      getWeather(lat, lon);\n    });\n}\n\n// function to set lat and lon from the geo location returned from setCurrentGeoPosition\nfunction setLocationFromCurrentPosition(position) {\n  lat = position.coords.latitude.toPrecision(4);\n  lon = position.coords.longitude.toPrecision(4);\n  // getWeather using the just set lat and lon\n  getWeather();\n}\n\ncurrentLocationButton.addEventListener('click', () => {\n  navigator.geolocation.getCurrentPosition(setLocationFromCurrentPosition);\n});\n\nzipCodeSubmit.addEventListener('click', () => {\n  getZipCodes(zipCodeInput.value);\n});\n\n// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}\n// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

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