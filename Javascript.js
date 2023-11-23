// State
let currCity = "Galati";
let units = "metric";

// Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weatherForecast = document.querySelector('.weather__forecast');
let weatherTemperature = document.querySelector(".weather__temperature");
let weatherIcon = document.querySelector(".weather__icon");
let weatherMinmax = document.querySelector(".weather__minmax");
let weatherRealfeel = document.querySelector('.weather__realfeel');
let weatherHumidity = document.querySelector('.weather__humidity');
let weatherWind = document.querySelector('.weather__wind');
let weatherPressure = document.querySelector('.weather__pressure');

// Search
document.querySelector(".weather__search").addEventListener('submit', e => {
    let searchInput = document.querySelector(".weather__searchform");
    e.preventDefault();
    currCity = searchInput.value.trim();
    getWeather();
    searchInput.value = "";
});

// Units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if (units !== "metric") {
        units = "metric";
        getWeather();
    }
});

document.querySelector(".weather_unit_fahrenheit").addEventListener('click', () => {
    if (units !== "imperial") {
        units = "imperial";
        getWeather();
    }
});

// Convert timestamp to local time string
function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600; // convert seconds to hours
    const date = new Date(timestamp * 1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Convert country code to name
function convertCountryCode(countryCode) {
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(countryCode);
}

// Fetch weather data
function getWeather() {
    const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
        .then(response => response.json())
        .then(data => {
            city.textContent = `${data.name}, ${convertCountryCode(data.sys.country)}`;
            datetime.textContent = convertTimeStamp(data.dt, data.timezone);
            weatherForecast.textContent = data.weather[0].main;
            weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&#176;`;
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather icon" />`;
            weatherMinmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176;</p><p>Max: ${data.main.temp_max.toFixed()}&#176;</p>`;
            weatherRealfeel.textContent = `${data.main.feels_like.toFixed()}&#176;`;
            weatherHumidity.textContent = `${data.main.humidity}%`;
            weatherWind.textContent = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`;
            weatherPressure.textContent = `${data.main.pressure} hPa`;
        });
}

// Initial fetch of weather data
window.addEventListener('load', getWeather);
