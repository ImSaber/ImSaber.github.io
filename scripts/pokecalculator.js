// Pokémon encounter rates for each generation and method (Modify as needed)
const encounterRates = {
    '1': {
      fullOdds: 1 / 8192,
      masudaMethod: 1 / 8192,
      chainFishing: 1 / 8192,
    },
    '2': {
      fullOdds: 1 / 8192,
      masudaMethod: 1 / 2048,
      chainFishing: 1 / 8192,
    },
    '3': {
      fullOdds: 1 / 8192,
      masudaMethod: 1 / 2048,
      chainFishing: 1 / 8192,
    },
    '4': {
      fullOdds: 1 / 8192,
      masudaMethod: 1 / 2048,
      chainFishing: 1 / 8192,
    },
    '5': {
      fullOdds: 1 / 8192,
      masudaMethod: 1 / 1365.3,
      chainFishing: 1 / 8192,
    },
    '6': {
      fullOdds: 1 / 4096,
      masudaMethod: 1 / 683,
      chainFishing: 1 / 4096,
    },
    '7': {
      fullOdds: 1 / 4096,
      masudaMethod: 1 / 683,
      chainFishing: 1 / 4096,
    },
    '8': {
      fullOdds: 1 / 4096,
      masudaMethod: 1 / 512,
      chainFishing: 1 / 4096,
    },
    '9': {
      fullOdds: 1 / 4096,
      masudaMethod: 1 / 512,
      chainFishing: 1 / 4096,
    },
  };
  
let generationValue = '1';
let methodValue = 'fullOdds';
let encounterCount = 0;

// Function to update the encounter rate and probability
function updateEncounterRate() {
const encounterRateElement = document.getElementById('encounterRate');
const probabilityElement = document.getElementById('probability');

const encounterRate = encounterRates[generationValue][methodValue];
encounterRateElement.textContent = `Encounter Rate: 1 in ${Math.round(1 / encounterRate)}`;

const probability = 1 - Math.pow(1 - encounterRate, encounterCount + 1);
probabilityElement.textContent = `Shiny Probability: ${(probability * 100).toFixed(6)}%`;
}

// Function to increase the encounter count
function increaseCount() {
encounterCount++;
document.getElementById('count').textContent = encounterCount;
updateEncounterRate();
}

// Function to decrease the encounter count
function decreaseCount() {
if (encounterCount > 0) {
    encounterCount--;
    document.getElementById('count').textContent = encounterCount;
    updateEncounterRate();
}
}

// Function to update the encounter count with a custom value
function updateCustomCount() {
const customCount = parseInt(document.getElementById('customCount').value);
if (!isNaN(customCount) && customCount >= 0) {
    encounterCount = customCount;
    document.getElementById('count').textContent = encounterCount;
    updateEncounterRate();
}
}
  
// Function to update the game generation and hunting method
function updateGameAndMethod() {
    generationValue = document.getElementById('generation').value;
    methodValue = document.getElementById('method').value;
    updateEncounterRate();
}

// Function to fetch Pokémon data from the API and display the Pokémon image
async function fetchPokemonData(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  const pokemonImageURL = data.sprites.front_default;
  console.log('Retrieved Pokémon image URL:', pokemonImageURL);
  document.getElementById('pokemonImage').src = pokemonImageURL;
}
  
// Function to handle the input change event and update the Pokémon image
function handleInputChange() {
    const pokemonName = document.getElementById('pokemon').value.toLowerCase();
    fetchPokemonData(pokemonName);
}

const pokemonImageURL = 'https://example.com/path-to-pokemon-image.png';
console.log(pokemonImageURL);
document.getElementById('pokemonImage').src = pokemonImageURL;

  

// Add event listeners to the buttons and select elements
document.getElementById('increase').addEventListener('click', increaseCount);
document.getElementById('decrease').addEventListener('click', decreaseCount);
document.getElementById('updateCount').addEventListener('click', updateCustomCount);
document.getElementById('generation').addEventListener('change', updateGameAndMethod);
document.getElementById('method').addEventListener('change', updateGameAndMethod);
  
// Initial update of the encounter rate and probability
updateEncounterRate();
  
  

// Initial update
updateGameAndMethod();
