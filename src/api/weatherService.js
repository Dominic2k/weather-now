import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

export const searchLocations = async (query) => {
    try {
        const response = await axios.get(
            `${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}`
        );
        return response.data;
    } catch (error) {
        console.error("Error searching locations:", error);
        return [];
    }
};

const formatWeatherData = (current, forecastList, units) => {
    const formattedForecast = forecastList.map((item) => ({
        dt: item.dt,
        time: item.dt,
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        dt_txt: item.dt_txt,
    }));
    const dailyMap = new Map();
    forecastList.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-GB");

        if (!dailyMap.has(date)) {
            dailyMap.set(date, {
                dt: item.dt,
                temp_max: Math.round(item.main.temp_max),
                temp_min: Math.round(item.main.temp_min),
                icon: item.weather[0].icon,
            });
        }
    });

    const daily = Array.from(dailyMap.values());

    return {
        current: {
            name: current.name,
            country: current.sys.country,
            temp: Math.round(current.main.temp),
            feels_like: Math.round(current.main.feels_like),
            humidity: current.main.humidity,
            wind: Math.round(current.wind.speed),
            rain: current.rain ? current.rain["1h"] || 0 : 0,
            icon: current.weather[0].icon,
            description: current.weather[0].description,
            dt: current.dt,
        },
        hourly: formattedForecast,
        daily,
        units,
    };
};

export const getWeatherData = async (city, units = "metric") => {
    try {
        const currentReq = axios.get(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
        );
        const forecastReq = axios.get(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
        );

        const [currentRes, forecastRes] = await Promise.all([
            currentReq,
            forecastReq,
        ]);

        return formatWeatherData(currentRes.data, forecastRes.data.list, units);
    } catch (error) {
        throw error;
    }
};

export const getWeatherDataByCoords = async (lat, lon, units = "metric") => {
    try {
        const currentReq = axios.get(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
        );
        const forecastReq = axios.get(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
        );

        const [currentRes, forecastRes] = await Promise.all([
            currentReq,
            forecastReq,
        ]);

        return formatWeatherData(currentRes.data, forecastRes.data.list, units);
    } catch (error) {
        throw error;
    }
};
