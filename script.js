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
//Variables
var requestUrl = 'https://api.exchangerate.host/convert?from=EUR&to=GBP';
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //console.log('Github Repo Issues \n----------');
    console.log(data);
    }
  );

//When user submits their search parameters==Call API Convertor Endpoint 
//Remember this exchange rate is based on the EURO
/* $('#search-btn').click(function(){


function currencyConvertor() {
  var response = request.response;
  var userDestination = document.getElementById('#destination');
  var userBudget = document.getElementById('#budget');
  var userCurrency = document.getElementById('#user-currency');
  localStorage.setItem(userDestination,userBudget,userCurrency);
  console.log(response);
}
currencyConvertor();
}) */
