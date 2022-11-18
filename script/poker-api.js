
//Objeto pokerApi recebe uma lista de pokemons da API 
const pokerApi = {}

function convertePokeApiDetailPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
    
}

pokerApi.getpokemonsDatail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertePokeApiDetailPokemon)
}

//parametros para requisição na Api
pokerApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokerApi.getpokemonsDatail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetail) => pokemonDetail) 

}

