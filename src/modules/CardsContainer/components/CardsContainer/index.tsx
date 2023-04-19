import { useEffect, useMemo, useState } from "react";

import { IPokemonResponse } from "common/models/IPokemon";
import { useAppSelector } from "common/hooks/redux";
import PokemonInfoModal from "components/PokemonInfoModal";
import { Empty, Pagination, Spin } from "antd";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { paginationDefaultValues } from "modules/CardsContainer/consts/defaultValues";
import { filterPokemon } from "modules/CardsContainer/helper/FilterPokemon";

import PokemonFilter from "../PokemonFilter";
import CardContainer from "../CardContainer";

import "./CardsContainer.scss";

export const CardsContainer = () => {
  const [search, setSearch] = useSearchParams();
  const [fullPokemonList, setFullPokemonList] = useState<IPokemonResponse[]>(
    []
  );

  const [pokemonList, setPokemonList] = useState<IPokemonResponse[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<IPokemonResponse | null>(null);

  const { pokemon, isLoading, error } = useAppSelector(
    (state) => state.pokemonReducer
  );

  const limit = search.get("limit") || paginationDefaultValues.defaultPageSize;
  const offset = search.get("offset") || paginationDefaultValues.defaultOffset;

  const formatedOffset = (offset && Number(offset)) as number;
  const formatedLimit = (limit && Number(limit)) as number;
  const offsetMultLimit = formatedOffset * formatedLimit || 1;

  const handleModalClose = () => setSelectedPokemon(null);
  const handleCardClick = (pokemon: IPokemonResponse) =>
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

    setSearch(
      createSearchParams({
        offset: paginationDefaultValues.defaultOffset,
        limit: paginationDefaultValues.defaultPageSize,
      })
    );

    setFullPokemonList(filteredList);
  };

  const onPaginationChange = (offset: number, limit: number) => {
    setSearch(
      createSearchParams({
        offset: String(offset),
        limit: String(limit),
      })
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

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="loader">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="cards">
      <PokemonFilter onSubmit={handleSubmit} />

      {isPaginationVisible && (
        <div className="cards-pagination">
          <Pagination
            onChange={onPaginationChange}
            total={fullPokemonList.length}
            pageSize={formatedLimit}
            pageSizeOptions={paginationDefaultValues.pageSizeOptions}
            current={formatedOffset}
          />
        </div>
      )}

      <div className="cards-container">
        {pokemonList.length ? (
          pokemonList.map((pokemon) => (
            <CardContainer
              key={pokemon.id}
              pokemon={pokemon}
              handleCardClick={handleCardClick}
            />
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>

      {isPaginationVisible && (
        <div className="cards-pagination">
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
          handleModalClose={handleModalClose}
          selectedPokemon={selectedPokemon}
        />
      )}
    </div>
  );
};

export default CardsContainer;
