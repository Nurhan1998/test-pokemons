import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TPokemonTypesAPI } from "common/models/IPokemon";

export const fetchPokemonTypes = createAsyncThunk(
  "pokemonTypes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<TPokemonTypesAPI>(
        `${process.env.REACT_APP_MAIN_URL}type`
      );

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Failed to fetch pokemon types!");
    }
  }
);
