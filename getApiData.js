const apiKey = `95c3cff85637b75da8b956e35d554997`;
const api1 =
  "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=95c3cff85637b75da8b956e35d554997";
const url = `https://api.openweathermap.org/data/2.5/weather?q=&appid=${apiKey}&units=metric`;

let weather = {};

async function getCityWeatherApi(city = "Indore") {
  // const city = "Indore";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95c3cff85637b75da8b956e35d554997&units=metric`;

    fetch(url).then(async (response) => {
      const data = await response.json();
      if (data) {
        console.log("city weather" , data);
        weather = data;
        document.getElementById("search_by_city").textContent = "Search";

        setWeatherInfoToPanel(weather);
      }
    });
  } catch (err) {
    console.log(err);
  }

}


// Utility Function for setting data to Local Storage
function setDataLS(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}

// Utility Function for getting data from Local Storage ;
function getDataLS(key) {
  return JSON.parse(localStorage.getItem(key));
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
