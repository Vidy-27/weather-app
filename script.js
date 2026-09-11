const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");

const errorMessage = document.getElementById("error-message");
const weatherResult = document.getElementById("weather-result");

const locationElement = document.getElementById("location");
const weatherIcon = document.getElementById("weather-icon");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("weather-description");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");
const weatherMessage = document.getElementById("weather-message");

// Paste your actual OpenWeather API key inside the quotation marks.
const API_KEY = "PASTE_YOUR_ACTUAL_API_KEY_HERE";

searchButton.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchWeather();
  }
});

async function searchWeather() {
  const city = cityInput.value.trim();

  errorMessage.textContent = "";
  weatherResult.classList.add("hidden");

  if (city === "") {
    errorMessage.textContent = "Please enter a city name 🌸";
    return;
  }

  if (API_KEY === "6e9dc80ad63a2b96fd2d889962ead928") {
    errorMessage.textContent = "Please add your OpenWeather API key first.";
    return;
  }

  searchButton.disabled = true;
  searchButton.textContent = "Searching...";

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 401) {
      throw new Error("Your API key is invalid or not active yet.");
    }

    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling.");
    }

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }

    displayWeather(data);

  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = "Search 🔍";
  }
}

function displayWeather(data) {
  const cityName = data.name;
  const countryName = data.sys.country;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const weatherType = data.weather[0].main;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  locationElement.textContent = `${cityName}, ${countryName}`;
  temperatureElement.textContent = `${temperature}°C`;
  descriptionElement.textContent = description;
  humidityElement.textContent = `${humidity}%`;
  windSpeedElement.textContent = `${windSpeed} m/s`;

  weatherIcon.textContent = getWeatherIcon(weatherType);
  weatherMessage.textContent = getWeatherMessage(weatherType);

  weatherResult.classList.remove("hidden");
}

function getWeatherIcon(weatherType) {
  if (weatherType === "Clear") {
    return "☀️";
  }

  if (weatherType === "Clouds") {
    return "☁️";
  }

  if (weatherType === "Rain") {
    return "🌧️";
  }

  if (weatherType === "Drizzle") {
    return "🌦️";
  }

  if (weatherType === "Thunderstorm") {
    return "⛈️";
  }

  if (weatherType === "Snow") {
    return "❄️";
  }

  if (
    weatherType === "Mist" ||
    weatherType === "Fog" ||
    weatherType === "Haze"
  ) {
    return "🌫️";
  }

  return "🌤️";
}

function getWeatherMessage(weatherType) {
  if (weatherType === "Clear") {
    return "A lovely day to get outside and enjoy some sunshine! ✨";
  }

  if (weatherType === "Clouds") {
    return "A calm, cloudy day. Perfect for a cozy playlist! ☁️";
  }

  if (weatherType === "Rain" || weatherType === "Drizzle") {
    return "Don't forget your umbrella and enjoy the rainy vibes! ☔";
  }

  if (weatherType === "Thunderstorm") {
    return "Stay safe indoors while the storm passes! ⛈️";
  }

  if (weatherType === "Snow") {
    return "A chilly day! Stay warm and cozy! ❄️";
  }

  return "Have a wonderful day, whatever the weather brings! 🌸";
}
