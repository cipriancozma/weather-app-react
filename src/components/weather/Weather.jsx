import "./Weather.css";

const Weather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data?.city}</p>
          <p className="description">{data?.weather[0]?.description}</p>
        </div>
      </div>
      <img
        alt="weather"
        className="weather-icon"
        src={`icons/${data?.weather[0]?.icon}.png`}
      />
      <div className="bottom">
        <p className="temperature">{Math.round(data?.main?.temp)} °C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">
              Feels Like {Math.round(data?.main?.feels_like)} °C
            </span>
            {/* <span className="parameter-value"></span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
