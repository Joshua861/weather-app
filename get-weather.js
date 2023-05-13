const main = document.getElementById('main');
function show(what) {
    main.innerHTML = what;
}
function getWeather(apiKey, latitude, longitude) {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const queryParams = new URLSearchParams({
      lat: latitude,
      lon: longitude,
      appid: apiKey,
      units: 'metric' // You can change the units to 'imperial' for Fahrenheit
    });
  
    const url = `${baseUrl}?${queryParams.toString()}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.cod !== '404') {
          const temperature = data.main && data.main.temp;
          const description = data.weather && data.weather[0].description;
  
          if (temperature && description) {
            show(`Weather at your location: ${description}`);
            show(`Temperature: ${temperature}°C`);
          } else {
            show('Weather data not available for your location.');
          }
        } else {
          show('Weather data not available for your location.');
        }
      })
      .catch(error => {
        show('An error occurred: ' + error.message);
      });
  }
  
  const apiKey = '';
  const latitude = 37.7749; // Specify latitude for a known location
  const longitude = -122.4194; // Specify longitude for a known location
  getWeather(apiKey, latitude, longitude);
  