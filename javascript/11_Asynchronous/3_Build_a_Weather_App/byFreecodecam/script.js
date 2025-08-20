const getWeatherBtn = document.getElementById("get-weather-btn");
const citySelect = document.getElementById("city-select");

async function getWeather(city) {
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

async function showWeather(city) {
  if (!city) return;

  const data = await getWeather(city);
  if (!data || !data.weather) {
    alert("Something went wrong, please try again later.");
    return;
  }

  document.getElementById("weather-display").style.display = "block";

  const { main, icon } = data.weather[0];
  const { temp, feels_like, humidity } = data.main;
  const { speed, gust } = data.wind;

  document.getElementById("location").innerText = city.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  document.getElementById("weather-icon").src = icon || "";
  document.getElementById("weather-main").innerText = main || "N/A";
  document.getElementById("main-temperature").innerText = temp !== undefined ? temp : "N/A";
  document.getElementById("feels-like").innerText = feels_like !== undefined ? feels_like : "N/A";
  document.getElementById("humidity").innerText = humidity !== undefined ? humidity : "N/A";
  document.getElementById("wind").innerText = speed !== undefined ? speed : "N/A";
  document.getElementById("wind-gust").innerText = gust !== undefined ? gust : "N/A";
}

getWeatherBtn.addEventListener("click", () => {
  const selectedCity = citySelect.value;
  showWeather(selectedCity);
});
