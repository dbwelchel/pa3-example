const abilities = [];
const types = [];

async function displayAbility() {
  //get url for page
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonUrl = urlParams.get("url");
  
    const response = await fetch(pokemonUrl);
    const pokemonData = await response.json();
  
    const uppercaseName = pokemonData.name.toUpperCase();
  

    //get abilities and typing
    pokemonData.abilities.forEach(ability => {
        abilities.push(ability.ability.name);
    });

    
    pokemonData.types.forEach(type => {
        types.push(type.type.name);
    });
    //display pokemon information
    let tab = `
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Type</th>
        <th>Abilities</th>
      </tr>
      <tr> 
        <td><img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
        <img src="${pokemonData.sprites.back_default}" alt="${pokemonData.name}" /></td>
        <td>${uppercaseName}</td>
        <td>${types.join(', ')}</td>
        <td>${abilities.join(', ')}</td>
        <tr>
        <td colspan="3"><a href="index.html" class="btn btn-primary">Return to Home</a></td>
        <td colspan="3"><a href="#" class="btn btn-primary" onclick="shinyPokemon('${pokemonData.name}')">Shiny Form</a></td>
      </tr>`;
  
    document.getElementById("abilities").innerHTML = tab;
  }
  
  displayAbility();
  
let isShiny = false; 
//swaps sprite with the shiny form of the pokemon
async function shinyPokemon(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await response.json();

    if (isShiny) {
        
        const frontNormalImage = document.querySelector('img[src="' + pokemonData.sprites.front_shiny + '"]');
        const backNormalImage = document.querySelector('img[src="' + pokemonData.sprites.back_shiny + '"]');
        if (frontNormalImage) {
            frontNormalImage.src = pokemonData.sprites.front_default;
            backNormalImage.src = pokemonData.sprites.back_default;
        }
    } else {
        
        const frontShinyImage = document.querySelector('img[src="' + pokemonData.sprites.front_default + '"]');
        const backShinyImage = document.querySelector('img[src="' + pokemonData.sprites.back_default + '"]');
        if (frontShinyImage) {
            frontShinyImage.src = pokemonData.sprites.front_shiny;
            backShinyImage.src = pokemonData.sprites.back_shiny;
        }
    }

    isShiny = !isShiny; 
}