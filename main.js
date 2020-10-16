let case_results = document.querySelector(".case-results");
let inputField = document.getElementById("submit-country");
const submit = document.getElementById("submit-button");

//const requestURL = `https://disease.sh/v3/covid-19/countries/Moldova?strict=true`;

//Makes a call to the API and retrieves information about a specific country
const getCases = async () => {
  let countrySubmitted = inputField.value;
  const URL = "https://disease.sh/v3/covid-19/countries/";
  const lastParams = "?strict=true";
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
  while (case_results.firstChild) {
    case_results.removeChild(case_results.firstChild);
  }
  //If the input value is empty then the function getCases() does not execute
  //Else the class gets added to the div and then removed after 1s and the function getCases() executes
  if (inputField.value === "") {
    case_results.innerHTML = "Try to enter a country!";
    return;
  } else {
    document.querySelector(".case-results").classList.toggle("fade-anim");
    document.querySelector(".spinner").classList.toggle("spinner-border");

    setTimeout(function () {
      document.querySelector(".case-results").classList.remove("fade-anim");
      document.querySelector(".spinner").classList.remove("spinner-border");
    }, 1000)
    
    getCases();
  }
}

submit.addEventListener("click", displayCases);

const renderResponse = (res) => {
  if (res != null) {
    case_results.innerHTML =
      `Cases in ${res.country}: ${res.cases}` +
      "<br>" +
      `Cases today: ${res.todayCases}` +
      "<br>" +
      `Recovered: ${res.recovered}` +
      "<br>" +
      `Active cases: ${res.active}` +
      "<br>" +
      `Deaths: ${res.deaths}`;

    document.querySelector(".spinner").classList.add("text-success");
    document.querySelector(".status").innerHTML = "Request successful!";
  } else {
    document.querySelector(".spinner").classList.add("text-danger");
    document.querySelector(".status").innerHTML = "Request failed!";
  }
};
