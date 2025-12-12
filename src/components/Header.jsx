import React from "react";
import { logo } from "../assets/images";
import UnitSettings from "./UnitSettings";

const Header = ({ unitSystem, setUnitSystem }) => {
    return (
        <header className="sticky top-0 z-50 bg-[#0B131E]/90 backdrop-blur-md w-full flex justify-between items-center py-4 mb-6">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Weather Now Logo"
                    className="w-32 md:w-40 h-auto object-contain"
                />
            </div>
            <div>
                <UnitSettings
                    unitSystem={unitSystem}
                    setUnitSystem={setUnitSystem}
                />
            </div>
        </header>
    );
};

export default Header;
