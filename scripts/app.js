import { APIKEY } from "./environment.js";
import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from "./localStorage.js";

let previousMinutes = -1;
let date = document.getElementById("date");
let time = document.getElementById("time");
const starBtn = document.getElementById("starBtn")
const favoritesBtn = document.getElementById("favoritesBtn")
const favoritesSection = document.getElementById("favoritesSection")

let currentTemp = document.getElementById("currentTemp");
let currentIcon = document.getElementById("currentIcon");
let currentCondition = document.getElementById("currentCondition");
let feelsLike = document.getElementById("feelsLike");
let todayHiLow = document.getElementById("todayHiLow");

let searchBar = document.getElementById("searchBar");

let todayIcon = document.getElementById("todayIcon");
let todayTemp = document.getElementById("todayTemp");

let day1Title = document.getElementById("day1Title");
let day2Title = document.getElementById("day2Title");
let day3Title = document.getElementById("day3Title");
let day4Title = document.getElementById("day4Title");

let day1Temp = document.getElementById("day1Temp");
let day1HighLow = document.getElementById("day1HighLow");
let day1Icon = document.getElementById("day1Icon");

let day2Temp = document.getElementById("day2Temp");
let day2HighLow = document.getElementById("day2HighLow");
let day2Icon = document.getElementById("day2Icon");

let day3Temp = document.getElementById("day3Temp");
let day3HighLow = document.getElementById("day3HighLow");
let day3Icon = document.getElementById("day3Icon");

let day4Temp = document.getElementById("day4Temp");
let day4HighLow = document.getElementById("day4HighLow");
let day4Icon = document.getElementById("day4Icon");

let sumDay1 = 0;
let sumDay2 = 0;
let sumDay3 = 0;
let sumDay4 = 0;

let tempsOfDay1 = [];
let tempsOfDay2 = [];
let tempsOfDay3 = [];
let tempsOfDay4 = [];

const searchBtn = document.getElementById("searchBtn");

async function updateClock() {
  const now = new Date();
  const year = now.getFullYear();
  let day = now.getDate();
  let today = now.getDay();
  let month = now.toLocaleString("default", { month: "short" });
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  day1Title.innerText = week[(today + 1) % 7];
  day2Title.innerText = week[(today + 2) % 7];
  day3Title.innerText = week[(today + 3) % 7];
  day4Title.innerText = week[(today + 4) % 7];

  const suffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  if (minutes !== previousMinutes) {
    date.innerText = `${month} ${day}${suffix(day)}, ${year}`;
    time.innerText = `${hours}:${minutes}${meridiem}`;

    previousMinutes = minutes;
  }
}

setInterval(updateClock, 1000);

async function asycnGetData(city) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`
  );
  const data = await promise.json();
  
  currentTemp.innerText = `${Math.round(data.main.temp)}°`;
  currentCondition.innerText = data.weather[0].main;
  feelsLike.innerText = `Feels Like: ${Math.round(data.main.feels_like)}`;
  todayHiLow.innerText = `${Math.round(data.main.temp_max)}° / ${Math.round(
    data.main.temp_min
  )}°`;
  currentIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
  todayIcon.innerHTML = currentIcon.innerHTML;
  todayTemp.innerText = currentTemp.innerText;
}
starBtn.addEventListener("click",function(){
  let location = searchBar.value;
  saveToLocalStorageByName(location); 
});

async function asycnGetForecast(city) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q= ${city} &appid=${APIKEY}&units=imperial`
  );
  const data = await promise.json();
  sumDay1 = 0;
  sumDay2 = 0;
  sumDay3 = 0;
  sumDay4 = 0;

  for (let i = 0; i < 8; i++) {
    sumDay1 += data.list[i].main.temp;
    tempsOfDay1.push(data.list[i].main.temp);
  }
  const averageDay1 = sumDay1 / 8;
  day1Temp.innerText = `${Math.round(averageDay1)}°`;
  // Jacob and w3 schools helped me with this I wanted to try something new
  day1HighLow.innerText = `${Math.round(
    Math.max(...tempsOfDay1)
  )}°F / ${Math.round(Math.min(...tempsOfDay1))}°F`;

  day1Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png" alt="${data.list[4].weather[0].description}">`;
  day2Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[12].weather[0].icon}@2x.png" alt="${data.list[12].weather[0].description}">`;
  day3Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[20].weather[0].icon}@2x.png" alt="${data.list[20].weather[0].description}">`;
  day4Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[28].weather[0].icon}@2x.png" alt="${data.list[28].weather[0].description}">`;

  for (let i = 9; i < 16; i++) {
    sumDay2 += data.list[i].main.temp;
    tempsOfDay2.push(data.list[i].main.temp);
  }
  const averageDay2 = sumDay2 / 8;
  day2Temp.innerText = `${Math.round(averageDay2)}°`;
  // Jacob and w3 schools helped me with this I wanted to try something new
  day2HighLow.innerText = `${Math.round(
    Math.max(...tempsOfDay2)
  )}°F / ${Math.round(Math.min(...tempsOfDay2))}°F`;

  for (let i = 17; i < 24; i++) {
    sumDay3 += data.list[i].main.temp;
    tempsOfDay3.push(data.list[i].main.temp);
  }
  const averageDay3 = sumDay3 / 8;
  day3Temp.innerText = `${Math.round(averageDay3)}°`;
  // Jacob and w3 schools helped me with this I wanted to try something new
  day3HighLow.innerText = `${Math.round(
    Math.max(...tempsOfDay3)
  )}°F / ${Math.round(Math.min(...tempsOfDay3))}°F`;

  for (let i = 25; i < 32; i++) {
    sumDay4 += data.list[i].main.temp;
    tempsOfDay4.push(data.list[i].main.temp);
  }
  const averageDay4 = sumDay4 / 8;
  day4Temp.innerText = `${Math.round(averageDay4)}°`;
  // Jacob and w3 schools helped me with this I wanted to try something new
  day4HighLow.innerText = `${Math.round(
    Math.max(...tempsOfDay4)
  )}°F / ${Math.round(Math.min(...tempsOfDay4))}°F`;
}

function getfavorites(){
  favoritesSection.innerHTML = "";
  let favoritesList= getLocalStorage();
  console.log(favoritesList);
 
  favoritesList.map(fav => {
    let option = document.createElement("p");
    option.innerText = fav;

    let deletebtn = document.createElement('button');
    deletebtn.type = 'button';
    deletebtn.className = "btn btn-danger mx-2";
    deletebtn.textContent = "Delete Name";

    
    deletebtn.addEventListener('click', function () {
        removeFromLocalStorage(names);
        p.remove(); 
    });

    option.addEventListener('click', function(){
      let location = option.innerText

  asycnGetData(location);
  asycnGetForecast(location);
     
    })
    favoritesSection.appendChild(option);
  })
}




favoritesBtn.addEventListener("click", function(){
getfavorites();
});

favoritesBtn.addEventListener("blur", function(){
  favoritesSection.innerHTML = ""
})


searchBtn.addEventListener("click", function () {
  let location = searchBar.value;

  asycnGetData(location);
  asycnGetForecast(location);
});
