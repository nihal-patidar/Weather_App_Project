
// Change the Outline Color on Focus the Input
// Using Immediate Invoke Function to avoid Immediate calling manually
(function searchAreaChangeOutline(){

    // On focus
    document.getElementById('input_city_name').addEventListener('focus',()=>{
        document.getElementById('search_area').classList.remove('outline-cyan-500');
        document.getElementById('search_area').classList.add('outline-blue-500');
    })
    
    // On Focus Out
    document.getElementById('input_city_name').addEventListener('blur',()=>{
        document.getElementById('search_area').classList.remove('outline-blue-500');
        document.getElementById('search_area').classList.add('outline-cyan-500');
    })

})();
// searchAreaChangeOutline();


// Adding functionalities to show and hide Recent Search DropDown.

let drop_down_bar_open = false ;
(function dropDownBarToggle(){
    document.getElementById('drop_down_bar').addEventListener('click',()=>{
        if(drop_down_bar_open){ // open 
            document.getElementById('recent_city_dropdown').classList.add('hidden');
            drop_down_bar_open = !drop_down_bar_open ;
        }else{ // close 
            document.getElementById('recent_city_dropdown').classList.remove('hidden');
            drop_down_bar_open = !drop_down_bar_open ;

        }
    })


})();


function getCurrentLocation(){

    navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherDataFromCoords(lat,lon);
    },(err)=>{console.log("error",err.message)});
}

getCurrentLocation();





// Event Listener on Use Current Location ;

document.getElementById('curr_loc_btn').addEventListener('click',()=>{
    document.getElementById("curr_loc_btn").disabled = true ;
    document.getElementById("curr_loc_btn").textContent = "Loading..." ;

    setTimeout(()=>{
      document.getElementById("curr_loc_btn").disabled = false ;

    },1000*15)
    getCurrentLocation();
    
    // document.getElementById('curr_loc_btn').textContent = "Loading..";

})


// Event Listener on Search City Input and Button ;
document.getElementById('search_by_city').addEventListener('click',()=>{

    document.getElementById("search_by_city").disabled = true ;
    document.getElementById("search_by_city").textContent = "Loading..." ;

    setTimeout(()=>{
      document.getElementById("search_by_city").disabled = false ;
    },1000*5)
    getCityWeather();
    
    // document.getElementById('curr_loc_btn').textContent = "Loading..";

})



// Search by City 

function getCityWeather(){

    const input = document.getElementById('input_city_name');

    const city_name = input.value ;

    if(city_name === ""){
        alert('Please Enter City Name')
        return ;
    }

    getCityWeatherApi(city_name);
    // if(input_value)



    

    
}


