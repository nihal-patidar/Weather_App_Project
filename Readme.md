# 🌦️ Weather Forecast Dashboard

A sophisticated, responsive weather application developed to meet the comprehensive requirements of the ** Weather Forecast Project**. This application provides real-time meteorological data, location-based tracking, and extended forecasts with a focus on UI creativity and robust error handling.

## **Live Demo**

* **Deployed Application**: [View Live Weather App](YOUR_DEPLOYED_LINK)

* **GitHub Repository**: [View Source Code](https://github.com/nihal-patidar/Weather_App_Project.git)

## 🚀 Key Features

### **1. Location & Search Functionality**
**Automatic Current Location**: Instantly fetches weather and a 5-day forecast for the user's current coordinates upon landing.

**Manual City Search**: Robust search bar allowing users to query weather data for any city globally.

**Search History Dropdown**: Dynamic dropdown menu utilizing local/session storage to store and revisit recently searched cities.

**Interactive Controls**: Includes dedicated buttons for manual searching and refreshing current location data.


### **2. Intelligent UI & Dynamic Styling**
* **Adaptive Icons**: The interface background dynamically changes based on weather conditions (e.g., transitions to a rainy **icons** during precipitation).
* **Responsive Design**: Meticulously crafted using **Tailwind CSS** to ensure a seamless experience across **Desktop, iPad Mini, and iPhone SE.**
* **Visual Indicators**: 
    * Weather-specific icons for intuitive data reading.
    * Dynamic **text coloring** for temperature values based on heat intensity.
* **Unit Conversion**: Integrated **°C/°F toggle** for the current dashboard temperature.
* **Temperature Alert**: Alert message will be appear when temperature goes  **above 40°**.

### **3. Extended 5-Day Forecast**
* **Detailed Daily Cards**: Provides a breakdown of Date, Temperature, Wind Speed, and Humidity for the upcoming five days.
* **Enhanced Readability**: Each forecast card uses relevant icons and organized layouts for quick data consumption.
* **Visual Indicators**: 
    * Weather-specific icons for intuitive data reading.
    * Dynamic **text coloring** for temperature values based on heat intensity.
* **Unit Conversion**: Integrated **°C/°F toggle** for the current dashboard temperature.

### **4. Hourly Forecast Timeline**

* **3-Hour Predictions**: Shows weather updates at **3-hour intervals** using forecast API data.

* **Horizontal Timeline**: Forecast cards are displayed in a **scrollable horizontal layout** for quick navigation.

* **Forecast Cards**: Each card displays **Time, Temperature, Weather Condition, Icon, and Wind Speed**.

* **Visual Indicators**:  
  * Weather **icons** for quick condition recognition.  
  * **Dynamic temperature colors** based on heat intensity.

* **Responsive Design**:  
  * **Mobile**: Compact cards with swipe scrolling.  
  * **Tablet/Desktop**: Slightly larger cards with better spacing and **scroll buttons**.

* **Interactive Controls**:  
  * **View Hourly Forecast** button to open the section.  
  * **Close button** to hide the forecast panel.


### **5. Error Handling & Validation**

* **Custom Notifications**: Replaces standard JavaScript `alert()` with polished, UI-friendly message boxes for API errors or empty queries.  
* **Extreme Weather Alerts**: Built-in logic to trigger custom alerts when temperatures exceed **40°C**.  
* **Input Validation**: Prevents invalid API calls by validating user input before sending a request to the weather API.

### Input City Validation

* **Trim Spaces** - Removes extra spaces from the beginning and end of the city name.

* **Empty Input Check** - Prevents search if the input field is empty.

* **Minimum Length Validation** - Ensures the city name contains at least **2 characters**.

* **Allowed Characters** - Allows only **letters, spaces, and hyphens** in the city name.

* **Multiple Space Handling** - Replaces multiple spaces between words with a **single space**.

* **Store Current City** - Saves the current searched city for global use in the application.
---

### API Response Validation

* **City Not Found Handling** - Displays an error message when the API returns **404 (city not found)**.

*  **Weather Data Check** - Ensures the API response contains required weather data fields.

---

### User Experience Improvements

* **Disable Search Button** - Disables the search button while the API request is processing.

* **Re-enable Button** - Re-enables the search button after the request is completed.

* **Error Feedback** - Shows a clear error message if weather data cannot be fetched.


## **Overall Layout Structure**
Page Layout

        Weather Dashboard
        │
        ├── Header
        │
        ├── Search Section
        │
        ├── Alert Notification
        │
        ├── Weather Filters
        │
        ├── Current Weather Section
        │    ├── Weather Summary
        │    └── Weather Metrics
        │
        ├── Hourly Forecast Toggle
        │
        ├── Hourly Forecast Section
        │
        └── Five Day Forecast Section
---

## 🛠️ Tech Stack
* **Markup**: HTML5
* **Styling**: Tailwind CSS and CSS
* **Logic**: JavaScript 
* **Version Control**: Git and Github

## Tailwind Build

    npx @tailwindcss/cli -i input.css -o output.css --watch
---

## 📂 Project Structure
* `index.html`: Primary application entry point.
* `input.css`: Tailwind source styles.
* `output.css`: Compiled Tailwind utility classes.
* `index-org.js`: Core logic, API integration, and DOM manipulation.
* `README.md`: Project documentation and setup instructions.

---

## ⚙️ Installation & Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nihal-patidar/Weather_App_Project.git

2. **Navigate to Project Directory:**

    ```
    cd Weather_App_Project

3. **Open in browser**

    * Double on index.html which will open html file in browser.





## **Learning Outcomes**

This project demonstrates:

* JavaScript DOM manipulation

* API integration for real-time weather data

* Use of browser Geolocation API

* Responsive UI design using Tailwind CSS

* Dynamic UI updates based on API responses

* Implementation of interactive web components



## **Screenshots of Work**
### **Home Screen (Current Location Weather)**

* Displays the current weather of the user's detected location.
![Home Screen](screenshots/ss5.png)


### **Skeleton Loading UI**
* Displays the loading skeleton until data loaded.
![Skeleton Loader](screenshots/ss2.png)


### **City Weather Search**

* Users can search weather details for any city.
![City Search](screenshots/ss12.png)


### **Temperature Alert and Alert Message**
* Users will be notified if temperature goes above 40 C.
![Temperature Alert](screenshots/ss3.png)

### Five-Day Weather Forecast

* Displays weather forecast including temperature, humidity and wind speed.

![5 Day Forecasts](screenshots/ss1.png)


### Tablet View (Medium Screen)

* Demonstrates the responsive layout of the dashboard on medium-sized screens such as tablets and small laptop

![Medium Screens](screenshots/ss8.png);


### Mobile View (iPhone SE)

* Illustrates the responsive design of the application on small mobile devices ensuring usability and readability.

![Mobile Sizes](screenshots/ss10.png);