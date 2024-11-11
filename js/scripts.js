console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})   

async function fetchWeather(){
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = 'Nairobi';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
     try {
        const response = await fetch(url);
        const weatherData = await response.json();
        console.log(weatherData);
        displayWeather(weatherData);
     } catch(error){
        console.error('There was an error!', error);
     }
}
fetchWeather();

function displayWeather(weatherData) {
    const newImg = document.createElement('img');
    newImg.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    document.querySelector('#weather-icon').appendChild(newImg);
    // Convert temperature to Celsius
    const tempCelsius = ((weatherData.main.temp - 32) * 5/9).toFixed(1);
    document.querySelector('#weather-temp').textContent = `${tempCelsius}\u00B0C`;
    const weatherDescription = document.createTextNode(weatherData.weather[0].description);
    document.querySelector('#weather-description').appendChild(weatherDescription);

}