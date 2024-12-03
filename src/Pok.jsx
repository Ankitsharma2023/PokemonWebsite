
import React, { useEffect } from "react";
import { PokemonCards } from "./PokemonCards";



const  Pok=() => {
    const [pokemons, setPokemons] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState("");

      
        const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

        const fetchPok = async() =>
            {
            try{
                const res =  await fetch(API);
                const data = await res.json();
                // console.log(data);


                const detail = data.results.map(async (cur) =>{
                //    console.log(cur.url);
                const res1 = await fetch(cur.url);
                const data1 = await res1.json();
               return data1;
                });



                const response = await Promise.all(detail);
                console.log(response);
                setPokemons(response);
                setLoading(false);
                
            }
            catch(error)
            {
                console.log(error);
                setLoading(false);
            }
        
        }

        useEffect(() => {
            fetchPok();
          }, []);


          const filteredPokemons = pokemons.filter((curElem) => {
            return curElem.name.toLowerCase().includes(search.toLowerCase());
             

          });

    if(loading){
        return <h1>Loading...</h1>
    }

        return(
            <>
            <h1>Pokemons</h1>
              <div className="pokemon-search">
              <input type="text"  placeholder="search your Pokemon " value={search} onChange={(e)=>setSearch(e.target.value)}/>
              </div>


            <ul className="cards">
               {filteredPokemons.map((curElem)=>{
                return <PokemonCards key={curElem.id} {...curElem}/>
               })}
            </ul>
            </>
    )
}

export default Pok;