import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import PokemonCards from "./PokemonTypeFilter ";

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

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [favorites, setFavorites] = useState<number[]>(() => {
   
    const savedFavorites = localStorage.getItem('pokemon-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [showScrollButton, setShowScrollButton] = useState(false);

  // API URL
  const API = "https://pokeapi.co/api/v2/pokemon?limit=250";

  const fetchPok = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detail = data.results.map(async (cur: { url: string }) => {
        const res1 = await fetch(cur.url);
        const data1: Pokemon = await res1.json();
        return data1;
      });

      const response: Pokemon[] = await Promise.all(detail);
      setPokemons(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPok();
    

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonId: number) => {
    setFavorites(prev => 
      prev.includes(pokemonId) 
        ? prev.filter(id => id !== pokemonId) 
        : [...prev, pokemonId]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const allTypes = [
    "All",
    ...new Set(
      pokemons.flatMap((pokemon) => pokemon.types.map((type) => type.type.name))
    ),
  ].sort();

  const filteredPokemons = pokemons.filter((curElem) => {
    const nameMatch = curElem.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch =
      selectedType === "All" ||
      curElem.types.some((pokemonType) => pokemonType.type.name === selectedType);
    return nameMatch && typeMatch;
  });

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  if (loading) {
    return <h1>Pokédex is Loading.....</h1>;
  }

  return (
    <div className="relative">
      <h1>Pokédex</h1>

      <div className="pokemon-search mb-6">
        <input
          type="text"
          placeholder="Search your Pokemon"
          value={search}
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
            <button 
              onClick={() => toggleFavorite(curElem.id)}
              className={`absolute top-4 right-4 z-50 ${
                favorites.includes(curElem.id) 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 hover:text-gray-500'
              }`}
            >
            </button>
          </div>
        ))}
      </ul>

     
      {showScrollButton && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-40 right-8 bg-yellow-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-5000000"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Pokedex;