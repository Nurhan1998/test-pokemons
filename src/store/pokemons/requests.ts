import axios from "axios";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";

import {
  TPokemonAPI,
  IPokemonResponse,
  TPokemon,
} from "common/models/IPokemon";
import { TPokemonTypesAPI } from "common/models/IPokemon";

import { fetchAllPokemonsParams } from "./constants";
import { RootState } from "../store";
import { setFetchedPages } from "./slice";

export const fetchPokemon: AsyncThunk<
  TPokemon,
  { offset: string },
  { state: RootState; rejectValue: string }
> = createAsyncThunk<
  TPokemon,
  { offset: string },
  { state: RootState; rejectValue: string }
>("pokemon/fetchAll", async ({ offset }, { rejectWithValue, dispatch }) => {
  try {
    let finishedRequests = 0;
    const pokemonResults: IPokemonResponse[] = [];

    // fetching all pokemon urls since pokeapi.co API doesn't suppport filtering, have to filter on front-side
    const { data } = await axios.get<TPokemonAPI>(
      `${process.env.REACT_APP_MAIN_URL}pokemon`,
      {
        params: {
          offset: fetchAllPokemonsParams.offset,
          limit: fetchAllPokemonsParams.limit,
        },
      }
    );

    const fetchEachPokemon = async (totalItems: number) => {
      const lastIndex = finishedRequests + fetchAllPokemonsParams.intervalValue;
      await Promise.all(
        data.results.slice(finishedRequests, lastIndex).map(async (i) => {
          const newPokemon = await axios.get<IPokemonResponse>(`${i.url}`);
          pokemonResults.push(newPokemon.data);
        })
      ).catch((err) => {
        throw new Error(err);
      });

      finishedRequests = pokemonResults.length;

      // fetching pokemon after (intervalValue = 10) has been fetched
      if (totalItems > finishedRequests) {
        await fetchEachPokemon(totalItems);
      }
    };

    await fetchEachPokemon(data.results.length);

    // sort by order
    const sortedResults = pokemonResults.sort((a, b) => a.order - b.order);

    const result = {
      ...data,
      results: sortedResults,
    };

    dispatch(
      setFetchedPages({
        page: offset,
        rangeStart: offset,
        rangeEnd: offset + fetchAllPokemonsParams.limit,
      })
    );
    return result;
  } catch (e) {
    return rejectWithValue("Failed to fetch pokemon!");
  }
});

export const fetchPokemonTypes: AsyncThunk<
  TPokemonTypesAPI,
  { offset: string },
  { state: RootState; rejectValue: string }
> = createAsyncThunk<
  TPokemonTypesAPI,
  { offset: string },
  { state: RootState; rejectValue: string }
>("pokemonTypes/fetchAll", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get<TPokemonTypesAPI>(
      `${process.env.REACT_APP_MAIN_URL}type`
    );

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Failed to fetch pokemon types!");
  }
});
