// ----------- MIND MAP FOR FUNCTIONS ---------------

// getCityWeatherApi() ;  It get the weather Data for todays weather

// getCurrentLocation()  Getting the current from navigator browser api

// function getWeatherDataFromCoords(lat, long) :  Above function call with "lat" and "lon" , It fetches weather data for today for user's current location

// setWeatherInfoToPanel(weather) : It set the data to UI

// setDataLS(key, data) : set the recent search array to LocalStorage

// getDataLS(key) : get the recent search List from LocalStorage

// toggleRecentBox() : Hide and show the Recent Search Box on Input focus.

// addFocusAndBlurEvent() : Changes the outline of City Search Input box on focus

//

// ----------------------- VARIABLE DECLARATION ----------------------------

const apiKey = `95c3cff85637b75da8b956e35d554997`;

let recent_search_list = getDataLS("recent_search_list");
let weather = {};
let fiveDayForcasts;
let curr_city_search;

// Sets width of recent search box equal to width of search bar
setWidthSearchBox();

// Add event to the browser as DOM load to make available feature instantly
// like - to show buttons clicked
ChangeButtonsToClickedButtons();

// gets list of 40 predictions from open weather api
// later extracts most relevant 5 predictions
// get5Dayforcast();

// render 5 day card with skeleton loading UI until data is recieved.
renderSkeletonForecast();

// get the coordinates of user's current location
getCurrentLocation();

// render the recent search list into Recent Search Box
// it works only when user clicks on input search
render5RecentSearches();

// add click Event on Current Location button to fetch current location weather
addClickEvent1();

// add click event on Search City Button to read input search
addClickEvent2();

// adds focus event on city search input to change input outline style
// adds blur event on city search input to change input outline style
addFocusAndBlurEvent();

// adds focus event on city search input and allow user to select recent searches
// add blur event on city search input and close recent search box
toggleRecentBox();

// adds click event to alter the temperature unit.
toggleUnitBtn();

// converts value
C_To_F_conversion();
F_To_C_conversion();

// add click event make button look like clicked
addClickEvent3();

// add resize event on window to set width recent search box.
window.addEventListener("resize", setWidthSearchBox);

//----------------------------- API CALLS -----------------------------------

if (!recent_search_list) {
  recent_search_list = [];
  // ---- ---- ----
  setDataLS("recent_search_list", recent_search_list);
}

// showMessageBox();

function getCityWeather() {
  // Get the city input element
  const input = document.getElementById("input_city_name");

  // Remove extra spaces from beginning and end
  let city_name = input.value.trim();

  // Store current searched city (used globally)
  curr_city_search = city_name;

  // Regex pattern allowing only letters, spaces and hyphen
  const cityRegex = /^[a-zA-Z\s-]+$/;

  // Validation 1: Check if input field is empty
  if (city_name === "") {
    showMessageBox("error", "Please enter a city name");
    input.focus();
    return;
  }

  // Validation 2: Prevent very short city names
  // Avoid invalid inputs like "a", "x"
  if (city_name.length < 2) {
    showMessageBox("error", "City name is too short");
    input.focus();
    return;
  }

  // Validation 3: Ensure city name contains only letters and spaces
  // Blocks numbers and special characters like 123, @, #
  if (!cityRegex.test(city_name)) {
    showMessageBox("error", "City name should contain only letters and spaces");
    input.focus();
    return;
  }

  // Validation 4: Remove multiple spaces between words
  // Example: "New     York" → "New York"
  city_name = city_name.replace(/\s+/g, " ");

  document.getElementById("search_by_city").disabled = true;
  document.getElementById("search_by_city").textContent = "Loading...";
  setTimeout(() => {
    document.getElementById("search_by_city").disabled = false;
  }, 1000 * 5);

  // If all validations pass, call the weather APIs
  getCityWeatherApi(city_name);
  get5Dayforcast(city_name);
}

