export const PokemonCards = (props) => {
    return (
        <li className="card">
            <img src={props.sprites.front_default} alt={props.name} />
            <h2>{props.name}</h2>
            <p>Weight: {props.weight}</p>
            <p>Height: {props.height}</p>
            <p>Ability: {props.abilities[0].ability.name}</p>
            {/* <p>
                {
                    props.types.map((type, index) => {
                        return (
                            <span key={index}>{type.type.name}</span>
                        )
                    })
                }
            </p> */}
            <p>
    {props.types.map(type => type.type.name).join(", ")}
</p>

           
        </li>
    )
}