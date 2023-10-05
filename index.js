const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
// fetch the api url
async function getPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  
  if (response.ok) {
    displayPokemon(data.results);
  }
}

getPokemon(pokeUrl);
//create table with pokemon names
async function displayPokemon(pokemonList) {
  let tab = `
    <tr>
      <th>Name</th>
      <th>Explore</th>
    </tr>`;

  for (let pokemon of pokemonList) {
    const response = await fetch(pokemon.url);
    const pokemonData = await response.json();

    const uppercaseName = pokemonData.name.toUpperCase();

    tab += `<tr> 
      
      <td>${uppercaseName}</td>
      <td><a href="abilities.html?url=${pokemon.url}" class="btn"><img src="./resources/pokeball.png" style="width: 50px; height: 50px;"></a></td>
    </tr>`;
  }

  document.getElementById("pokemon").innerHTML = tab;
}

