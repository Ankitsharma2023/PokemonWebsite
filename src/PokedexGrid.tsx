
import React, { useEffect, useState } from "react";
import TypeFilter from "./PokemonTypeFilter";// import PokemonCards from "./PokemonCards";
import PokemonCards from "./PokemonCards";

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
  const [loading, setLoading] = useState<boolean>(true);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=151";

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
    } 
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPok();
  }, []);

  if (loading) {
    return <h1>Pokédex is Loading.....</h1>;
  }

  return (
    <div>
      <h1>Pokédex</h1>
      <TypeFilter 
        pokemons={pokemons} 
        PokemonCards={PokemonCards} 
      />
    </div>
  );
};

export default Pokedex;
