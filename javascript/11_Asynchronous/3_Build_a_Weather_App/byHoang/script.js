const weatherUrl = "https://weather-proxy.freecodecamp.rocks/api/city/";
const selectedValue = document.getElementById("selected-city");
const containerWeather = document.getElementById("weather-info-wrap");

async function getWeather(city){
    try{
        const res = await fetch(weatherUrl + city);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.error("Error fetching weather data:", error);
        return null;
    }
} 

async function showWeather(selectedValue){
    try {
        if(!selectedValue) return;

        const data = await getWeather(selectedValue);

        if (!data || !data.weather) {
            alert("Something went wrong, please try again later.");
            return;
        }

        const {name, weather, main, wind} = data;

        containerWeather.innerHTML =`
            <div id="weather-info">
            <div id="location">${name}</div>
            <div id="primary-info">
            <div>${main.temp}° C</div>
            <div id="primary-info-right">
                <img
                src="${weather[0]?.icon}"
                alt="${name}"
                />
                <span>${weather[0]?.main}</span>
            </div>
            </div>
            <hr />
            <div id="secondary-info">
            <div id="secondary-info-top">
                <div>Humidity: ${main.humidity}%</div>
                <div>Feels Like: ${main.feels_like}° C</div>
            </div>
            <div id="secondary-info-bottom">
                <div id="secondary-info-bottom-left">
                <p>Wind: ${wind.speed} m/s</p>
                <p>Gusts: ${ !wind?.gust ? 'N/A' : wind?.gust}</p>
                </div>
                <div>Feels Like: 13.2° C</div>
            </div>
            </div>
        </div>
        `;
    } catch (error) {
        console.log(err);
    }
}


document.getElementById("btn-get-weather").addEventListener("click",() => showWeather(selectedValue.value));