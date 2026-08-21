const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const api_key = '2830f449c035b29c0722370477cec81c';

function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            temperature.innerHTML = `${data.main.temp.toFixed(1)}<sup>°C</sup>`;
            description.innerHTML = data.weather[0].description.replace(/^\w/, c => c.toUpperCase());
            humidity.innerHTML = `${data.main.humidity}%`;
            wind_speed.innerHTML = `${data.wind.speed} Km/H`;

            const iconCode = data.weather[0].icon;
            const isNight = iconCode.includes('n');

            // 🌙 Toggle night mode with transition
            document.body.classList.remove('day-mode', 'night-mode');
            setTimeout(() => {
                document.body.classList.add(isNight ? 'night-mode' : 'day-mode');
            }, 50);

            // 🌤️ Custom icon mapping
            switch (iconCode) {
                case "01d":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/6974/6974833.png"; // Sunny
                    break;
                case "01n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/581/581601.png"; // Clear night
                    break;
                case "02d":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Few clouds
                    break;
                case "02n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/3663/3663245.png"; // Few clouds night
                    break;
                case "03d":
                case "03n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // Scattered clouds
                    break;
                case "04d":
                case "04n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png"; // Broken clouds
                    break;
                case "09d":
                case "09n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/2864/2864449.png"; // Shower rain
                    break;
                case "10d":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png"; // Rain day
                    break;
                case "10n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/2930/2930005.png"; // Rain night
                    break;
                case "11d":
                case "11n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"; // Thunderstorm
                    break;
                case "13d":
                case "13n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // Snow
                    break;
                case "50d":
                case "50n":
                    weather_img.src = "https://cdn-icons-png.flaticon.com/512/1197/1197102.png"; // Mist
                    break;
                default:
                    weather_img.src = "https://i.pinimg.com/736x/46/99/ed/4699ed62b71ce4c2b51f33c4eb140f63.jpg";
            }
        })
        .catch(error => {
            alert(error.message);
        });
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
