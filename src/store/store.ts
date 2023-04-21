import { combineReducers, configureStore } from "@reduxjs/toolkit";

import pokemonSliceReducer from "./pokemons/slice";
import queryStoreReducer from "./quryStore";

const rootReducer = combineReducers({
  pokemonSliceReducer,
  queryStoreReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