async function getCityWeatherApi(city) {
  try {
    // Construct API URL with city name and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95c3cff85637b75da8b956e35d554997&units=metric`;

    // Send request to weather API
    const response = await fetch(url);

    // Convert API response into JSON format
    const data = await response.json();

    // Validation 1: Check if city is invalid
    // OpenWeather API returns cod = "404" when city is not found
    if (data.cod === "404") {
      document.getElementById("search_by_city").innerHTML =
        `<i class="fa-solid fa-arrow-right"></i> Search`;
      // Show message using custom message box
      showMessageBox("error", "City not found. Please enter a valid city.");
      const input = document.getElementById("input_city_name");
      input.focus();

      // Stop further execution
      return;
    }

    // Validation 2: Check if API response contains valid weather data
    if (!data || !data.main) {
      document.getElementById("search_by_city").innerHTML =
        `<i class="fa-solid fa-arrow-right"></i> Search`;
      // If data is missing required fields, show error message
      showMessageBox(
        "error",
        "Unable to fetch weather data. Please try again.",
      );
      const input = document.getElementById("input_city_name");
      input.focus();

      return;
    }

    // If valid city and data received successfully
    console.log("city weather", data);

    // Store weather data globally
    weather = data;

    const input = document.getElementById("input_city_name");

    addRecent(input.value);

    // Reset search button text
    document.getElementById("search_by_city").innerHTML =
      `<i class="fa-solid fa-arrow-right"></i> Search`;

    // Update weather UI panel with received data
    setWeatherInfoToPanel(weather);
  } catch (err) {
    // Validation 3: Handle network errors (no internet, API failure)
    console.log(err);

    showMessageBox(
      "alert",
      "Network error. Please check your internet connection.",
    );
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
      showMessageBox(
        "error",
        `${err.message}. Please check your location permission.`,
      );
      // console.log("error", err.message);
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
      document.getElementById("curr_loc_btn").innerHTML =
        `<i class="fa-solid fa-location-crosshairs"></i> Current Location`;
      curr_city_search = weather.name;
      get5Dayforcast(curr_city_search);
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

        renderHourlyForecast(data_list);
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

  document.getElementById("temt-space").innerHTML = `
  <span id="info_weather_temp" class="temp_value ${tempColor}"
                  >Loading...</span
                >
                <span class="temp_unit ${tempColor}">°C</span>`;

  // setting main weather icon
  document.getElementById("day_category").innerHTML =
    `<i class="fa-solid ${weatherIcon} text-4xl"></i>`;

  // city name
  document.getElementById("info_city_name").innerHTML = `${weather.name}
                <span id="alert_sign"></span>`;

  // weather type with icon
  document.getElementById("info_weather_category").innerHTML =
    `<i class="fa-solid ${weatherIcon}"></i> ${weather.weather[0].main}`;

  // temperature with dynamic color
  document.getElementById("info_weather_temp").innerHTML =
    `<span class="${tempColor}">${weather.main.temp}</span>`;

  // wind speed
  document.getElementById("info_wind_speed").innerHTML =
    `<i class="fa-solid fa-wind text-cyan-200"></i> ${weather.wind.speed}`;

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

  if (weather.main.temp >= 40) {
    // if(true){
    document.getElementById("alert_sign").innerHTML =
      `<i class="fa-solid fa-triangle-exclamation text-4xl text-red-500 alert-animate"></i>`;
    showMessageBox("alert", "Temperature High Alert");
  }
}

// ----------------- X ----------------------- X ----------------------------

// Event Listener on Use Current Location ;
// add click Event on Current Location button to fetch current location weather
// and forecast and then call function to get current location

function addClickEvent1() {
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
// add click event on Search City Button to read input search

function addClickEvent2() {
  document.getElementById("search_by_city").addEventListener("click", () => {
    getCityWeather();

    // document.getElementById("search_by_city").disabled = true;
    // document.getElementById("search_by_city").textContent = "Loading...";

    // setTimeout(() => {
    //   document.getElementById("search_by_city").disabled = false;
    // }, 1000 * 5);

    // const input = document.getElementById("input_city_name");

    // addRecent(input.value);
    // document.getElementById('curr_loc_btn').textContent = "Loading..";
  });

  document.getElementById("initiate_search").addEventListener("click", () => {
    document.getElementById("initiate_search").disabled = true;
    // document.getElementById("search_by_city").textContent = "Loading...";

    setTimeout(() => {
      document.getElementById("initiate_search").disabled = false;
    }, 1000 * 5);
    getCityWeather();

    const input = document.getElementById("input_city_name");

    addRecent(input.value);
    // document.getElementById('curr_loc_btn').textContent = "Loading..";
  });
}

// Search by City

// ------------------- UTILITY FUNCTIONS -----------------------

// adds focus event on city search input to change input outline style
// adds blur event on city search input to change input outline style
function addFocusAndBlurEvent() {
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
}

// IT TOGGLES THE RECENT SEARCH BOX WHICH APPEARS ON INPUT FOCUS AND HIDE ON BLUR.

// adds focus event on city search input and allow user to select recent searches
// add blur event on city search input and close recent search box
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

// Width Calculation

function setWidthSearchBox() {
  const width = document.getElementById("search_area").offsetWidth;

  document.getElementById("recent_city_dropdown").style.width = width + "px";
}

// Date convertion
function getDateMonth(dateStr) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month, day] = dateStr.split("-");

  return `${day} ${months[month - 1]}`;
}

