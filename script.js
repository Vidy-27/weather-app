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

// Paste your OpenWeather API key between the quotation marks.
const API_KEY = "6e9dc80ad63a2b96fd2d889962ead928";

searchButton.addEventListener("click", function() {
  const city = cityInput.value.trim();

  if (city === "") {
    showError("Please enter a city name 🌸");
    return;
  }

  getWeather(city);
});

cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

async function getWeather(city) {
  errorMessage.textContent = "";
  weatherResult.classList.add("hidden");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    showError("We couldn't find that city. Please check the spelling ☁️");
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

  if (weatherType === "Mist" || weatherType === "Fog" || weatherType === "Haze") {
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

  return "Have a wonderful day, whatever the weather brings!";
}

function showError(message) {
  errorMessage.textContent = message;
}
