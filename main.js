let case_results = document.querySelector(".case-results");
let inputField = document.getElementById('submit-country');
const submit = document.getElementById("submit-button");


/*

Test to change text on hover, to be replaced with icons

function changeThing() {
  document.getElementById('list-item1').innerHTML = 'hduashdas';
}

function changeThingBack() {
  document.getElementById('list-item1').innerHTML = 'Home';
}


*/

//const requestURL = `https://disease.sh/v3/covid-19/countries/Moldova?strict=true`;

//Makes a call to the API and retrieves information about a specific country
const getCases = async () => {

let countrySubmitted = inputField.value;
const URL = 'https://disease.sh/v3/covid-19/countries/';
const lastParams = '?strict=true';
const endpoint = `${URL}${countrySubmitted}${lastParams}`;

  try {
    const response = await fetch(endpoint, { cache: "no-cache" });
    if (response.ok) {
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

//Clears the previous results in the div and displays new ones
function displayCases() {
  while(case_results.firstChild) {
    case_results.removeChild(case_results.firstChild)
  }
  getCases();
}

submit.addEventListener('click', displayCases);

const renderResponse = (res) => {
if (res != null) {
    case_results.innerHTML = 
    `Cases in ${res.country}: ${res.cases}` + '<br>' + `Cases today: ${res.todayCases}` + "<br>" 
    + `Recovered: ${res.recovered}` + "<br>" + `Active cases: ${res.active}` + "<br>" + `Deaths: ${res.deaths}`;
  } 
};