
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

