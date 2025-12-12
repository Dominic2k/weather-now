import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { searchLocations } from "../api/weatherService";

const SearchSection = ({ onSearch, onLocationSelect }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const dropdownRef = useRef(null);
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            setShowDropdown(false);
            setNoResults(false);
            return;
        }

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(async () => {
            setIsLoading(true);
            setShowDropdown(true);
            setNoResults(false);

            try {
                const results = await searchLocations(query);
                setSuggestions(results);
                if (results.length === 0) {
                    setNoResults(true);
                }
            } catch (error) {
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(debounceTimeoutRef.current);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleSelect = (location) => {
        setQuery(`${location.name}, ${location.country}`);
        setShowDropdown(false);
        onLocationSelect(location.lat, location.lon);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowDropdown(false);
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="w-full max-w-[500px] relative" ref={dropdownRef}>
            <form
                onSubmit={handleSubmit}
                className="flex items-stretch gap-3 relative z-50"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for a place..."
                        className="w-full h-full bg-[#202B3B] rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/50 text-white shadow-lg font-medium placeholder:text-gray-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => {
                            if (suggestions.length > 0 || noResults)
                                setShowDropdown(true);
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary hover:bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 shrink-0"
                >
                    Search
                </button>
            </form>

            {showDropdown && query.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#202B3B]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden z-40 animate-fade-in max-h-[300px] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="p-4 flex items-center justify-center text-gray-400 gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-sm">Searching...</span>
                        </div>
                    ) : noResults ? (
                        <div className="p-4 text-center text-gray-400 text-sm">
                            No search result found!
                        </div>
                    ) : (
                        <ul className="flex flex-col py-2">
                            {suggestions.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleSelect(item)}
                                        className="w-full text-left px-4 py-3 hover:bg-primary/20 hover:text-white transition-colors flex items-center gap-3 text-gray-300"
                                    >
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {item.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {item.state
                                                    ? `${item.state}, `
                                                    : ""}
                                                {item.country}
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchSection;
