import { useEffect, useState, useCallback, useRef } from 'react';
import type { Pokemon } from '@nx-pokemon/shared-types';
import styles from './index.module.css';

function Index() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    fetch(`http://localhost:3333/search?q=${search}`)
      .then((resp) => resp.json())
      .then((data) => setPokemon(data));
  }, [search]);

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    []
  );

  return (
    <div className={styles.page}>
      <h1>Find your Pokemon</h1>
      <input
        type="text"
        ref={inputRef}
        value={search}
        onChange={onSetSearch}
        placeholder="Search..."
      />
      <ul>
        {pokemon.map(({ name: { english }, id }) => (
          <li key={id}>{english}</li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
