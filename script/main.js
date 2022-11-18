
function convertPokemonToHtml(pokemon){
    return `
    <li class="pokemon">
        <div class="name">
            <span class="name">${pokemon.name}</span>
            <span class="number">${pokemon.number}</span>
        </div>
        
    <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        
    </li>
    `
}



//objeto poker recebe a lista HTML que sera manipulada
const poker = document.getElementById('pokemonList')

const btnLoadMore = document.getElementById('btnLoadMore')

const maxItens = 151
const limit = 10
let offset = 0

function loadPokemon(offset, limit) {
    pokerApi.getPokemons(offset, limit)
    .then((pokemon = []) => {
        const newHtml = pokemon.map(convertPokemonToHtml).join('')
        poker.innerHTML += newHtml
    })
}
loadPokemon(offset, limit)
// o retorno do objeto pokerApi sera repassado para o objeto 'pokemons que se nada for passado tera por padrão uma lista vazia' 

  
btnLoadMore.addEventListener('click', () => {
    offset += limit
    const qtdItensPage = offset + limit

    if (qtdItensPage >= maxItens){
        const newLimit = maxItens - offset
        loadPokemon(offset, newLimit)

        btnLoadMore.parentElement.removeChild(btnLoadMore)
        
    }else {
        loadPokemon(offset, limit)
    }
})