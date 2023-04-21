import React, { useMemo, useState } from "react";
import { Button, Input, Select } from "antd";

import { useAppSelector } from "common/hooks/redux";

import styles from "./PokemonFilter.module.scss";
import { PokemonFilterProps } from "./types";

const PokemonFilter = ({ onSubmit }: PokemonFilterProps) => {
  const [nameSortValue, setNameSortValue] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const {
    pokemonTypes: { data: pokemonTypes, isLoading },
  } = useAppSelector((state) => state.pokemonSliceReducer);

  const onNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNameSortValue(e.target.value);

  const OPTIONS = useMemo(() => {
    if (!pokemonTypes?.results) return [];
    return pokemonTypes.results.map((type) => type.name);
  }, [pokemonTypes?.results]);

  const filteredOptions = OPTIONS.filter((o) => !selectedTypes.includes(o));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(nameSortValue, selectedTypes);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.pokemon_filter}>
      <Input
        value={nameSortValue}
        onChange={onNameInputChange}
        placeholder="Search"
      />
      <Select
        mode="multiple"
        placeholder="Type"
        value={selectedTypes}
        onChange={setSelectedTypes}
        loading={isLoading}
        options={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}
      />

      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </form>
  );
};

export default PokemonFilter;
