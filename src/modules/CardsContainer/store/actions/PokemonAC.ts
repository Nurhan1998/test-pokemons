import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TPokemonAPI, IPokemonResponse } from "common/models/IPokemon";
import { fetchAllPokemonsParams } from "../consts";

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchAll",
  async (_, thunkAPI) => {
    try {
      let finishedRequests = 0;
      const pokemonResults: any[] = [];

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
      console.log(data.results, "data", data);

      const fetchSinglePokemon = async (totalItems: number) => {
        const lastIndex =
          finishedRequests + fetchAllPokemonsParams.intervalValue;
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
          await fetchSinglePokemon(totalItems);
        }
      };

      await fetchSinglePokemon(data.results.length);

      // sort by order
      const sortedResults = pokemonResults.sort((a, b) => a.order - b.order);

      const result = {
        ...data,
        results: sortedResults,
      };

      return result;
    } catch (e) {
      return thunkAPI.rejectWithValue("Failed to fetch pokemon!");
    }
  }
);
