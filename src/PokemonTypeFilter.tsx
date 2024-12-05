import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface PokemonType {
  type: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  height: number;
  weight: number;
  abilities: Ability[];
}

interface TypeFilterProps {
  pokemons: Pokemon[];
  PokemonCards: React.ComponentType<PokemonCardProps>;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ pokemons, PokemonCards }) => {
  const [search, setSearch] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Generate all unique types, starting with 'All'
  const allTypes = [
    "All",
    ...new Set(
      pokemons.flatMap((pokemon) => pokemon.types.map((type) => type.type.name))
    ),
  ].sort();

  // Filtering logic for Pokémon based on search and type
  const filteredPokemons = pokemons.filter((curElem) => {
    const nameMatch = curElem.name.toLowerCase().includes(search.toLowerCase());

    // Filter on the basis of type 
    const typeMatch =
      selectedType === "All" ||
      curElem.types.some((pokemonType) => pokemonType.type.name === selectedType);
    return nameMatch && typeMatch;
  });

  // Handle type selection
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative">
      <div className="pokemon-search mb-6">
        <input
          type="text"
          placeholder="Search your Pokemon"
          value={search}
          // This find the value of the input field and set it to the search state
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mx-auto block"
        />
      </div>

      <div className="type-filter grid grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
        {allTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeSelect(type)}
            className={`
              py-4 text-2xl font-bold rounded-2xl uppercase
              transition-all duration-300 ease-in-out
              ${
                selectedType === type
                  ? "bg-blue-600 text-white scale-105 shadow-xl"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>

      <ul className="cards flex flex-wrap justify-center gap-4">
        {filteredPokemons.map((curElem) => (
          <div key={curElem.id} className="relative">
            <PokemonCards {...curElem} />
          </div>
        ))}
      </ul>

      {showScrollButton && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-40 right-8 bg-yellow-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-1"
        >
          <ArrowUp size={48} />
        </button>
      )}
    </div>
  );
};

export default TypeFilter;