console.log(getDateMonth("2026-03-10"));
// Output: 10 Mar

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

function addClickEvent3() {
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

function getForecastBackground(weather) {
  if (weather.includes("Clear")) {
    return "bg-gradient-to-br from-sky-500 to-blue-700 before:bg-yellow-300/20";
  }

  if (weather.includes("Cloud")) {
    return "bg-gradient-to-br from-sky-500 to-blue-700 before:bg-gray-300/20";
  }

  if (weather.includes("Rain")) {
    return "bg-gradient-to-br from-sky-500 to-blue-700 before:bg-blue-300/20";
  }

  return "bg-gradient-to-br from-sky-500 to-blue-700";
}

// ----------------------- X ------------------ X ---------------------

// ------------------- HOURLY FORECAST DETAILS -------------------------

const hourlySection = document.getElementById("hourly_section");
const hourlyContainer = document.getElementById("hourly_container");

// learnt a new way to use onclick event directly
// Adding Event to view and close hourly section

document.getElementById("btn_hourly").onclick = () => {
  hourlySection.classList.remove("hidden");
};

document.getElementById("close_hourly").onclick = () => {
  hourlySection.classList.add("hidden");
};

function renderHourlyForecast(forecastList) {
  hourlyContainer.innerHTML = "";

  // taking first 12 part of the day.
  forecastList.slice(0, 12).forEach((item) => {
    // manipulating the date object as per requirement
    const time = new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // taking out important information
    const temp = Math.round(item.main.temp);
    const weatherType = item.weather[0].main;
    const wind = item.wind.speed;

    // get appropiate weather icon and temperature color
    const iconClass = getWeatherIcon(weatherType);
    const tempColor = getTempColor(temp);

    //creating new element
    const card = document.createElement("div");

    // designing a complete card
    card.className = `
            flex flex-col items-center justify-center
            bg-white/10 backdrop-blur-md rounded-xl
            text-white shadow-md

            min-w-[80px] 
            sm:min-w-[110px] 
            lg:min-w-[140px]

            p-2 sm:p-3 lg:p-4
            `;

    card.innerHTML = `
      <p class="text-xs sm:text-sm opacity-80">${time}</p>

      <i class="fa-solid ${iconClass} text-lg sm:text-xl md:text-2xl my-1"></i>

      <p class="text-xs sm:text-sm">${weatherType}</p>

      <p class="text-sm sm:text-base font-semibold ${tempColor}">
        ${temp}°
      </p>

      <p class="text-[10px] sm:text-xs opacity-70">
        ${wind}
      </p>
    `;

    hourlyContainer.appendChild(card);
  });
}

const scrollContainer = document.getElementById("hourly_container");

document.getElementById("scroll_left").onclick = () => {
  // scroll 
  scrollContainer.scrollBy({  
    left: -300,
    behavior: "smooth"
  });
};

document.getElementById("scroll_right").onclick = () => {
  scrollContainer.scrollBy({
    left: 300,
    behavior: "smooth"
  });
};

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

  container.innerHTML = "";

  data.forEach((day) => {
    const weatherIcon = getWeatherIcon(day.weather);
    const tempColor = getTempColor(day.temp);

    const card = document.createElement("div");

    const weatherBg = getForecastBackground(day.weather);

    card.className = `
      relative overflow-hidden
      rounded-xl p-5 min-h-[170px]
      flex flex-col gap-4
      ${weatherBg}
      text-white shadow-lg
      transition-all duration-300
      hover:scale-105 hover:shadow-2xl
      cursor-pointer
      before:absolute before:inset-0 before:blur-xl before:opacity-40 before:pointer-events-none
    `;

    card.innerHTML = `

      <!-- Date -->
      <h3 class="font-semibold text-sm text-white/80">
        ${getDateMonth(day.date)}
      </h3>

      <!-- Weather Icon -->
      <div class="flex justify-center text-4xl">
        <i class="fa-solid ${weatherIcon}  weather-icon"></i>
      </div>

      <!-- Temperature -->
      <div class="flex items-center gap-2 text-lg">
        <i class="fa-solid fa-temperature-half text-orange-300"></i>
        <span class="font-bold ${tempColor} temp_value">${day.temp}</span>
        <span class="temp_unit text-white/70">°C</span>
      </div>

      <!-- Wind -->
      <div class="flex items-center gap-2 text-sm text-white/70">
        <i class="fa-solid fa-wind text-cyan-200"></i>
        <span>${day.wind} km/h</span>
      </div>

      <!-- Humidity -->
      <div class="flex items-center gap-2 text-sm text-white/70">
        <i class="fa-solid fa-droplet text-blue-200"></i>
        <span>${day.humidity}%</span>
      </div>

    `;

    container.appendChild(card);
  });
}

