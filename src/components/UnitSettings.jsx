import React, { useState, useRef, useEffect } from "react";
import { Settings, ChevronDown, Check } from "lucide-react";

const UnitSettings = ({ unitSystem, setUnitSystem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (category, value) => {
        setUnitSystem((prev) => ({ ...prev, [category]: value }));
    };

    const OptionItem = ({ label, isSelected, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                isSelected
                    ? "text-white bg-white/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
        >
            <span>{label}</span>
            {isSelected && <Check className="w-4 h-4 text-primary" />}
        </button>
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-surface p-3 rounded-xl hover:bg-surface/80 transition-colors flex items-center gap-2 font-medium text-white shadow-lg border border-white/5"
            >
                <Settings className="w-5 h-5" />
                <span>Units</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#1B2431] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-fade-in">
                    <div className="mb-1">
                        <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                            Temperature
                        </p>
                        <OptionItem
                            label="Celsius (°C)"
                            isSelected={unitSystem.temp === "c"}
                            onClick={() => handleSelect("temp", "c")}
                        />
                        <OptionItem
                            label="Fahrenheit (°F)"
                            isSelected={unitSystem.temp === "f"}
                            onClick={() => handleSelect("temp", "f")}
                        />
                    </div>

                    <div className="h-px bg-white/5 my-1 mx-2"></div>

                    <div className="mb-1">
                        <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                            Wind Speed
                        </p>
                        <OptionItem
                            label="km/h"
                            isSelected={unitSystem.wind === "kmh"}
                            onClick={() => handleSelect("wind", "kmh")}
                        />
                        <OptionItem
                            label="mph"
                            isSelected={unitSystem.wind === "mph"}
                            onClick={() => handleSelect("wind", "mph")}
                        />
                    </div>

                    <div className="h-px bg-white/5 my-1 mx-2"></div>

                    <div>
                        <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                            Precipitation
                        </p>
                        <OptionItem
                            label="Millimeters (mm)"
                            isSelected={unitSystem.rain === "mm"}
                            onClick={() => handleSelect("rain", "mm")}
                        />
                        <OptionItem
                            label="Inches (in)"
                            isSelected={unitSystem.rain === "in"}
                            onClick={() => handleSelect("rain", "in")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UnitSettings;
