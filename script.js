//When user submits their search parameters==Call API Convertor Endpoint 
//Remember this exchange rate is based on the EURO
var owmAPI = "c28e46e7238eee3fbb25d0a8265238ce";
var currentCity = "";
var lastCity = "";

// Error handler for fetch, trying to mimic the AJAX .fail command: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Function to get and display the current conditions on Open Weather Maps
var getCurrentConditions = (event) => {
    // Obtain city name from the search box
    let city = $('#search-city').val();
    currentCity= $('#search-city').val();
    // Set the queryURL to fetch from API using weather search - added units=imperial to fix
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
    fetch(queryURL)
    .then(handleErrors)
    .then((response) => {
        return response.json();
                
    })
    .then((response) => {
            //Variables
            var userDestination = document.getElementById('destination');
            var userBudget = document.getElementById('budget').value;
            var userCurrency = document.getElementById('user-currency').value;
            localStorage.setItem(userDestination,userBudget,userCurrency);
            //console.log(response);
            console.log(userCurrency);
            //specify Exchange API endpoint
            var countryCode = response.sys.country
            if (countryCode == "AL") {
                var destinationCurrency = "ALL"
            }else if (countryCode == "GB") {
                var destinationCurrency = "GBP"
            }else if (countryCode == "AM") {
                var destinationCurrency = "AMD"
            }else if (countryCode == "AZ") {
                var destinationCurrency = "AZN"
            }else if (countryCode == "BA") {
                var destinationCurrency = "BAM"
            }else if (countryCode == "BG") {
                var destinationCurrency = "BGN"
            }else if (countryCode == "BY") {
                var destinationCurrency = "BYN"        
            }else if (countryCode == "CH") {
                var destinationCurrency = "CHF"  
            }else if (countryCode == "CZ") {
                var destinationCurrency = "CZK"  
            }else if (countryCode == "DK") {
                var destinationCurrency = "DKK"  
            }else if (countryCode == "GE") {
                var destinationCurrency = "GEL"  
            }else if (countryCode == "HR") {
                var destinationCurrency = "HRK"  
            }else if (countryCode == "HU") {
                var destinationCurrency = "HUF"  
            }else if (countryCode == "IS") {
                var destinationCurrency = "ISK"  
            }else if (countryCode == "MD") {
                var destinationCurrency = "MDL"  
            }else if (countryCode == "MK") {
                var destinationCurrency = "MKD"  
            }else if (countryCode == "NO") {
                var destinationCurrency = "NOK"  
            }else if (countryCode == "AN") {
                var destinationCurrency = "ANG"  
            }else if (countryCode == "AO") {
                var destinationCurrency = "AOA"  
            }else if (countryCode == "AR") {
                var destinationCurrency = "ARS"  
            }else if (countryCode == "CX") {
                var destinationCurrency = "AUD"  
            }else if (countryCode == "CC") {
                var destinationCurrency = "AUD"
            }else if (countryCode == "HM") {
                var destinationCurrency = "AUD"  
            }else if (countryCode == "KI") {
                var destinationCurrency = "AUD"    
            }else if (countryCode == "NR") {
                var destinationCurrency = "AUD"
            }else if (countryCode == "NF") {
                var destinationCurrency = "AUD"
            }else if (countryCode == "TV") {
                var destinationCurrency = "AUD"
            }else if (countryCode == "AW") {
                var destinationCurrency = "AWG"
            }else if (countryCode == "BB") {
                var destinationCurrency = "BBD"
            }else if (countryCode == "BD") {
                var destinationCurrency = "BDT"
            }else if (countryCode == "BH") {
                var destinationCurrency = "BHD"  
            }else if (countryCode == "BI") {
                var destinationCurrency = "BIF"  
            }else if (countryCode == "BM") {
                var destinationCurrency = "BMD"  
            }else if (countryCode == "BN") {
                var destinationCurrency = "BND"  
            }else if (countryCode == "BO") {
                var destinationCurrency = "BOB"
            }else if (countryCode == "BR") {
                var destinationCurrency = "BRL"  
            }else if (countryCode == "BS") {
                var destinationCurrency = "BSD"    
            }else if (countryCode == "BT") {
                var destinationCurrency = "BTN"
            }else if (countryCode == "BW") {
                var destinationCurrency = "BWP"
            }else if (countryCode == "DZ") {
                var destinationCurrency = "DZD"
            }else if (countryCode == "AF") {
                var destinationCurrency = "AFN"
            }else if (countryCode == "AS") {
                var destinationCurrency = "USD"
            }else if (countryCode == "AU") {
                var destinationCurrency = "AUD"
            }else var destinationCurrency = "EUR";
            console.log(destinationCurrency);
                var requestUrl = `https://api.exchangerate.host/convert?&from=${userCurrency}&to=${destinationCurrency}&amount=${userBudget}`;
                fetch(requestUrl)
                .then(handleErrors)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    var conversionResult = Math.round(response.result)
                    console.log(conversionResult);
                    var conversionHTML = 
                    `<h4>You'll have ${conversionResult} ${destinationCurrency} for your trip to ${city}</h4>`
                    $('#budget-conversion').html(conversionHTML);
                }
            )
                
      // Save city to local storage
        saveCity(city);
        $('#search-error').text("");
        //console.log(response);
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
        
        // HTML for the results of search
        let currentWeatherHTML = `
            <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></h3>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} mph</li>
            </ul>`;
        // Append the results to the DOM
        $('#current-weather').html(currentWeatherHTML);
    })
}

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
        <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
        // Loop over the 5 day forecast and build the template HTML using UTC offset and Open Weather Map icon
        for (let i = 0; i < response.list.length; i++) {
            let dayData = response.list[i];
            let dayTimeUTC = dayData.dt;
            let timeZoneOffset = response.city.timezone;
            let timeZoneOffsetHours = timeZoneOffset / 60 / 60;
            let thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);
            let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
            // Only displaying mid-day forecasts
            if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                fiveDayForecastHTML += `
                <div class="weather-card card m-2 p0">
                    <ul class="list-unstyled p-3">
                        <li>${thisMoment.format("MM/DD/YY")}</li>
                        <li class="weather-icon"><img src="${iconURL}"></li>
                        <li>Temp: ${dayData.main.temp}&#8457;</li>
                        <br>
                        <li>Humidity: ${dayData.main.humidity}%</li>
                    </ul>
                </div>`;
            }
        }
        // Build the HTML template
        fiveDayForecastHTML += `</div>`;
        // Append the five-day forecast to the DOM
        $('#five-day-forecast').html(fiveDayForecastHTML);
    })
}

