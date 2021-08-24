import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { dataReducer } from "./dataSlice";
import { loadState, saveState } from "./localStorage";

export const store = configureStore({
  preloadedState: loadState(),
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});
