import { configureStore } from "@reduxjs/toolkit";
import OpdSlice from "./redux/OpdSlice";

export const store = configureStore({
    reducer: {
        opd: OpdSlice
    }
})