'use client';
import { useEffect, useState } from 'react';
import { DetailsCard, BreadCrum } from '../components';
import LazyCard from '../lazyLoader/LazyCard';
import { useRouter } from 'next/navigation';
import {endpoints} from '../endpoints/endpoints'

// Fetch Pokémon details directly in the component
const getPokemonData = async (id) => {

  const res = await fetch(`${endpoints.mainPokemonApi}/${id}`);

  // Handle errors and return data
  if (!res.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }
  return res.json();
};
const DetailsPage = ({ params }) => {
  const router = useRouter()
  const { detailsPage } = params;
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const fetchPokemon = async () => {
    try {
      const data = await getPokemonData(detailsPage);
      setPokemon(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const handBack = () =>{
    router.back()
  }

  useEffect(() => {
    fetchPokemon();
  }, [detailsPage]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pokemon) {
    return (
      <div className='absolute top-20 left-10'>
        <LazyCard />
      </div>
    );
  }

  return (
    <div className="detailsContainer w-full  p-8">
      <p onClick={handBack} className="text-[rgb(96,226,201)] font-medium flex items-center my-4 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Back
      </p>
      <BreadCrum data={pokemon} />
      <DetailsCard data={pokemon} />
    </div>
  );
};

export default DetailsPage;
