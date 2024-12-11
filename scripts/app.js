import { APIKEY } from "./environment.js";
let previousMinutes = -1;
let date = document.getElementById("date");
let time = document.getElementById("time");
let currentTemp = document.getElementById("currentTemp")
let searchBar = document.getElementById("searchBar")

const dontClick = document.getElementById("dontClick")

function updateClock() {
  const now = new Date();
  const year = now.getFullYear();
  let day = now.getDate();
  let month = now.toLocaleString("default", { month: "short" });
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

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

    console.log(` ${month}/${day}/${year} ${hours}:${minutes}.`);
    previousMinutes = minutes;
  }
}
setInterval(updateClock, 1000);


async function asycnGetData(city){
  const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`);
  const data= await promise.json();
 currentTemp.innerText = data.main.temp 

  console.log(data);
  console.log(city);
}


async function asycnGetData2(){
  const promise2 = await fetch("");
  const data2 = await promise2.json();
  console.log(data2);
}



dontClick.addEventListener("click", function() {
  let location = searchBar.value
  asycnGetData(location);
  
  console.log(currentTemp);
});