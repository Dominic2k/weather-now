export const getTemp = (tempInC, unit) => {
    if (unit === "f") {
        return Math.round(tempInC * 1.8 + 32);
    }
    return Math.round(tempInC);
};

export const getWindSpeed = (speedInMps, unit) => {
    if (unit === "mph") {
        return Math.round(speedInMps * 2.237);
    }
    return Math.round(speedInMps * 3.6);
};
export const getPrecipitation = (mm, unit) => {
    if (unit === "in") {
        return (mm / 25.4).toFixed(2);
    }
    return mm.toFixed(1);
};
