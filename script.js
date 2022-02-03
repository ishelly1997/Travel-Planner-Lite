//Call to Exchange rate API on load
var storage = window.localStorage
var apiURL = 'https://api.exchangerate.host/latest';
var request = new XMLHttpRequest();
request.open('GET', apiURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response);
}

//When user submits their search parameters==Call API Convertor Endpoint 
//Remember this exchange rate is based on the EURO
 $('#search-btn').click(function(){


function currencyConvertor() {

}
currencyConvertor();
}) 

// Set global vars, including Open Weather Maps API Key
var owmAPI = "c83f688a772596959b4e8bfb3bbbe2d7";
var currentCity = "";

// Function to display the current conditions on Open Weather Maps
var getCurrentConditions = (event) => {
    // Obtain city name from the search box
    let city = $('#search-city').val();
    currentCity= $('#search-city').val();
    // Set the queryURL to fetch from API using weather search
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
    fetch(queryURL)
    .then(handleErrors)
    .then((response) => {
        return response.json();
        
    })

        // Create icon for the current weather using Open Weather Maps
        let currentWeatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        // Offset UTC timezone - using moment.js
        let currentTimeUTC = response.dt;
        let currentTimeZoneOffset = response.timezone;
        let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
        let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);
        // Render cities list
        renderCities();
        // Obtain the 5day forecast for the searched city
        getFiveDayForecast(event);
        // Set the header text to the found city name
        $('#header-text').text(response.name);
        // HTML for the results of search
        let currentWeatherHTML = `
            <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></h3>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} mph</li>
                <li id="uvIndex">UV Index:</li>
            </ul>`;
        // Append the results to the DOM
        $('#current-weather').html(currentWeatherHTML);
        // Get the latitude and longitude for the UV search from Open Weather Maps API
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        let uvQueryURL = "api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&APPID=" + owmAPI;
        // API solution for Cross-origin resource sharing (CORS) error: https://cors-anywhere.herokuapp.com/
        uvQueryURL = "https://cors-anywhere.herokuapp.com/" + uvQueryURL;
        //Variables
      var response = request.response;
      var userDestination = document.getElementById('#destination');
      var userBudget = document.getElementById('#budget').value;
      var userCurrency = document.getElementById('#user-currency').child.value;
      var destinationCurrency = document.getElementsByClassName('form-control');
      localStorage.setItem(userDestination,userBudget,userCurrency, destinationCurrency);
      console.log(response);
      //Call Exchange API endpoint convert
      var requestUrl = `https://api.exchangerate.host/convert?from=${userCurrency}&to=${response.country}`;
        fetch(requestUrl)
          .then(function (response) {
      return response.json();
    }).then(function (data) {
        //console.log(data);
        function convert(){
          var startRate = currency.rates[response]

        }
        function displayCurrency(currency) {

          //var finalAmount = document.getElementById
        }
    }
  );
        };

// Function to obtain the five day forecast and display to HTML
var getFiveDayForecast = (event) => {
    let city = $('#search-city').val();
    // Set up URL for API search using forecast search
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
    // Fetch from API
    fetch(queryURL)
        .then (handleErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
        // HTML template
        let fiveDayForecastHTML = `
        <h2>5-Day Forecast:</h2>
        <div id="content" class="d-inline-flex flex-wrap ">`
      })}
