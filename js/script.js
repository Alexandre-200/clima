//Variaveis e selecao de elementos
const apiKey = "593721ef4be6b3c876c7006d36a94550";
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperatura span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");


const toggleLoader = () => {
  loader.classList.toggle("hide");
};

//funcoes
const getWeatherData = async (city) => {
    toggleLoader();
  const apiWwathrURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWwathrURL);
  const data = await res.json();

  toggleLoader();
  return data;
};



const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  if (data.cod === "404") {
    weatherContainer.classList.add("hide");
    errorMessageContainer.classList.remove("hide");
    return;
  }
  errorMessageContainer.classList.add("hide");
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country + ".png");
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed} km/h`;
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");
};

//eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault;

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
