import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Empty, Pagination, Spin } from "antd";

import { IPokemonResponse } from "common/models/IPokemon";
import { useAppSelector, useAppDispatch } from "common/hooks/redux";
import { createSearchParams } from "react-router-dom";
import { PokemonCard, PokemonInfoModal } from "components/PokemonCard";
import { IPokemonCardView } from "components/PokemonCard/types";
import { filterPokemon, getPokemonViewData } from "./utils";
import { paginationDefaultValues } from "./constants";
import PokemonFilter from "../PokemonFiltersContainer";
import { selectPokemon } from "store/pokemons/selectors";
import { selectQuery, setQuery } from "store/quryStore";

import styles from "./PokemonCardsListContainer.module.scss";

export const CardsContainer = () => {
  const [fullPokemonList, setFullPokemonList] = useState<IPokemonResponse[]>(
    []
  );
  const [pokemonList, setPokemonList] = useState<IPokemonResponse[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<IPokemonCardView | null>(null);

  const dispatch = useAppDispatch();
  const { data: pokemon, isLoading, error } = useAppSelector(selectPokemon);
  const query = useAppSelector(selectQuery);

  const limit = query?.get("limit") || paginationDefaultValues.defaultPageSize;
  const offset = query?.get("offset") || paginationDefaultValues.defaultOffset;

  const formatedOffset = (offset && Number(offset)) as number;
  const formatedLimit = (limit && Number(limit)) as number;
  const offsetMultLimit = formatedOffset * formatedLimit || 1;

  const handleModalClose = useCallback(() => setSelectedPokemon(null), []);
  const handleCardClick = (pokemon: IPokemonCardView) =>
    setSelectedPokemon(pokemon);

  const isPaginationVisible = useMemo(
    () => formatedLimit < fullPokemonList.length,
    [formatedLimit, fullPokemonList.length]
  );

  const handleSubmit = (name: string, types: string[]) => {
    const filteredList = filterPokemon({
      pokemon,
      name,
      types,
    });

    setQuery(
      createSearchParams({
        offset: paginationDefaultValues.defaultOffset,
        limit: paginationDefaultValues.defaultPageSize,
      })
    );

    setFullPokemonList(filteredList);
  };

  const onPaginationChange = (offset: number, limit: number) => {
    dispatch(
      setQuery(
        createSearchParams({
          offset: String(offset),
          limit: String(limit),
        })
      )
    );
  };

  useEffect(() => {
    setFullPokemonList(pokemon?.results || []);
  }, [pokemon?.results]);

  useEffect(() => {
    const newPokemonList =
      fullPokemonList.slice(offsetMultLimit - formatedLimit, offsetMultLimit) ||
      [];

    setPokemonList(newPokemonList);
  }, [formatedLimit, offsetMultLimit, fullPokemonList]);

  const pokemonsPrepearedList: IPokemonCardView[] = useMemo(
    () => getPokemonViewData(pokemonList),
    [pokemonList]
  );

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.cards}>
      <PokemonFilter onSubmit={handleSubmit} />

      {isPaginationVisible && (
        <div className={styles.cards_pagination}>
          <Pagination
            onChange={onPaginationChange}
            total={fullPokemonList.length}
            pageSize={formatedLimit}
            pageSizeOptions={paginationDefaultValues.pageSizeOptions}
            current={formatedOffset}
          />
        </div>
      )}

      <div className={styles.cards_container}>
        {pokemonsPrepearedList.length ? (
          pokemonsPrepearedList.map((pokemonData) => (
            <PokemonCard
              key={pokemonData.name}
              {...pokemonData}
              handleCardClick={() => handleCardClick(pokemonData)}
            />
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>

      {isPaginationVisible && (
        <div className={styles.cards_pagination}>
          <Pagination
            onChange={onPaginationChange}
            total={fullPokemonList.length}
            pageSize={formatedLimit}
            pageSizeOptions={paginationDefaultValues.pageSizeOptions}
            current={formatedOffset}
          />
        </div>
      )}

      {selectedPokemon && (
        <PokemonInfoModal
          {...selectedPokemon}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default CardsContainer;
