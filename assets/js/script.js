let date = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[date.getMonth()];

let today = day[date.getDay()];
let theDateToday = date.getDate();
let fullDate = today + ", " + month + " " + theDateToday;
document.querySelector("#today").innerHTML =
  fullDate + ", " + date.getFullYear();

fetch(
  "http://api.openweathermap.org/data/2.5/forecast?q=provo&appid=c00b8fb0955a6e9162d19f1ee38b92e1"
)
  .then((response) => response.json())
  .then((data) => {
    // CREATING ELEMENTS
    let threshold = 0;
    for (let i = 0; i < 5; ++i) {
      let day = document.createElement("div");
      day.setAttribute("id", "day" + i);
      day.setAttribute("class", "day");

      //WEEKDAY
      let weekday = document.createElement("div");
      weekday.setAttribute("class", "weekday");
      console.log(day[date.getDay()]);
      weekday.innerHTML = day[date.getDay()];

      let weather = document.createElement("div");
      weather.setAttribute("class", "weather");
      let w6 = document.createElement("div");
      let w12 = document.createElement("div");
      let w18 = document.createElement("div");
      // DISPLAY WEATHER
      for (let k = threshold; k < threshold + 8; ++k) {
        let n = data.list[k].dt_txt;
        console.log(n);
        if (n.includes("06:00:00") === true) {
          data.list[k].main.temp;
          w6.innerHTML =
            "6:00AM : " +
            ((data.list[k].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) +
            " °F";
          console.log(data.list[k].main.temp);
          console.log(w12 + " yo");
        }
        if (n.includes("12:00:00") === true) {
          data.list[k].main.temp;
          w12.innerHTML =
            "12:00PM : " +
            ((data.list[k].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) +
            " °F";
          console.log(data.list[k].main.temp);
          console.log(w12 + " yo");
        }
        if (n.includes("18:00:00") === true) {
          data.list[k].main.temp;
          w18.innerHTML =
            "6:00PM : " +
            ((data.list[k].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) +
            " °F";
          console.log(data.list[k].main.temp);
          console.log(w12 + " yo");
        }
      }
      threshold = threshold + 8;
      weather.appendChild(w6);
      weather.appendChild(w12);
      weather.appendChild(w18);
      day.appendChild(weekday);
      day.appendChild(weather);
      document.querySelector("#daysEach").appendChild(day);
    }

    document.querySelector("#title").innerHTML = data.city.name;
    console.log(data);
  });
