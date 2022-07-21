import { useState } from "react";
import { API_KEY_WEATHER_FORECAST, WEATHER_FORECAST } from "./api";
import "./App.css";
import Forecast from "./components/forecast/Forecast";
import Search from "./components/search/Search";
import Weather from "./components/weather/Weather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, long] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_FORECAST}/weather?lat=${lat}&lon=${long}&appid=${API_KEY_WEATHER_FORECAST}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_FORECAST}/forecast?lat=${lat}&lon=${long}&appid=${API_KEY_WEATHER_FORECAST}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResp = await response[0].json();
        const forecastResp = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResp });
        setForecast({ city: searchData.label, ...forecastResp });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(currentWeather, forecast);

  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Weather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
