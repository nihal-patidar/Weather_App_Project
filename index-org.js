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

// ----------------------- VARIABLE DECLARATION ----------------------------

const apiKey = `95c3cff85637b75da8b956e35d554997`;

let recent_search_list = getDataLS("recent_search_list");
let weather = {};
let fiveDayForcasts;
let curr_city_search ;

initDefaultActions();
get5Dayforcast();
getCurrentLocation();
showRecentSearch();
addEventToGetCurrentLocationWeather();
addEventToGetWeatherDataByCityName();
searchAreaChangeOutline();
toggleRecentBox();
toggleUnitBtn();
C_To_F_conversion();
F_To_C_conversion();
clickUtilityBtn()
//----------------------------- API CALLS -----------------------------------

if (!recent_search_list) {
  recent_search_list = [];
  // ---- ---- ----
  setDataLS("recent_search_list", recent_search_list);
}

// showMessageBox();



function getCityWeather(){

    const input = document.getElementById('input_city_name');

    const city_name = input.value ;

    curr_city_search = city_name ;

    if(city_name === ""){
        alert('Please Enter City Name')
        return ;
    }

    getCityWeatherApi(city_name);   
    get5Dayforcast(city_name);

}

async function getCityWeatherApi(city) {
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
      curr_city_search = weather.name ;
      get5Dayforcast(curr_city_search)
      setWeatherInfoToPanel(weather);
    }
  });
}

async function get5Dayforcast(city = "Indore") {
  // const city = "Indore";

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //console.log("5day data" , data.list); // contains 40 records
        data_list = data.list;
        extractFiveDayForecast(data_list);
      });
  } catch (err) {
    console.log(err);
  }
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

// Event Listener on Use Current Location ;

function addEventToGetCurrentLocationWeather() {
  document.getElementById("curr_loc_btn").addEventListener("click", () => {
    document.getElementById("curr_loc_btn").disabled = true;
    document.getElementById("curr_loc_btn").textContent = "Loading...";

    setTimeout(() => {
      document.getElementById("curr_loc_btn").disabled = false;
    }, 1000 * 15);
    getCurrentLocation();

    // document.getElementById('curr_loc_btn').textContent = "Loading..";
  });
}



// Event Listener on Search City Input and Button ;
function addEventToGetWeatherDataByCityName() {
  document.getElementById("search_by_city").addEventListener("click", () => {
    document.getElementById("search_by_city").disabled = true;
    document.getElementById("search_by_city").textContent = "Loading...";

    setTimeout(() => {
      document.getElementById("search_by_city").disabled = false;
    }, 1000 * 5);
    getCityWeather();

    const input = document.getElementById("input_city_name");

    addRecent(input.value);
    // document.getElementById('curr_loc_btn').textContent = "Loading..";
  });
}

// Search by City 

  // ------------------- UTILITY FUNCTIONS -----------------------

  function searchAreaChangeOutline() {
    // On focus
    document.getElementById("input_city_name").addEventListener("focus", () => {
      document
        .getElementById("search_area")
        .classList.remove("outline-cyan-500");
      document.getElementById("search_area").classList.add("outline-blue-500");
    });

    // On Focus Out
    document.getElementById("input_city_name").addEventListener("blur", () => {
      document
        .getElementById("search_area")
        .classList.remove("outline-blue-500");
      document.getElementById("search_area").classList.add("outline-cyan-500");
    });
  }

// IT TOGGLES THE RECENT SEARCH BOX WHICH APPEARS ON INPUT FOCUS AND HIDE ON BLUR.

function toggleRecentBox() {
  document.getElementById("input_city_name").addEventListener("focus", () => {
    document.getElementById("recent_city_dropdown").classList.remove("hidden");
  });

  document.getElementById("input_city_name").addEventListener("blur", () => {
    setTimeout(() => {
      document.getElementById("recent_city_dropdown").classList.add("hidden");
    }, 200);
  });
}

// IT ADDS FUNCTIONALITY TO UNIT BUTTON TO TOGGLE AND VALUE CONVERSION BETWEEN C TO F AND VISE-VERSA
function toggleUnitBtn() {
  document.getElementById("btn-f-container").addEventListener("click", (e) => {
    const element = e.target.closest(".btn-f-unit");
    if (!element) return;

    unClickBtn("btn-f-unit"); // Calling this function to remove click effect style from the button.

    element.classList.remove("bg-gray-300", "text-gray-600");
    element.classList.add("bg-blue-500", "text-white");
  });
}

