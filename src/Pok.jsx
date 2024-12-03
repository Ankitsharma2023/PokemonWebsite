import React, { useEffect, useState } from "react";
import PokemonCards from "./Cards";

const Pok = () => {
    const [pokemons, setPokemons] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState("");
    const [selectedType, setSelectedType] = React.useState("All");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=250";

    const fetchPok = async() => {
        try {
            const res = await fetch(API);
            const data = await res.json();

            const detail = data.results.map(async (cur) => {
                const res1 = await fetch(cur.url);
                const data1 = await res1.json();
                return data1;
            });

            const response = await Promise.all(detail);
            setPokemons(response);
            setLoading(false);
        }
        catch(error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPok();
    }, []);

    // Get unique Pokemon types
    const allTypes = ["All", ...new Set(pokemons.flatMap(pokemon => 
        pokemon.types.map(type => type.type.name)
    ))].sort();

    // Filter pokemons based on search and selected type
    const filteredPokemons = pokemons.filter((curElem) => {
        const nameMatch = curElem.name.toLowerCase().includes(search.toLowerCase());
        const typeMatch = selectedType === "All" || 
            curElem.types.some(pokemonType => pokemonType.type.name === selectedType);
        return nameMatch && typeMatch;
    });

    // Handle type selection
    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    if (loading) {
        return <h1>Poke`dex is Loading.....</h1>;
    }

    return (
        <>
            <h1>Poke`dex</h1>
            
            <div className="pokemon-search mb-6">
                <input 
                    type="text"  
                    placeholder="Search your Pokemon" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md mx-auto block"
                />
            </div>

            {/* Type Filter Buttons */}
            <div className="type-filter grid grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                {allTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => handleTypeSelect(type)}
                        className={`
                            py-4 text-2xl font-bold rounded-2xl uppercase
                            transition-all duration-300 ease-in-out
                            ${selectedType === type 
                                ? 'bg-blue-600 text-white scale-105 shadow-xl' 
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}
                        `}
                    >
                        {type}
                    </button>
                ))}
            </div>


            <ul className="cards">
                {filteredPokemons.map((curElem) => (
                    <PokemonCards key={curElem.id} {...curElem}/>
                ))}
            </ul>
        </>
    )
}

export default Pok;