import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import ewasteReducer from "./Slices/wasteSlice";

export const store = configureStore({
  reducer: { user: userReducer, ewaste: ewasteReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
