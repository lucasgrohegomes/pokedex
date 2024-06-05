import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid black;
  border-top: 4px solid red;
  border-radius: 50%;
  display: inline-block;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const Button = styled.button`
  margin: 10px;
`;

export default function Pokedex() {
    const [id, setId] = useState(1);
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    const nextPokemon = () => {
        setLoading(true);
        setTimeout(() => {
            setId((prevId) => prevId !== 1025 ? prevId + 1 : 1);
        }, 2000);
    }

    const previousPokemon = () => {
        setLoading(true);
        setTimeout(() => {
            setId((prevId) => prevId !== 1 ? prevId - 1 : 1025);
        }, 2000);
    }

    return (
        <Container className='container'>
            <Button onClick={previousPokemon}>Pokémon Anterior</Button>
            {loading ? (
                <Spinner />
            ) : (
                pokemon && (
                    <div className="pokemon">
                        <h2 id='nome'>{pokemon.name}</h2>
                        <p>Número da Pokédex: {id} / 1025</p>
                        <p className='tipos'>Tipagem - {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                        <p>Altura: {pokemon.height / 10} m</p>
                        <p>Peso: {pokemon.weight / 10} kg</p>
                        <div>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                        </div>
                    </div>
                )
            )}
            <Button onClick={nextPokemon}>Próximo Pokémon</Button>
        </Container>
    )
}
