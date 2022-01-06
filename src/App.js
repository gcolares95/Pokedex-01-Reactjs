import { useEffect, useState } from 'react'
import PokemonThumnail from './components/PokemonThumnail'

function App() {
    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState(
        'https://pokeapi.co/api/v2/pokemon?limit=20'
    );

    const getAllPokemnos = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()

        setLoadMore(data.next)

        function createPokemonObject(result) {
            result.forEach(async pokemon => {
                const res = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                )
                const data = await res.json()

                setAllPokemons(currentList => [...currentList, data])
            })
        }

        // await console.log(allPokemons)
        createPokemonObject(data.results)
    }

    useEffect(() => {
        getAllPokemnos()
    }, [])

    return (
        <div className="app-container">
            <h1>Pokemon Evolution</h1>
            <div className="pokemon-container">
                <div className="all-container">
                    {allPokemons.map((pokemon, index) => (
                        <PokemonThumnail
                            id={pokemon.id}
                            name={pokemon.name}
                            image={
                                pokemon.sprites.other.dream_world.front_default
                            }
                            type={pokemon.types[0].type.name}
                            key={index}
                        />
                    ))}
                </div>

                <button className="load-more" onClick={() => getAllPokemnos()}>Load more</button>
            </div>
        </div>
    )
}

export default App
