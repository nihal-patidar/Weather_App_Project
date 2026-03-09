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

// Initializing Click effect on Today button , by default
document
  .getElementById("btn_today")
  .classList.remove("bg-gray-300", "text-gray-600");
document.getElementById("btn_today").classList.add("bg-blue-500", "text-white");

// Initializing Click effect on Celsius Button

document
  .getElementById("btn_cel")
  .classList.remove("bg-gray-300", "text-gray-600");
document.getElementById("btn_cel").classList.add("bg-blue-500", "text-white");

// Removes the style on unclicking the button.
function unClickBtn(element_class) {
  document.querySelectorAll(`.${element_class}`).forEach((element) => {
    element.classList.remove("bg-blue-500", "text-white");
    element.classList.add("bg-gray-300", "text-gray-600");
  });
}

// Add Click Style to Uititity button
(function clickUtilityBtn() {
  document.getElementById("btn-f-container").addEventListener("click", (e) => {
    const element = e.target.closest(".btn-f-utility");
    if (!element) return;
    unClickBtn("btn-f-utility");

    element.classList.remove("bg-gray-300", "text-gray-600");
    element.classList.add("bg-blue-500", "text-white");
  });
})();

// Add styles to Unit Button
(function toggleUnitBtn() {
  document.getElementById("btn-f-container").addEventListener("click", (e) => {
    const element = e.target.closest(".btn-f-unit");
    if (!element) return;

    unClickBtn("btn-f-unit"); // Calling this function to remove click effect style from the button.

    element.classList.remove("bg-gray-300", "text-gray-600");
    element.classList.add("bg-blue-500", "text-white");
  });
})();

//Celsius (°C) to Fahrenheit (°F),

document.getElementById("btn_fer").addEventListener("click", () => {
  let temp = document.getElementById("info_weather_temp").textContent;

  document
    .querySelectorAll(".temp_value")
    .forEach((element) => (element.textContent = celsiusToFahrenheit(temp)));
  document
    .querySelectorAll(".temp_unit")
    .forEach((element) => (element.textContent = "°F"));
});

// Fahrenheit (°F) to Celsius (°C)
document.getElementById("btn_cel").addEventListener("click", () => {
  let temp = (document.getElementById("info_weather_temp").textContent =
    weather.main.temp);
  document
    .querySelectorAll(".temp_unit")
    .forEach((element) => (element.textContent = "°C"));
});

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

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

// showMessageBox("alert", "Location permission required");

// Recent Search Box

// storing recent search list

let recent_search_list = getDataLS("recent_search_list");

if (!recent_search_list) {
  recent_search_list = [];
  // ---- ---- ----
  setDataLS("recent_search_list", recent_search_list);
}

// showMessageBox();
showRecentSearch();

// ---- ---- ---- ---- ----

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

    row.className =
      "flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer";

    row.innerHTML = `
      <span onclick="selectRecent('${item}')">${item}</span>  
      <button onclick="removeRecent(${index})">x</button>
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

// Research for open API return 40 record

let fiveDayForcasts;

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

get5Dayforcast();

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
        <span class="font-medium ${tempColor}">${day.temp}</span>
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
