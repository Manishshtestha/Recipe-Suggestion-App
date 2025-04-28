"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { toTitleCase } from "@/app/_lib/utils";
import { uniqueIngredients } from "@/../data/ingredientGroups";

interface IngredientsSelectorProps {
  selectedIngredients: string[];
  setSelectedIngredients: Dispatch<SetStateAction<string[]>>;
}

const IngredientsSelector: React.FC<IngredientsSelectorProps> = ({
  selectedIngredients,
  setSelectedIngredients,
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
    <div className="ingredients_selector w-full border rounded-2xl p-4 relative back text-white">
      <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
      <div>
        <input
          type="text"
          className="w-full border border-gray-700
           rounded px-3 py-2 bg-[rgba(0,0,0,0.5)] text-white placeholder-gray-400 focus:outline-none"
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
            className="absolute z-10 bg-gray-800 border border-gray-700 w-full max-h-48 overflow-y-auto rounded mt-1 text-white"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 cursor-pointer hover:bg-blue-600"
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
    </div>
  );
};

export default IngredientsSelector;
