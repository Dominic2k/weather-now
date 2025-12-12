import React, { useState, useEffect, useRef } from "react";
import { format, isSameDay } from "date-fns";
import { ChevronDown } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { getTemp } from "../utils/unitConversion";

const HourlyForecast = ({ data, unitSystem }) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const uniqueDays = [];
    const seenDates = new Set();
    data.forEach((item) => {
        const dateStr = format(new Date(item.dt * 1000), "yyyy-MM-dd");
        if (!seenDates.has(dateStr)) {
            seenDates.add(dateStr);
            uniqueDays.push(item.dt);
        }
    });

    useEffect(() => {
        if (uniqueDays.length > 0) setSelectedDay(uniqueDays[0]);
    }, [data]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            )
                setIsDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredHours = data.filter(
        (item) =>
            selectedDay &&
            isSameDay(new Date(item.dt * 1000), new Date(selectedDay * 1000))
    );

    return (
        <div className="bg-surface rounded-[30px] p-6 h-full flex flex-col shadow-2xl relative z-20 min-h-[500px]">
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-white">
                    Hourly forecast
                </h3>
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 bg-[#2B3749] hover:bg-[#35455E] text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
                    >
                        {selectedDay
                            ? format(new Date(selectedDay * 1000), "EEEE")
                            : "Select"}
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                                isDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-40 bg-[#1B2431] border border-white/10 rounded-xl shadow-2xl p-1 z-50">
                            {uniqueDays.map((dayDt) => (
                                <button
                                    key={dayDt}
                                    onClick={() => {
                                        setSelectedDay(dayDt);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                                        isSameDay(
                                            new Date(dayDt * 1000),
                                            new Date(selectedDay * 1000)
                                        )
                                            ? "bg-primary text-white"
                                            : "text-gray-400 hover:bg-white/10"
                                    }`}
                                >
                                    {format(new Date(dayDt * 1000), "EEEE")}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {filteredHours.map((hour, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#141C27] hover:bg-[#1B2431] transition-colors cursor-default group border border-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <WeatherIcon
                                code={hour.icon}
                                className="w-8 h-8 group-hover:scale-110 transition-transform"
                            />
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                                {format(new Date(hour.time * 1000), "h a")}
                            </span>
                        </div>
                        <span className="font-bold text-lg text-white">
                            {getTemp(hour.temp, unitSystem.temp)}°
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;
