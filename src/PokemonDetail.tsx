import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface PokemonSprites {
  front_default: string;
  back_default?: string;
  front_shiny?: string;
  back_shiny?: string;
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonStat {
  stat: {
    name: string;
  };
  base_stat: number;
}

interface PokemonData {
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
}

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon details");
        }
        const data: PokemonData = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <div className="text-center text-xl mt-8">Loading...</div>;

  if (!pokemon) return <div className="text-center text-xl mt-8">Pokemon not found</div>;

  // Collect all available sprites
  const sprites = [
    { src: pokemon.sprites.front_default},
    ...(pokemon.sprites.back_default ? [{ src: pokemon.sprites.back_default, }] : []),
    ...(pokemon.sprites.front_shiny ? [{ src: pokemon.sprites.front_shiny, }] : []),
    ...(pokemon.sprites.back_shiny ? [{ src: pokemon.sprites.back_shiny }] : [])
  ];

  const handleNextSprite = () => {
    setCurrentSpriteIndex((prev) => (prev + 1) % sprites.length);
  };

  const handlePrevSprite = () => {
    setCurrentSpriteIndex((prev) => (prev - 1 + sprites.length) % sprites.length);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
         
          <div className="bg-gray-100 flex items-center justify-center p-8 lg:w-1/2 relative">
          
            <button 
              onClick={handlePrevSprite} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2"
            >
              <ChevronLeft />
            </button>

          
            <div className="flex flex-col items-center">
              <img
                src={sprites[currentSpriteIndex].src}
                alt={`${pokemon.name} ${sprites[currentSpriteIndex].name}`}
                className="w-72 h-72 object-contain"
              />
              <p className="mt-2 text-gray-600">
                {sprites[currentSpriteIndex].name}
              </p>
            </div>

            
            <button 
              onClick={handleNextSprite} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2"
            >
              <ChevronRight />
            </button>

         
            <div className="absolute bottom-4 flex space-x-2">
              {sprites.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSpriteIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSpriteIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

      
          <div className="p-8 lg:w-1/2">
            <h1 className="text-4xl font-bold capitalize text-gray-800">
              {pokemon.name}
            </h1>

            
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-700">Types</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full capitalize shadow-md"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

          
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-700">Stats</h2>
              <ul className="mt-4 space-y-4">
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name} className="flex items-center">
                    <span className="w-32 capitalize font-medium text-gray-600">
                      {stat.stat.name}:
                    </span>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{
                          width: `${(stat.base_stat / 255) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-700">
                      {stat.base_stat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;