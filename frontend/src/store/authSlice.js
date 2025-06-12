import { createSlice } from "@reduxjs/toolkit";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

const initialState = {
    user: null, // Load from storage
    isLoggedIn: false, // Convert to boolean
    isSigningUp : false,
};

const authSlice = createSlice({
    name: "authProvider",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        signUpButtonClicked: (state) => {
            state.isSigningUp = true;
        },
    },
});

export const logoutAsync = () => async (dispatch) => {
    try {
        console.log("logout");
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, { withCredentials: true }); // Ensure cookies are sent
        dispatch(authSlice.actions.logout()); // Dispatch sync logout action
    } catch (error) {
        console.error("Logout failed", error);
    }
};


export default authSlice;
export const authSliceActions = authSlice.actions;