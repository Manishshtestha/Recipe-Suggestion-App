"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { toTitleCase } from "@/app/_lib/utils";
import { uniqueIngredients } from "@/../data/ingredientGroups";

interface IngredientsSelectorProps {
  selectedIngredients: string[];
  setSelectedIngredients: Dispatch<SetStateAction<string[]>>;
  isFullMode: boolean;
  setIsFullMode: Dispatch<SetStateAction<boolean>>;
}


const socialLinks = [
  {
    href: "https://x.com/kitchengenie",
    label: "Twitter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.84 12.84 0 013 4.15a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com/kitchengenie",
    label: "Facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.1v-2.88h2.1v-2.2c0-2.07 1.23-3.22 3.12-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3v1.94h2.3l-.37 2.88h-1.93v6.99A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/kitchengenie",
    label: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/in/kitchengenie",
    label: "LinkedIn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 8.75h4v12h-4v-12zm7.5 0h3.75v1.64h.05a4.12 4.12 0 013.7-2.03c3.95 0 4.68 2.6 4.68 5.98v6.41h-4v-5.68c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.19 1.48-2.19 3.01v5.78h-4v-12z" />
      </svg>
    ),
  },
];

const IngredientsSelector: React.FC<IngredientsSelectorProps> = ({
  selectedIngredients,
  setSelectedIngredients,
  isFullMode,
  setIsFullMode,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = uniqueIngredients.filter((ingredient) =>
      ingredient.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [inputValue]);

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
  };

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`ingredients_selector fixed top-0 left-0 h-full border-r border-gray-700 bg-black bg-opacity-30 backdrop-blur-md p-4 overflow-y-auto text-white z-50 transition-width duration-300 flex flex-col justify-between ${
        isFullMode ? "w-72" : "w-20 items-center"
      }`}
    >
      {/* Navbar content inside sidebar */}
      <div>
        <div className="flex items-center justify-between mb-4 w-full">
          <Link href="/" className={`font-extrabold ${isFullMode ? "text-xl" : "text-md"} ${isFullMode ? "" : "truncate"}`}>
            {isFullMode ? (
              <>
                Kitchen <span className="text-amber-500">Genie</span>
              </>
            ) : (
              <span className="text-amber-500">KG</span>
            )}
          </Link>
          <button
            onClick={() => setIsFullMode(!isFullMode)}
            className="ml-2 p-1 rounded bg-gray-700 hover:bg-gray-600 focus:outline-none"
            aria-label={isFullMode ? "Collapse sidebar" : "Expand sidebar"}
            title={isFullMode ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isFullMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
              </svg>
            )}
          </button>
        </div>

        {/* Ingredients selector content */}
        {isFullMode && (
          <>
            <div>
              <input
                type="text"
                className="w-full border border-gray-700 rounded px-3 py-2 bg-[rgba(0,0,0,0.5)] text-white placeholder-gray-400 focus:outline-none"
                placeholder="Type to search and add ingredients"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => {
                  if (filteredSuggestions.length > 0) setShowSuggestions(true);
                }}
              />
              {showSuggestions && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 bg-gray-800 border border-gray-700 w-[97.5%] max-h-48 overflow-y-auto rounded mt-1 text-white"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 cursor-pointer hover:bg-amber-600 w-[100%]"
                      onClick={() => addIngredient(suggestion)}
                    >
                      {toTitleCase(suggestion)}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap mt-4 gap-2">
              {selectedIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-blue-600 text-white rounded-full px-3 py-1 flex items-center gap-2 cursor-pointer"
                  onClick={() => removeIngredient(ingredient)}
                  title="Click to remove"
                >
                  <span>{toTitleCase(ingredient)}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              ))}
              {selectedIngredients.length === 0 && (
                <span className="text-gray-400">No ingredients selected</span>
              )}
            </div>
          </>
        )}
      </div>
      {/* Social media links at bottom */}
      {isFullMode && (
        <div className="flex justify-around mt-4 border-t border-gray-700 pt-4 w-full">
          {socialLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500"
              aria-label={label}
              title={label}
            >
              {icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientsSelector;
