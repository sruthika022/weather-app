document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '65925f608da2f6292fac940c8ad31ddf'; 
    const weatherButton = document.getElementById('get-weather-btn');
  
    weatherButton.addEventListener('click', function() {
      const city = document.getElementById('city-input').value;
      if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            if (data.cod === "404") {
              displayError("City not found. Please enter a valid city name.");
            } else {
              console.log(data);
              displayWeather(data);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            displayError("An error occurred while fetching data. Please try again later.");
          });
      } else {
        displayError('Please enter a city name');
      }
    });
  });
  
  function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp} °F</p>
      <p>Description: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity} %</p>
      <p>Pressure: ${data.main.pressure} pascals</p>
    `;
  }
  
  function displayError(message) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = '';
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.textContent = message;
    weatherInfo.appendChild(errorMessage);
  }
  