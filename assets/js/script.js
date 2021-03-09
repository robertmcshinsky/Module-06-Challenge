let date = new Date();
let days = [
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

let today = days[date.getDay()];
let theDateToday = date.getDate();
let fullDate = today + ", " + month + " " + theDateToday;
document.querySelector("#today").innerHTML =
  fullDate + ", " + date.getFullYear();

// LOCATION ASKING

let city;

document.querySelector("#button").addEventListener("click", function () {
  city = document.querySelector("#input").value;
  let recentSearch = document.createElement("div");
  recentSearch.setAttribute("id", city);
  recentSearch.setAttribute("class", "recentSearch");
  recentSearch.innerHTML = city;
  document.querySelector("#searchHistory").appendChild(recentSearch);

  document
    .querySelector(".recentSearch")
    .addEventListener("click", function () {
      console.log(this.innerHTML);

      document.querySelector("#input").innerHTML = this.innerHTML;
    });

  document.querySelector("#current").innerHTML = "";
  document.querySelector("#input").innerHTML = "";
  document.querySelector("#daysEach").innerHTML = "";
  // GET CURRENT WEATHER
  //

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=c00b8fb0955a6e9162d19f1ee38b92e1"
  )
    .then((response) => response.json())
    .then((data) => {
      let lattitude = data.coord.lat;
      let longitude = data.coord.lon;

      fetch(
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          lattitude +
          "&lon=" +
          longitude +
          "&appid=c00b8fb0955a6e9162d19f1ee38b92e1"
      )
        .then((something) => something.json())
        .then((data) => {
          // UV INDEX
          let uvIndex = document.createElement("div");
          uvIndex.setAttribute("id", "uvIndex");
          uvIndex.setAttribute("class", "uvIndex");
          if (data.value <= 2) {
            uvIndex.style.color = "green";
          } else if (data.value <= 5) {
            uvIndex.style.color = "yellow";
          } else if (data.value <= 7) {
            uvIndex.style.color = "orange";
          } else if (data.value <= 10) {
            uvIndex.style.color = "red";
          } else {
            uvIndex.style.color = "violet";
          }
          uvIndex.innerHTML = "UV Index: " + data.value;

          document.querySelector("#current").appendChild(uvIndex);
        });

      // TODAYS WEATHER
      let weatherToday = document.createElement("div");
      weatherToday.setAttribute("id", "weatherToday");
      weatherToday.setAttribute("class", "weatherToday");
      weatherToday.innerHTML =
        "Temperature: " +
        ((data.main.temp - 273.15) * (9 / 5) + 32).toFixed(2) +
        " °F";

      // ICON
      let todayIcon = document.createElement("img");
      todayIcon.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      todayIcon.setAttribute("id", "imgWeather");

      // HUMIDITY
      let todayHumidity = document.createElement("div");
      todayHumidity.setAttribute("id", "todayHumidity");
      todayHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";

      // WIND
      let windy = document.createElement("div");
      windy.setAttribute("id", "windy");
      windy.setAttribute("class", "windy");
      windy.innerHTML = "Wind: " + data.wind.speed + " MPH";

      document.querySelector("#current").appendChild(windy);
      document.querySelector("#current").appendChild(todayHumidity);
      document.querySelector("#current").appendChild(todayIcon);
      document.querySelector("#current").appendChild(weatherToday);
    });

  //
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=c00b8fb0955a6e9162d19f1ee38b92e1"
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
        weekday.innerHTML = days[date.getDay() + i + 1];

        // ICONS
        let weatherImg = document.createElement("img");
        weatherImg.setAttribute("class", "imgForWeather");

        // WEATHER DIV
        let weather = document.createElement("div");
        weather.setAttribute("class", "weather");
        let w6 = document.createElement("div");
        let w12 = document.createElement("div");
        let w18 = document.createElement("div");
        let humidity = document.createElement("div");
        let wind = document.createElement("div");
        // DISPLAY WEATHER
        for (let k = threshold; k < threshold + 8; ++k) {
          let n = data.list[k].dt_txt;

          // TIMES AND THEIR WEATHER
          if (n.includes("06:00:00") === true) {
            data.list[k].main.temp;
            w6.innerHTML =
              "6:00AM : " +
              ((data.list[k].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) +
              " °F";
          }
          if (n.includes("12:00:00") === true) {
            data.list[k].main.temp;
            w12.innerHTML =
              "12:00PM : " +
              ((data.list[k].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) +
              " °F";
            weatherImg.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" +
                data.list[k].weather[0].icon +
                "@2x.png"
            );
            humidity.innerHTML =
              "Humidity: " + data.list[k].main.humidity + "%";
            wind.innerHTML = "Wind: " + data.list[k].wind.speed + " MPH";
          }
          if (n.includes("18:00:00") === true) {
            data.list[k].main.temp;
            w18.innerHTML =
              "6:00PM : " +
              ((data.list[k].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) +
              " °F";
          }
        }
        threshold = threshold + 8;

        // CREATING THE DIV's ON THE HTML
        weather.appendChild(w6);
        weather.appendChild(w12);
        weather.appendChild(w18);
        weather.appendChild(humidity);
        weather.appendChild(wind);
        day.appendChild(weekday);
        day.appendChild(weatherImg);
        day.appendChild(weather);
        document.querySelector("#daysEach").appendChild(day);
      }

      document.querySelector("#title").innerHTML = data.city.name;
    });
});
