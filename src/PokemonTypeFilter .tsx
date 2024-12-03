import React from "react";
import { Link } from "react-router-dom";

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

interface PokemonCardProps {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  weight: number;
  height: number;
  abilities: Ability[];
  types: PokemonType[];
}

const PokemonCards: React.FC<PokemonCardProps> = (props) => {
  return (
    <Link to={`/pokemon/${props.id}`}>
      <div
        className="product-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
      >
        <div className="para uppercase text-center leading-none z-40">
          <p
            style={{
              WebkitTextStroke: "1px rgb(207, 205, 205)",
              WebkitTextFillColor: "transparent",
              fontSize: "3rem",
              fontWeight: "bold",
            }}
            className="z-10 t-lg -mb-5 tracking-wider text-gray-500"
          >
          
          </p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
            className="font-bold tracking-wider text-[#495c48] z-30"
          >
            {props.name}
          </p>
        </div>

        <div
          className="w-[180px] aspect-square relative z-200 transition-all duration-300 flex items-center"
        >
          <img
            src={props.sprites.front_default}
            alt={props.name}
            className="w-full h-full object-contain group-hover:translate-x-3/4 transition-transform duration-500"
          />

          <div
            className="absolute left-full pl-4 w-[200px] opacity-0 group-hover:opacity-100 group-hover:-translate-x-full transition-all duration-500 ease-in-out"
          >
            <ul className="flex flex-col items-start gap-2">
              {[
                { label: "Weight", value: props.weight },
                { label: "Height", value: props.height },
                { label: "Ability", value: props.abilities[0]?.ability.name },
                {
                  label: "Types",
                  value: props.types.map((type) => type.type.name).join(", "),
                },
              ].map((stat, index) => (
                <li
                  key={stat.label}
                  className="inline-flex gap-2 items-center"
                >
                  <svg
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="3"
                    className="stroke-[#495c48]"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                    className="text-[#495c48]"
                  >
                    {stat.label}: {stat.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCards;
