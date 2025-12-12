import React from "react";
import { format } from "date-fns";
import WeatherIcon from "./WeatherIcon";
import { getTemp } from "../utils/unitConversion";
import { bgToday } from "../assets/images";

const CurrentWeather = ({ data, unitSystem }) => {
    const displayTemp = getTemp(data.temp, unitSystem.temp);

    return (
        <div
            className="rounded-[30px] p-8 md:p-10 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-2xl min-h-[280px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgToday})` }}
        >
            <div className="z-10 text-center md:text-left">
                <h2 className="text-4xl font-bold text-white mb-2">
                    {data.name}, {data.country}
                </h2>
                <p className="text-blue-100 text-lg mb-4">
                    {format(new Date(), "EEEE, MMM d, yyyy")}
                </p>
                <div className="inline-block">
                    <p className="text-blue-200 text-base capitalize font-semibold px-4 py-1.5 bg-black/20 rounded-full backdrop-blur-md">
                        {data.description}
                    </p>
                </div>
            </div>

            <div className="z-10 flex flex-col items-center md:flex-row gap-6 mt-6 md:mt-0">
                <div className="text-8xl font-bold flex items-start text-white tracking-tighter drop-shadow-lg">
                    {displayTemp}
                    <span className="text-5xl mt-3 font-normal text-blue-200">
                        °
                    </span>
                </div>
                <WeatherIcon
                    code={data.icon}
                    className="w-36 h-36 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] filter"
                />
            </div>
        </div>
    );
};

export default CurrentWeather;