// Function to save the city to localStorage
var saveCity = (newCity) => {
    let cityExists = false;
    // Check if City exists in local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] === newCity) {
            cityExists = true;
            break;
        }
    }
    // Save to localStorage if city is new
    if (cityExists === false) {
        localStorage.setItem('cities' + localStorage.length, newCity);
    }
}

// Render the list of searched cities
var renderCities = () => {
    $('#city-results').empty();
    // If localStorage is empty
    if (localStorage.length===0){
        if (lastCity){
            $('#search-city').attr("value", lastCity);
        } else {
            $('#search-city').attr("value", "New York City");
        }
    } else {
        // Build key of last city written to localStorage
        let lastCityKey="cities"+(localStorage.length-1);
        lastCity=localStorage.getItem(lastCityKey);
        // Set search input to last city searched
        $('#search-city').attr("value", lastCity);
        // Append stored cities to page
        for (let i = 0; i < localStorage.length; i++) {
            let city = localStorage.getItem("cities" + i);
            let cityEl;
            // Set to lastCity if currentCity not set
            if (currentCity===""){
                currentCity=lastCity;
            }
            // Set button class to active for currentCity
            
            // Append city to page
            $('#city-results').prepend(cityEl);
        }
        // Add a "clear" button to page if there is a cities list
        
    }
    
}

// New city search button event listener
$('#search-button').on("click", (event) => {
event.preventDefault();
currentCity = $('#search-city').val();
getCurrentConditions(event);
});

// Old searched cities buttons event listener
$('#city-results').on("click", (event) => {
    event.preventDefault();
    $('#search-city').val(event.target.textContent);
    currentCity=$('#search-city').val();
    getCurrentConditions(event);
});

// Clear old searched cities from localStorage event listener
$("#clear-storage").on("click", (event) => {
    localStorage.clear();
    renderCities();
});

// Render the searched cities
renderCities();

// Get the current conditions (which also calls the five day forecast)
getCurrentConditions();

// convert user budget in usercurrency to destination currency
//convertBudget();

// append results of the convert budget to the HTML 
//displayBudget();