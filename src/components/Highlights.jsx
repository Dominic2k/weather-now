import React from "react";
import { Wind, Droplets, Thermometer, CloudRain } from "lucide-react";
import {
    getTemp,
    getWindSpeed,
    getPrecipitation,
} from "../utils/unitConversion";

const HighlightCard = ({ title, value, icon }) => (
    <div className="bg-surface p-6 rounded-[24px] flex flex-col justify-between h-[160px] hover:bg-surface/80 transition-colors border border-white/5 shadow-lg">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-[#141C27] rounded-full text-gray-300">
                {" "}
                {icon}
            </div>
            <span className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                {title}
            </span>
        </div>
        <div className="text-4xl font-bold text-white mb-2">{value}</div>
    </div>
);

const Highlights = ({ data, unitSystem }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <HighlightCard
                title="Feels Like"
                value={`${getTemp(data.feels_like, unitSystem.temp)}°`}
                icon={<Thermometer className="w-5 h-5" />}
            />
            <HighlightCard
                title="Humidity"
                value={`${data.humidity}%`}
                icon={<Droplets className="w-5 h-5" />}
            />
            <HighlightCard
                title="Wind"
                value={`${getWindSpeed(data.wind, unitSystem.wind)} ${
                    unitSystem.wind === "kmh" ? "km/h" : "mph"
                }`}
                icon={<Wind className="w-5 h-5" />}
            />
            <HighlightCard
                title="Precipitation"
                value={`${getPrecipitation(data.rain, unitSystem.rain)} ${
                    unitSystem.rain === "mm" ? "mm" : "in"
                }`}
                icon={<CloudRain className="w-5 h-5" />}
            />
        </div>
    );
};

export default Highlights;
