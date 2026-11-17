// Select HTML elements
const currentWeatherContainer = document.querySelector('#current-weather');
const forecastContainer = document.querySelector('#forecast');

// OpenWeatherMap API Configuration for Amichi, Nigeria
const apiKey = 'e0140c102dee4452c234daec97806db6';
const lat = '5.9833'; // Amichi latitude
const lon = '6.9000'; // Amichi longitude

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        // Fetch current weather
        const responseCurrent = await fetch(weatherUrl);
        if (responseCurrent.ok) {
            const dataCurrent = await responseCurrent.json();
            displayCurrentWeather(dataCurrent);
        } else {
            throw Error(await responseCurrent.text());
        }

        // Fetch 5-day / 3-hour forecast
        const responseForecast = await fetch(forecastUrl);
        if (responseForecast.ok) {
            const dataForecast = await responseForecast.json();
            displayForecast(dataForecast);
        } else {
            throw Error(await responseForecast.text());
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        currentWeatherContainer.innerHTML = `<p>Unable to load weather data at this time.</p>`;
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const capitalizedDesc = description.charAt(0).toUpperCase() + description.slice(1);
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    currentWeatherContainer.innerHTML = `
        <img src="${iconSrc}" alt="${description}">
        <div>
            <p class="weather-metric">${temp}&deg;C</p>
            <p class="weather-desc">${capitalizedDesc}</p>
        </div>
    `;
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';

    // OpenWeatherMap provides data every 3 hours (8 entries per day).
    // Filter to pick roughly 12:00 PM (noon) entries for the next 3 days.
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyForecasts.forEach(day => {
        const dateObj = new Date(day.dt * 1000);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., "Mon", "Tue"
        const temp = Math.round(day.main.temp);
        const description = day.weather[0].description;
        const iconSrc = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        const dayCard = document.createElement('div');
        dayCard.classList.add('forecast-day');
        dayCard.innerHTML = `
            <h4>${dayName}</h4>
            <img src="${iconSrc}" alt="${description}" width="40" height="40">
            <p><strong>${temp}&deg;C</strong></p>
            <p class="weather.day">${description}</p>
        `;

        forecastContainer.appendChild(dayCard);
    });
}

// Run the weather fetch function on load
apiFetch();