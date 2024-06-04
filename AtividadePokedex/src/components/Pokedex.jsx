import React, { useState , useEffect } from 'react';

export default function Pokedex(){
    const [id, setId] = useState(1);
    const [pokemon, setPokemon] = useState(null);

    const fetchData = async () => {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
        fetchData()
    }, [id])

    const nextPokemon = () =>{
        setId(id + 1)
    }

    const previousPokemon = () =>{
        if(id != 1){
            setId(id - 1)
        }
        
    }
    return (
        <div class='pokemon-container'>
            <button onClick={previousPokemon}>Pokémon Anterior</button>
            {pokemon && (
                <div className="pokemon">
                    <h1>Pokédex</h1>
                    <h2 id='nome'>{pokemon.name}</h2>
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
            )}
            <button onClick={nextPokemon}>Próximo Pokémon</button>
        </div>
    )
}
