import React from "react";
import { format } from "date-fns";
import WeatherIcon from "./WeatherIcon";
import { getTemp } from "../utils/unitConversion";

const DailyForecast = ({ data, unitSystem }) => {

    
    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-white">
                Daily forecast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {data.slice(0, 5).map((day, idx) => (
                    <div
                        key={idx}
                        className="bg-surface rounded-2xl p-4 flex flex-col items-center gap-3 border border-white/5 hover:border-primary/50 transition-all cursor-pointer shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                    >
                        <p className="text-gray-400 font-medium">
                            {format(new Date(day.dt * 1000), "EEE")}
                        </p>

                        <WeatherIcon
                            code={day.icon}
                            className="w-12 h-12 drop-shadow-md"
                        />

                        <p className="font-bold text-lg text-white">
                            {getTemp(day.temp_max, unitSystem.temp)}°
                            <span className="text-gray-500 text-base font-normal ml-2">
                                {getTemp(day.temp_min, unitSystem.temp)}°
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast;
