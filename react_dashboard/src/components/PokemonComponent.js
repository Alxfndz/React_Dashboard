// components/PokemonComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

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
    <div className="PokemonComponent">
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
          <p>Types:</p>
          <ul>
            {pokemonData.types.map((typeData, index) => (
              <li key={index}>{typeData.type.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonComponent;