//Celsius (°C) to Fahrenheit (°F),

function C_To_F_conversion() {
  document.getElementById("btn_fer").addEventListener("click", () => {
    let temp = document.getElementById("info_weather_temp").textContent;

    document
      .querySelectorAll(".temp_value")
      .forEach((element) => (element.textContent = celsiusToFahrenheit(temp)));
    document
      .querySelectorAll(".temp_unit")
      .forEach((element) => (element.textContent = "°F"));
  });
}

// Fahrenheit (°F) to Celsius (°C)
function F_To_C_conversion() {
  document.getElementById("btn_cel").addEventListener("click", () => {
    let temp = (document.getElementById("info_weather_temp").textContent =
      weather.main.temp);
    document
      .querySelectorAll(".temp_unit")
      .forEach((element) => (element.textContent = "°C"));
    
    get5Dayforcast(curr_city_search);
  });

  
}

function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }
// IT MAKE BUTTON UNCLICK OR MAKE BUTTON IN DEFAULT STATE
function unClickBtn(element_class) {
  document.querySelectorAll(`.${element_class}`).forEach((element) => {
    element.classList.remove("bg-blue-500", "text-white");
    element.classList.add("bg-gray-300", "text-gray-600");
  });
}

// IT ADDS EFFECT OF CLICKED AND ACTIVE
function clickUtilityBtn() {
  document.getElementById("btn-f-container").addEventListener("click", (e) => {
    const element = e.target.closest(".btn-f-utility");
    if (!element) return;
    unClickBtn("btn-f-utility");

    element.classList.remove("bg-gray-300", "text-gray-600");
    element.classList.add("bg-blue-500", "text-white");
  });
}

// IT SET THE PASSED DATA TO LOCAL STORAGE
function setDataLS(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}

// IT GET THE DATA FROM LOCAL STORAGE USING PASSED KEY
function getDataLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

// returning weather icon according to weather type
function getWeatherIcon(type) {
  if (type === "Clear") return "fa-sun text-yellow-400";
  if (type === "Rain") return "fa-cloud-rain text-blue-400";
  if (type === "Snow") return "fa-snowflake text-cyan-200";
  if (type === "Clouds") return "fa-cloud text-gray-300";
  if (type === "Thunderstorm") return "fa-bolt text-yellow-300";

  return "fa-cloud text-gray-300";
}

// temperature color based on value
function getTempColor(temp) {
  if (temp <= 10) return "text-blue-400";
  if (temp <= 20) return "text-green-400";
  if (temp <= 30) return "text-yellow-400";
  if (temp <= 40) return "text-orange-400";

  return "text-red-500";
}

// ----------------------- X ------------------ X ---------------------

// ------------------- FORECAST SECTION FUNCTIONS ----------------------

// extracting 5 day forecast from 40 records

function extractFiveDayForecast(list) {
  const forecast = [];

  list.forEach((item) => {
    if (item.dt_txt.includes("12:00:00")) {
      // this give the accurate data for each day (day time);

      forecast.push({
        date: item.dt_txt.split(" ")[0], // taking out date
        temp: item.main.temp,
        wind: item.wind.speed,
        humidity: item.main.humidity,
        weather: item.weather[0].main,
      });
    }
  });

  console.log("5 day data", forecast);

  renderForecast(forecast);
}

