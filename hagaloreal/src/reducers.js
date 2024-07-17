// funciones de actulizacion de estado de los objetos
import { createSlice } from "@reduxjs/toolkit";

const estIni = {
  champion: "",
  coreItem: "",
  skin: "",
};

const reducers = createSlice({
  name: "holaAPP",
  initialState: estIni,
  reducers: {
    setLeyenda: (state, action) => {
      console.log("--->" + action.payload);
      state.champion = action.payload;
    },
    //  actulizacion del objeto del store
    setCoreItem: (state, action) => {
      state.coreItem = action.payload;
    },
    setSkin: (state, action) => {
      state.skin = action.payload;
    },
  },
});

export const { setLeyenda, setCoreItem, setSkin } = reducers.actions;
export default reducers.reducer;
