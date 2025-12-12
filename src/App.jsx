import React, { useState, useEffect } from "react";
import { Loader2, Ban, RotateCcw } from "lucide-react"; // Bỏ import Search
// Import SearchSection mới
import SearchSection from "./components/SearchSection";
import { getWeatherData, getWeatherDataByCoords } from "./api/weatherService";

import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Highlights from "./components/Highlights";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

function App() {
    // Bỏ state searchQuery ở đây vì SearchSection đã quản lý rồi
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unitSystem, setUnitSystem] = useState({
        temp: "c",
        wind: "kmh",
        rain: "mm",
    });

    // --- LOGIC GỌI API (Giữ nguyên) ---
    const fetchWeather = async (searchCity) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getWeatherData(searchCity, "metric");
            setWeather(data);
        } catch (err) {
            setError("API Error");
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherByLocation = async (lat, lon) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getWeatherDataByCoords(lat, lon, "metric");
            setWeather(data);
        } catch (err) {
            fetchWeather("Ho Chi Minh");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadInitialData = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherByLocation(latitude, longitude);
                    },
                    (error) => {
                        fetchWeather("Ho Chi Minh");
                    }
                );
            } else {
                fetchWeather("Ho Chi Minh");
            }
        };
        loadInitialData();
    }, []);

    // --- CÁC HÀM CALLBACK TRUYỀN XUỐNG SEARCH SECTION ---

    // 1. Khi user gõ tên -> Enter / Click nút Search
    const handleSearchSubmit = (query) => {
        fetchWeather(query);
    };

    // 2. Khi user chọn từ Dropdown -> Lấy theo tọa độ
    const handleLocationSelect = (lat, lon) => {
        fetchWeatherByLocation(lat, lon);
    };

    // --- RENDER ---
    if (loading && !weather)
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-white">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-background text-white p-6 flex justify-center font-sans">
                <div className="w-full max-w-[1200px] flex flex-col h-full">
                    <Header
                        unitSystem={unitSystem}
                        setUnitSystem={setUnitSystem}
                    />
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="mb-6 text-gray-400">
                            <Ban strokeWidth={1.5} className="w-16 h-16" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-center">
                            Something went wrong
                        </h2>
                        <p className="text-gray-400 text-center mb-8">
                            We couldn't connect to the server.
                        </p>
                        <button
                            onClick={() => fetchWeather("Ho Chi Minh")}
                            className="bg-[#202B3B] hover:bg-[#2B3749] text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-3"
                        >
                            <RotateCcw className="w-5 h-5" />
                            <span>Retry</span>
                        </button>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-background text-white p-6 md:p-10 flex justify-center font-sans">
            <div className="w-full max-w-[1200px] flex flex-col gap-8">
                <Header unitSystem={unitSystem} setUnitSystem={setUnitSystem} />

                {/* --- HERO SECTION --- */}
                <div className="flex flex-col items-center gap-6 mb-2">
                    <h2 className="text-5xl font-bold text-center">
                        How's the sky looking today?
                    </h2>

                    {/* THAY THẾ FORM CŨ BẰNG SEARCH SECTION MỚI */}
                    <SearchSection
                        onSearch={handleSearchSubmit}
                        onLocationSelect={handleLocationSelect}
                    />
                </div>

                {weather && (
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8 animate-fade-in pb-10">
                        <div className="flex flex-col gap-6">
                            <CurrentWeather
                                data={weather.current}
                                unitSystem={unitSystem}
                            />
                            <Highlights
                                data={weather.current}
                                unitSystem={unitSystem}
                            />
                            <DailyForecast
                                data={weather.daily}
                                unitSystem={unitSystem}
                            />
                        </div>
                        <div className="flex flex-col h-full">
                            <HourlyForecast
                                data={weather.hourly}
                                unitSystem={unitSystem}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
