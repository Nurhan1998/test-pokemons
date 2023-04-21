import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createStore } from "store/store";
import "common/styles/layout.scss";
import PokemonListPage from "pages/pokemonsPage";

const store = createStore();

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="" element={<PokemonListPage />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
