import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";

const store = configureStore({
    reducer: {
        authProvider: authSlice.reducer,
        profileProvider: profileSlice.reducer,
    },
});

export default store;
