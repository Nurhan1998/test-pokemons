import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { pokemonReducer, pokemonTypesReducer } from "../modules/CardsContainer";

const rootReducer = combineReducers({
  pokemonReducer,
  pokemonTypesReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
