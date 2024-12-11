import { APIKEY } from "./environment.js";
let previousMinutes = -1;
let date = document.getElementById("date");
let time = document.getElementById("time");
let currentTemp = document.getElementById("currentTemp");
let currentIcon = document.getElementById("currentIcon");
let currentCondition = document.getElementById("currentCondition");
let feelsLike = document.getElementById("feelsLike");
let searchBar = document.getElementById("searchBar");

let day0Title = document.getElementById("day0Title");
let day1Title = document.getElementById("day1Title");
let day2Title = document.getElementById("day2Title");
let day3Title = document.getElementById("day3Title");
let day4Title = document.getElementById("day4Title");



const dontClick = document.getElementById("dontClick");

function updateClock() {
  const now = new Date();
  const year = now.getFullYear();
  let day = now.getDate();
  let today = now.getDay();
  let month = now.toLocaleString("default", { month: "short" });
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  switch (today) {
    case 0:
      
      day0Title.innerText = "Monday" ;
      day1Title.innerText = "Tuesday";
      day2Title.innerText = "Wednesday";
      day3Title.innerText = "Thursday";
      day4Title.innerText =  "Friday";

     break; 

    case 1:
      
      day0Title.innerText = "Tuesday";
      day1Title.innerText = "Wednesday";
      day2Title.innerText = "Thursday";
      day3Title.innerText = "Friday";
      day4Title.innerText = "Saturday";

     break; 
     
      
      
    case 2:
      
      day0Title.innerText = "Wednesday";
      day1Title.innerText = "Thursday";
      day2Title.innerText = "Friday";
      day3Title.innerText = "Saturday";
      day4Title.innerText = "Sunday";

     break; 
     
     
    case 3:
      
      day0Title.innerText = "Thursday";
      day1Title.innerText = "Friday";
      day2Title.innerText = "Saturday";
      day3Title.innerText = "Sunday";
      day4Title.innerText = "Monday" ;

     break; 
     
      
    case 4:
      
      day0Title.innerText = "Friday";
      day1Title.innerText = "Saturday";
      day2Title.innerText = "Sunday";
      day3Title.innerText = "Monday" ;
      day4Title.innerText = "Tuesday";

     break; 
     
      
    case 5:
      
      day0Title.innerText = "Saturday";
      day1Title.innerText = "Sunday";
      day2Title.innerText = "Monday" ;
      day3Title.innerText = "Tuesday";
      day4Title.innerText = "Wednesday";

     break; 
     
      
    default:
      
      day0Title.innerText = "Sunday";
      day1Title.innerText = "Monday" ;
      day2Title.innerText = "Tuesday";
      day3Title.innerText = "Wednesday";
      day4Title.innerText = "Thursday";

     break; 
     
      
  };
  

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
  currentTemp.innerText = Math.round(data.main.temp);
  currentCondition.innerText = data.weather[0].main;
  currentIcon.innerHTML = data.weather[0].icon;
  feelsLike.innerText = `Feels Like: ${ Math.round(data.main.feels_like)}`;
  console.log(data);
  console.log(city);
}

async function asycnGetData2() {
  const promise2 = await fetch("");
  const data2 = await promise2.json();
  console.log(data2);
}

dontClick.addEventListener("click", function () {
  let location = searchBar.value;
  asycnGetData(location);

  console.log(currentTemp);
});