function renderForecast(data) {
  const container = document.getElementById("forecast_container");

  // clearing previous cards
  container.innerHTML = "";

  data.forEach((day) => {
    const weatherIcon = getWeatherIcon(day.weather);
    const tempColor = getTempColor(day.temp);

    const card = document.createElement("div");

    // improved contrast + cleaner card look
    card.className =
      "rounded-lg p-4 flex flex-col gap-3 bg-white shadow-md border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer";

    card.innerHTML = `

      <!-- date -->
      <h3 class="font-semibold text-sm text-gray-700">
        ${day.date}
      </h3>

      <!-- weather icon -->
      <div class="flex justify-center text-3xl">
        <i class="fa-solid ${weatherIcon}"></i>
      </div>

      <!-- temperature -->
      <div class="flex items-center gap-2 text-sm text-gray-700">
        <i class="fa-solid fa-temperature-half text-orange-500"></i>
        <span class="font-medium ${tempColor} temp_value">${day.temp}</span>
        <span class="temp_unit">°C</span>
      </div>

      <!-- wind -->
      <div class="flex items-center gap-2 text-sm text-gray-700">
        <i class="fa-solid fa-wind text-cyan-500"></i>
        <span>${day.wind} km/h</span>
      </div>

      <!-- humidity -->
      <div class="flex items-center gap-2 text-sm text-gray-700">
        <i class="fa-solid fa-droplet text-blue-500"></i>
        <span>${day.humidity}%</span>
      </div>

    `;

    container.appendChild(card);
  });
}

// ------------------- X -------------------- X ----------------------------

// ----------------------- MESSAGE BOX --------------------------------

// function to show message box
// type can be : error , success , alert
function showMessageBox(type, message) {
  const box = document.getElementById("message_box");
  const icon = document.getElementById("message_icon");
  const title = document.getElementById("message_title");
  const text = document.getElementById("message_text");

  text.innerText = message;

  // setting style according to message type
  if (type === "error") {
    title.innerText = "Error";
    box.classList.remove("border-green-400", "border-yellow-400");
    box.classList.add("border-red-400");
  }

  if (type === "success") {
    title.innerText = "Success";
    box.classList.remove("border-red-400", "border-yellow-400");
    box.classList.add("border-green-400");
  }

  if (type === "alert") {
    title.innerText = "Alert";
    box.classList.remove("border-red-400", "border-green-400");
    box.classList.add("border-yellow-400");
  }

  // showing message box
  box.classList.remove("hidden");

  // auto hide after 4 sec
  setTimeout(() => {
    closeMessageBox();
  }, 4000);
}

// function to close message box
function closeMessageBox() {
  document.getElementById("message_box").classList.add("hidden");
}

// -------------------- X --------------- X ---------------------------

// ------------------- RECENT SEARCH BOX FUNCTIONS ------------------------

function showRecentSearch() {
  const box = document.getElementById("recent_search_box");

  box.innerHTML = ""; // clearing previous list ;

  if (recent_search_list.length === 0) {
    //
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");

  recent_search_list.forEach((item, index) => {
    const row = document.createElement("div");

    // styling for each recent search row
    row.className =
      "flex justify-between items-center px-3 py-2 border-b border-gray-200 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200 cursor-pointer";

    // clicking on row should select that city
    row.onclick = () => selectRecent(item);

    row.innerHTML = `
  <span>${item}</span>

  <!-- remove button -->
  <button 
    class="text-gray-400 hover:text-red-500 transition-colors"
    onclick="removeRecent(${index})"
  >
    x
  </button>
`;

    // Add events directly

    box.appendChild(row);
  });
}

// adding new recent to list

function addRecent(value) {
  // validating empty search store
  if (!value) return;

  // remove duplicate or put current search on top

  recent_search_list = recent_search_list.filter((item) => item !== value);

  // Adding to top

  recent_search_list.unshift(value);

  // keeping only last 5

  if (recent_search_list.length > 5) {
    recent_search_list.pop();
  }

  setDataLS("recent_search_list", recent_search_list);

  showRecentSearch();
}

//// when user clicks recent item
function selectRecent(value) {
  const input = document.getElementById("input_city_name");

  input.value = value;
}

function removeRecent(index) {
  recent_search_list.splice(index, 1);

  showRecentSearch();
}

// ----------------- X ------------------ X ------------------------

// -------------------- DEFAULT ACTIONS -------------------------

// IT INITIALIZES THE DEFAULT EFFECTS ON TODAYS BUTTON
function initDefaultActions() {
  // Initializing Click effect on Today button , by default
  document.getElementById("btn_today").classList.remove("bg-gray-300", "text-gray-600");
  document.getElementById("btn_today")
.classList.add("bg-blue-500", "text-white");

  // Initializing Click effect on Celsius Button

  document
    .getElementById("btn_cel")
    .classList.remove("bg-gray-300", "text-gray-600");
  document.getElementById("btn_cel").classList.add("bg-blue-500", "text-white");
}
