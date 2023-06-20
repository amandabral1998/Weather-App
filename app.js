const apiKey = "348ec1002b4610216e96f224bd1dc416";

const weatherData = document.querySelector(".weather-data");

const form = document.querySelector("form");

const cityInput = document.getElementById("input-city");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  getWeather(city);
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network is not Responding");
    }

    const data = await response.json();


    const temp = Math.round(data.main.temp)

    const icon = data.weather[0].icon

    const desc = data.weather[0].description

    const details = [
        `Feels like  ${Math.round(data.main.feels_like)}°C`,
        `Humidity ${data.main.humidity}`,
        `Wind Speed at ${data.wind.speed} m/s`
    ]


    
weatherData.querySelector('.icon').innerHTML= `<img src= "https://openweathermap.org/img/wn/${icon}.png" </img>`;

weatherData.querySelector('.description').innerHTML= desc;

weatherData.querySelector('.temperature').innerHTML = temp;

weatherData.querySelector('.details').innerHTML = details.map((details)=>{
    return ` <div class="det">${details}</div>`
}).join('')

  } catch (error) {
    weatherData.querySelector('.description').innerHTML= "Something went Wrong. Try Again! ";

weatherData.querySelector('.temperature').innerHTML = "";

weatherData.querySelector('.details').innerHTML = ""
  }
}
