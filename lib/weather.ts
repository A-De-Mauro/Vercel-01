const LAT = '52.3738'
const LONG = '4.8910'

const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LONG}&hourly=temperature_2m,apparent_temperature&current_weather=true`;

export async function getWeather(){
    const res = await fetch(weatherApi);
    const weather = await res.json();
    return weather.current_weather;
}
