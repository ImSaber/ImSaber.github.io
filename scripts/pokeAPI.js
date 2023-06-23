document.addEventListener('DOMContentLoaded', function() {
    const pokemonSelect = document.getElementById('pokemonSelect');
    const pokemonInput = document.getElementById('pokemonInput');
    const pokemonSearchButton = document.getElementById('pokemonSearchButton');
    const pokemonInfo = document.getElementById('pokemonInfo');
  
    // Fetch the list of Pokémon from the PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then(response => response.json())
      .then(data => {
        const pokemons = data.results;
        // Dynamically populate the dropdown with Pokémon options
        pokemons.forEach(pokemon => {
          const option = document.createElement('option');
          option.value = pokemon.url;
          option.textContent = pokemon.name;
          pokemonSelect.appendChild(option);
        });
      });
  
    // Add event listener to the select dropdown
    pokemonSelect.addEventListener('change', function() {
      const selectedPokemonUrl = this.value;
      if (selectedPokemonUrl) {
        fetchPokemonInfo(selectedPokemonUrl);
      }
    });
  
    // Add event listener to the search button
    pokemonSearchButton.addEventListener('click', function() {
      const pokemonName = pokemonInput.value.trim();
      if (pokemonName) {
        const searchUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
        fetchPokemonInfo(searchUrl);
      }
    });
  
    function fetchPokemonInfo(url) {
      // Fetch the Pokémon information using the provided URL
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokémon not found');
          }
          return response.json();
        })
        .then(pokemonData => {
          // Fetch additional information: location, moves, and evolution
          const locationUrl = pokemonData.location_area_encounters;
          const movesUrls = pokemonData.moves.map(move => move.move.url);
          const speciesUrl = pokemonData.species.url;
  
          // Fetch location information
          fetch(locationUrl)
            .then(response => response.json())
            .then(locationData => {
              // Make sure locationData is an array
              const locations = Array.isArray(locationData) ? locationData : [locationData];
              // Group locations by game/region
              const locationsByGame = groupLocationsByGame(locations);
              // Build the HTML for location information
              let locationHtml = '';
              Object.keys(locationsByGame).forEach(game => {
                locationHtml += `<p class="pokemon-info-item"><strong>${game}:</strong> ${locationsByGame[game].join(', ')}</p>`;
              });
              // Fetch move information
              Promise.all(movesUrls.map(url => fetch(url).then(response => response.json())))
                .then(movesData => {
                  // Build the HTML for move information
                  const moves = movesData.map(move => move.name);
                  const movesHtml = `<p class="pokemon-info-item"><strong>Moves:</strong> ${moves.join(', ')}</p>`;
                  // Fetch evolution chain information
                  fetch(speciesUrl)
                    .then(response => response.json())
                    .then(speciesData => {
                      const evolutionChainUrl = speciesData.evolution_chain.url;
                      // Fetch evolution chain information
                      fetch(evolutionChainUrl)
                        .then(response => response.json())
                        .then(evolutionChainData => {
                          // Extract evolution details
                          const chain = extractEvolutionChain(evolutionChainData.chain);
                          // Build the HTML for evolution information
                          const evolutionHtml = `<p class="pokemon-info-item"><strong>Evolution Chain:</strong> ${chain}</p>`;
                          // Build the complete HTML to display the Pokémon information
                          const html = `
                            <div class="pokemon-info">
                              <div class="pokemon-header">
                                <h2>${pokemonData.name.toUpperCase()}</h2>
                                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                                <img src="${pokemonData.sprites.front_shiny}" alt="${pokemonData.name} Shiny" class="shiny-sprite">
                              </div>
                              <div class="pokemon-details">
                                <p class="pokemon-info-item"><strong>Type:</strong> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                                ${evolutionHtml}
                                <p class="pokemon-info-item"><strong>Abilities:</strong> ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
                                <p class="pokemon-info-item"><strong>Height:</strong> ${pokemonData.height}</p>
                                <p class="pokemon-info-item"><strong>Weight:</strong> ${pokemonData.weight}</p>
                                <p class="pokemon-info-item"><strong>Locations:</strong></p>
                                ${locationHtml}
                                ${movesHtml}
                              </div>
                            </div>
                          `;
                          // Update the content of the 'pokemonInfo' div
                          pokemonInfo.innerHTML = html;
                        });
                    });
                });
            });
        })
        .catch(error => {
          console.error('Error:', error);
          pokemonInfo.textContent = 'Failed to fetch Pokémon data.';
        });
    }
  
    // Helper function to extract evolution chain details recursively
    function extractEvolutionChain(chainData) {
      let chain = chainData.species.name;
      if (chainData.evolves_to.length > 0) {
        chain += ' → ' + extractEvolutionChain(chainData.evolves_to[0]);
      }
      return chain;
    }
  
function groupLocationsByGame(locations) {
  const locationsByGame = {};
  locations.forEach(location => {
    const versionDetails = location.version_details;
    versionDetails.forEach(version => {
      const game = version.version.name.split('-').join(' ').toLowerCase().replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase());
      const region = location.location_area.name.split('-').join(' ').toLowerCase().replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase());
      if (!locationsByGame[game]) {
        locationsByGame[game] = [];
      }
      locationsByGame[game].push(region);
    });
  });
  return locationsByGame;
}
  });