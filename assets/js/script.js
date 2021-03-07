fetch(
  "http://api.openweathermap.org/data/2.5/forecast?q=provo&appid=36ec97bf168bda4c65c55c61a438df7f"
)
  .then((response) => response.json())
  .then((data) => {
    let name = data.city.name;
    let temp = data.list[0].main.temp;
    document.querySelector("#body").innerHTML = name + " " + temp;

    console.log(data);
  });
