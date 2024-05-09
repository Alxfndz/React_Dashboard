// PokemonComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonComponent = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonName, setPokemonName] = useState(''); // Default empty value

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemonName) return; // Don't fetch if input is empty
      
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]); // Trigger the effect whenever `pokemonName` changes

  const handlePokemonChange = (e) => {
    setPokemonName(e.target.value);
  };

  return (
    <div>
      <h2>Pokémon Info</h2>
      <label htmlFor="pokemon">Enter Pokémon:</label>
      <input
        type="text"
        id="pokemon"
        value={pokemonName}
        onChange={handlePokemonChange}
      />
      {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonComponent;
