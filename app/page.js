'use client';
import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { FilterForm} from './components';
import { Card } from './components';
import { usePokemon } from './customHook/usePokemon';
import LazyCard from './lazyLoader/LazyCard';

export default function Home() {
  const [type, setType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { pokemonList, loading, typeCollection } = usePokemon(type, deferredSearchTerm);

  // Use callbacks for event handlers
  const handleTypeChange = useCallback((e) => setType(e.target.value), []);
  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);
  const handleClearFilter = useCallback(() => setSearchTerm(''), []);

  // Memoize loading placeholders to avoid re-creating the array
  const loadingPlaceholders = useMemo(() => 
    Array.from({ length: 10 }, (_, index) => <LazyCard key={index} />),
  []);

  return (
    <main className="flex min-h-screen flex-col gap-8">
      <FilterForm
        type={type}
        searchTerm={searchTerm}
        handleTypeChange={handleTypeChange}
        handleSearchChange={handleSearchChange}
        handleClearFilter={handleClearFilter}
        typeCollection={typeCollection}
      />

      <div className="flex flex-wrap justify-between gap-6 p-8">
        {loading && loadingPlaceholders}
        {pokemonList?.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            name={item.name}
            imageUrl={item.sprites.front_default}
          />
        ))}
      </div>
    </main>
  );
}