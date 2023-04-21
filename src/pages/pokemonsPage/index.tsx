import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "common/hooks/redux";
import Header from "common/layout/Header";
import { fetchPokemon, fetchPokemonTypes } from "store/pokemons/requests";
import { setQuery } from "store/quryStore";
import CardsContainer from "containers/PokemonCardsListContainer";
import { useSearchParams } from "react-router-dom";
import { clearFetchedPages } from "../../store/pokemons/slice";

const PokemonListPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { query } = useAppSelector((state) => state.queryStoreReducer);
  const {
    pokemonTypes: { data: pokemonTypes },
  } = useAppSelector((state) => state.pokemonSliceReducer);

  useEffect(() => {
    if (query === null) {
      dispatch(setQuery(searchParams));
    } else {
      setSearchParams(query);
    }
    // need call this only on query changes
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    dispatch(fetchPokemon({ offset: query?.get("offset") || "1" }));
    if (pokemonTypes === null) {
      dispatch(fetchPokemonTypes());
    }
  }, [dispatch, query, pokemonTypes]);

  useEffect(() => {
    return () => {
      dispatch(clearFetchedPages());
    };
  }, [dispatch]);

  return (
    <div>
      <Header />
      <CardsContainer />
    </div>
  );
};

export default PokemonListPage;
