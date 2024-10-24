import { useState, useEffect } from 'react';
import {endpoints} from '../endpoints/endpoints'

export const dynamic = 'force-dynamic'

export const usePokemon = ( type, searchTerm) => {

    const [data, setData] = useState([]);

    const [pokemonData, setPokemonData] = useState([]);

    const [pokemonList, setPokemonList] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const [typeCollection, setTypeCollection] = useState([]);

    // Fetch Pokemon list from PokeAPI
    async function fetchData() {
        const url = `${endpoints.mainPokemonApi}?limit=20`; // Fetching with a limit for demonstration
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            const results = json.results;
            setData(results);
            await getPokemonData(results); // Wait for all Pokemon data to be fetched
        } catch (error) {
            console.error(error.message);
        }
    }

    // Fetch individual Pokemon details
    const getPokemonData = async (results) => {
        const promises = results.map(async (item) => {
            try {
                const response = await fetch(item.url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                setTypeCollection((prevSet) => [...new Set([...prevSet, json.types[0].type.name])]);

                return json;
            } catch (error) {
                console.error(error.message);
            }
        });

        const pokemonDetails = await Promise.all(promises);
        setPokemonData(pokemonDetails);
    };

    // Filter Pokemon based on searchTerm and type
    useEffect(() => {
        if (pokemonData.length > 0) {
            const filteredList = pokemonData.filter((pokemon) => {
                const matchesType = type === '' || pokemon.types[0].type.name === type;
                const matchesSearch = searchTerm === '' || pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesType && matchesSearch;
            });
            setPokemonList(filteredList);
            setLoading(false); // Loading complete once data is filtered
        }
    }, [pokemonData, searchTerm, type]);

    // Initial fetch when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return { pokemonList, loading, typeCollection };
};
