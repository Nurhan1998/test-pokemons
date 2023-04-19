import React, { useEffect } from "react";

import { useAppDispatch } from "common/hooks/redux";
import { fetchPokemon } from "modules/CardsContainer/store/actions/PokemonAC";
import { CardsContainer } from "modules/CardsContainer";
import Header from "./components/Header";
import { fetchPokemonTypes } from "modules/CardsContainer/store/actions/PokemonTypesAC";

const PokemonCardsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemon());
    dispatch(fetchPokemonTypes());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <CardsContainer />
    </div>
  );
};

export default PokemonCardsPage;
