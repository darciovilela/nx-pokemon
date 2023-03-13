import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import type { Pokemon } from '@nx-pokemon/shared-types';
import styles from './index.module.css';
import axios from 'axios';

//Original code to use local data

// function Index() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [search, setSearch] = useState('');
//   const [pokemon, setPokemon] = useState<Pokemon[]>([]);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//     fetch(`http://localhost:3333/search?q=${search}`)
//       .then((resp) => resp.json())
//       .then((data) => setPokemon(data));
//   }, [search]);

//   const onSetSearch = useCallback(
//     (evt: React.ChangeEvent<HTMLInputElement>) => {
//       setSearch(evt.target.value);
//     },
//     []
//   );

//   return (
//     <div className={styles.page}>
//       <h1>Find your Pokemon</h1>
//       <input
//         type="text"
//         ref={inputRef}
//         value={search}
//         onChange={onSetSearch}
//         placeholder="Search..."
//       />
//       <ul>
//         {pokemon.map(({ name: { english }, id }) => (
//           <li key={id}>{english}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Index;

// New code to use real API pokeapi.co/api/v2/pokemon

function PokemonList() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=1000`
        );
        const results = response.data.results;
        setPokemon(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // const onSetSearch = () => {
  //   setSearch(inputRef.current?.value?.toLowerCase() ?? '');
  // };

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    [setSearch]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [pokemon, search]);

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
        {filteredPokemon.map(({ name }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
