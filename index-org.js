// ----------- MIND MAP FOR FUNCTIONS ---------------

// getCityWeatherApi() ;  It get the weather Data for todays weather

// getCurrentLocation()  Getting the current from navigator browser api

// function getWeatherDataFromCoords(lat, long) :  Above function call with "lat" and "lon" , It fetches weather data for today for user's current location

// setWeatherInfoToPanel(weather) : It set the data to UI

//setDataLS(key, data) : set the recent search array to LocalStorage

// getDataLS(key) : get the recent search List from LocalStorage

// toggleRecentBox() : Hide and show the Recent Search Box on Input focus.

// searchAreaChangeOutline() : Changes the outline of City Search Input box on focus

//

//----------------------------- API CALLS -----------------------------------

let weather = {};

async function getCityWeatherApi() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95c3cff85637b75da8b956e35d554997&units=metric`;

    fetch(url).then(async (response) => {
      const data = await response.json();
      if (data) {
        console.log("city weather", data);
        weather = data;
        document.getElementById("search_by_city").textContent = "Search";

        setWeatherInfoToPanel(weather);
      }
    });
  } catch (err) {
    console.log(err);
  }
}



function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherDataFromCoords(lat, lon);
    },
    (err) => {
      console.log("error", err.message);
    },
  );
}

function getWeatherDataFromCoords(lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  fetch(url).then(async (response) => {
    const data = await response.json();
    if (data) {
      console.log("weather 3", data);
      weather = data;
      document.getElementById("curr_loc_btn").textContent = "Current Location";

      setWeatherInfoToPanel(weather);
    }
  });
}

// This function writes weather information to dashboard Dynamically.
// There are various type of information is written from here to organise and keep similar write at same place
function setWeatherInfoToPanel(weather) {
  if (!weather) return;

  const weatherIcon = getWeatherIcon(weather.weather[0].main);
  const tempColor = getTempColor(weather.main.temp);

  // setting main weather icon
  document.getElementById("day_category").innerHTML =
    `<i class="fa-solid ${weatherIcon} text-4xl"></i>`;

  // city name
  document.getElementById("info_city_name").textContent = weather.name;

  // weather type with icon
  document.getElementById("info_weather_category").innerHTML =
    `<i class="fa-solid ${weatherIcon}"></i> ${weather.weather[0].main}`;

  // temperature with dynamic color
  document.getElementById("info_weather_temp").innerHTML =
    `<span class="${tempColor}">${weather.main.temp}</span>`;

  // wind speed
  document.getElementById("info_wind_speed").innerHTML =
    `<i class="fa-solid fa-wind text-cyan-200"></i> ${weather.wind.speed} Km/h`;

  // humidity
  document.getElementById("info_humidity_value").innerHTML =
    `<i class="fa-solid fa-droplet text-blue-200"></i> ${weather.main.humidity}`;

  // pressure
  document.getElementById("info_pressure_value").innerHTML =
    `<i class="fa-solid fa-gauge text-purple-200"></i> ${weather.main.pressure}`;

  // min temperature
  document.getElementById("info_min_temp").innerHTML =
    `<i class="fa-solid fa-temperature-arrow-down text-blue-200"></i> ${weather.main.temp_min}`;

  // max temperature
  document.getElementById("info_max_temp").innerHTML =
    `<i class="fa-solid fa-temperature-arrow-up text-red-200"></i> ${weather.main.temp_max}`;
}



// ----------------- X ----------------------- X ----------------------------








// ------------------- UTILITY FUNCTIONS -----------------------


(function searchAreaChangeOutline() {
  // On focus
  document.getElementById("input_city_name").addEventListener("focus", () => {
    document.getElementById("search_area").classList.remove("outline-cyan-500");
    document.getElementById("search_area").classList.add("outline-blue-500");
  });

  // On Focus Out
  document.getElementById("input_city_name").addEventListener("blur", () => {
    document.getElementById("search_area").classList.remove("outline-blue-500");
    document.getElementById("search_area").classList.add("outline-cyan-500");
  });
})();


// IT TOGGLES THE RECENT SEARCH BOX WHICH APPEARS ON INPUT FOCUS AND HIDE ON BLUR.

(function toggleRecentBox() {
  document.getElementById("input_city_name").addEventListener("focus", () => {
    document.getElementById("recent_city_dropdown").classList.remove("hidden");
  });

  document.getElementById("input_city_name").addEventListener("blur", () => {
    setTimeout(() => {
      document.getElementById("recent_city_dropdown").classList.add("hidden");
    }, 200);
  });
})();



// IT MAKE BUTTON UNCLICK OR MAKE BUTTON IN DEFAULT STATE
function unClickBtn(element_class) { 
  document.querySelectorAll(`.${element_class}`).forEach((element) => {
    element.classList.remove("bg-blue-500", "text-white");
    element.classList.add("bg-gray-300", "text-gray-600");
  });
}

// IT ADDS EFFECT OF CLICKED AND ACTIVE 
(function clickUtilityBtn() {
  document.getElementById("btn-f-container").addEventListener("click", (e) => {
    const element = e.target.closest(".btn-f-utility");
    if (!element) return;
    unClickBtn("btn-f-utility");

    element.classList.remove("bg-gray-300", "text-gray-600");
    element.classList.add("bg-blue-500", "text-white");
  });
})();


// IT SET THE PASSED DATA TO LOCAL STORAGE
function setDataLS(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}

// IT GET THE DATA FROM LOCAL STORAGE USING PASSED KEY
function getDataLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

// -------------------- X --------------- X ---------------------------







// -------------------- DEFAULT ACTIONS -------------------------


// IT INITIALIZES THE DEFAULT EFFECTS ON TODAYS BUTTON
(function initDefaultActions() {
  // Initializing Click effect on Today button , by default
  document
    .getElementById("btn_today")
    .classList.remove("bg-gray-300", "text-gray-600");
  document
    .getElementById("btn_today")
    .classList.add("bg-blue-500", "text-white");

  // Initializing Click effect on Celsius Button

  document
    .getElementById("btn_cel")
    .classList.remove("bg-gray-300", "text-gray-600");
  document.getElementById("btn_cel").classList.add("bg-blue-500", "text-white");
})();
