import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!pokemon) return <div>Pokemon not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className="w-64 h-64 object-contain"
          />
          <div className="ml-0 md:ml-8 mt-4 md:mt-0">
            <h1 className="text-4xl font-bold capitalize text-gray-800">{pokemon.name}</h1>
            
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Types</h2>
              <div className="flex gap-2 mt-2">
                {pokemon.types.map(type => (
                  <span 
                    key={type.type.name} 
                    className="px-4 py-1 bg-green-500 text-white rounded-full capitalize"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Stats</h2>
              <ul className="space-y-2 mt-2">
                {pokemon.stats.map(stat => (
                  <li key={stat.stat.name} className="flex items-center">
                    <span className="w-32 capitalize">{stat.stat.name}:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{width: `${(stat.base_stat / 255) * 100}%`}}
                      ></div>
                    </div>
                    <span className="ml-2">{stat.base_stat}</span>
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