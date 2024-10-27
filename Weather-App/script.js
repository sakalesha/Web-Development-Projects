const apiKey = "4d7fef95a3424e5c9f59307b618150ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchText = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-img");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

console.log(localStorage);

async function checkWeather(city) {
    // Show loading spinner
    document.querySelector(".loading-spinner").style.display = "flex";

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        let data = await response.json();
    
        // update fields according to data 
        updateFields(data);
        searchText.value = "";
    }
    catch {
        // Hide loading spinner
        document.querySelector(".loading-spinner").style.display = "none";

        error.style.display = "block";
        weather.style.display = "none";
    }
}


// add event liseaner to search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchText.value);
});

// add event liseaner for enter key
searchText.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        console.log(event);
        checkWeather(searchText.value);
    }
});

// check weather data is avialable 
if(navigator.geolocation) {
    // get langitud and latitude by users
    navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        // pass data for fecth
        getWeatherByCoords(latitude, longitude);
    });
}

// create getWeatherByCoords function
async function getWeatherByCoords(lat,lon) {
    // Show loading spinner
    document.querySelector(".loading-spinner").style.display = "flex";

    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&" + `lat=${lat}&lon=${lon}` + `&appid=${apiKey}`);
    const data = await response.json();
    updateFields(data);
}

// Function to display weather details
function updateFields(data) {
    // Hide loading spinner
    document.querySelector(".loading-spinner").style.display = "none";

    console.log(data);

    // update fields according to data 
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + "km/hr";

    if(data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
    }

    weather.style.display = "block";
    error.style.display = "none";
}