// render skeleton cards until data is not recieved.
function renderSkeletonForecast() {
  const container = document.getElementById("forecast_container");

  container.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    // const weatherIcon = getWeatherIcon(day.weather);
    // const tempColor = getTempColor(day.temp);

    const card = document.createElement("div");

    // const weatherBg = getForecastBackground(day.weather);

    card.className = `
      relative overflow-hidden
      rounded-xl p-5 min-h-[170px]
      flex flex-col gap-4
      text-white shadow-lg
      bg-gradient-to-br from-sky-500 to-blue-700
      transition-all duration-300
      hover:scale-105 hover:shadow-2xl
      cursor-pointer
      before:absolute before:inset-0 before:blur-xl before:opacity-40 before:pointer-events-none
    `;

    card.innerHTML = `

      <!-- Date -->
      <h3 class="font-semibold text-sm text-white/80">
       <span class="skeleton h-7 w-40 rounded block"></span>
      </h3>

      <!-- Weather Icon -->
      <div class="flex justify-center text-4xl">
        <i class="fa-solid  weather-icon">
        <span class="skeleton h-7 w-40 rounded block"></span>
        </i>
      </div>

      <!-- Temperature -->
      <div class="flex items-center gap-2 text-lg">
        <i class="fa-solid fa-temperature-half text-orange-300"></i>
        <span class="font-bold temp_value">
        <span class="skeleton h-7 w-40 rounded block"></span>
        </span>
        <span class="temp_unit text-white/70">°C</span>
      </div>

      <!-- Humidity -->
      <div class="flex items-center gap-2 text-sm text-white/70">
        <i class="fa-solid fa-droplet text-blue-200"></i>
        <span>
        <span class="skeleton h-7 w-40 rounded block"></span>
        </span>
      </div>

    `;

    container.appendChild(card);
  }
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

// render the recent search list into Recent Search Box
// it works only when user clicks on input search

function render5RecentSearches() {
  const box = document.getElementById("recent_search_box");

  box.innerHTML = ""; // clearing previous list ;

  if (recent_search_list.length === 0) {
    // avoid empty list display
    //
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");

  recent_search_list.forEach((item, index) => {
    const row = document.createElement("div");

    // styling for each recent search row
    row.className =
      "flex justify-between items-center px-3 py-1 border-b border-gray-200 hover:bg-blue-300 hover:text-gray-800 transition-colors duration-200 cursor-pointer";

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

  render5RecentSearches();
}

//// when user clicks recent item
function selectRecent(value) {
  const input = document.getElementById("input_city_name");

  input.value = value;
}

function removeRecent(index) {
  recent_search_list.splice(index, 1);

  render5RecentSearches();
}

// ----------------- X ------------------ X ------------------------

// -------------------- DEFAULT ACTIONS -------------------------

// IT INITIALIZES THE DEFAULT EFFECTS ON TODAYS BUTTON
function ChangeButtonsToClickedButtons() {
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
}
