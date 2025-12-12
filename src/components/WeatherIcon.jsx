import React from "react";

const WeatherIcon = ({ code, className }) => {
    return (
        <img
            src={`https://openweathermap.org/img/wn/${code}@2x.png`}
            alt="weather icon"
            className={className}
        />
    );
};

export default WeatherIcon;
