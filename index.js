// This function writes weather information to dashboard Dynamically.
// There are various type of information is written from here to organise and keep similar write at same place
function setWeatherInfoToPanel(weather) {
  if (!weather) return;

  document.getElementById("info_city_name").textContent = weather.name;
  document.getElementById("info_weather_category").textContent =
    weather.weather[0].main;
  document.getElementById("info_weather_temp").textContent = weather.main.temp;
  document.getElementById("info_wind_speed").textContent =
    `${weather.wind.speed} Km/h`;
  // document.getElementById("info_wind_dir").textContent = `${weather.wind.deg} Degree` ;
  document.getElementById("info_humidity_value").textContent =
    `${weather.main.humidity} `;
  document.getElementById("info_pressure_value").textContent =
    `${weather.main.pressure} `;
  document.getElementById("info_min_temp").textContent =
    `${weather.main.temp_max} `;
  document.getElementById("info_max_temp").textContent =
    `${weather.main.temp_min} `;

  let cloudy_sun = `<i class="fa-solid fa-cloud-sun text-4xl"></i>`;
  let sunny = `<i class="fa-solid fa-sun text-amber-600 text-4xl"></i>`;
  let clear = `<i class="fa-solid fa-sun text-amber-200 text-4xl"></i>`;
  let rain = `<i class="fa-solid fa-cloud-showers-heavy text-4xl"></i>`;
  let snow = `<i class="fa-solid fa-snowflake text-4xl"></i>`;

  switch (weather.weather[0].main.toLowerCase()) {
    case "rain":
      document.getElementById("day_category").innerHTML = rain;
      break;

    case "clear":
      document.getElementById("day_category").innerHTML = clear;
      break;

    case "summer":
      document.getElementById("day_category").innerHTML = sunny;
      break;

    case "snow":
      document.getElementById("day_category").innerHTML = snow;
      break;
  }
}

// Initializing Click effect on Today button , by default
document
  .getElementById("btn_today")
  .classList.remove("bg-gray-300", "text-gray-600");
document.getElementById("btn_today").classList.add("bg-blue-500", "text-white");

// Initializing Click effect on Celsius Button

document.getElementById('btn_cel').classList.remove("bg-gray-300", "text-gray-600");
document.getElementById('btn_cel').classList.add("bg-blue-500", "text-white");

// Removes the style on unclicking the button.
function unClickBtn(element_class) {
  document.querySelectorAll(`.${element_class}`).forEach(element => {
     element.classList.remove("bg-blue-500", "text-white");
    element.classList.add("bg-gray-300", "text-gray-600");
  });
    
}

// Add Click Style to Uititity button
(function clickUtilityBtn() {
    
    document.getElementById("btn-f-container").addEventListener("click", (e) => {
        const element = e.target.closest(".btn-f-utility");
        if(!element) return ;
        unClickBtn('btn-f-utility');

        element.classList.remove("bg-gray-300", "text-gray-600");
        element.classList.add("bg-blue-500", "text-white")
  });
})();


// Add styles to Unit Button
(function toggleUnitBtn(){
    document.getElementById("btn-f-container").addEventListener("click", (e) => {
        const element = e.target.closest(".btn-f-unit");
        if(!element) return ;

        unClickBtn('btn-f-unit'); // Calling this function to remove click effect style from the button.

        element.classList.remove("bg-gray-300", "text-gray-600");
    element.classList.add("bg-blue-500", "text-white")
  });
})();



