import { createSlice } from "@reduxjs/toolkit";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
            console.log("dispatched to login");
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(action.payload)); // Persist login
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("user"); // Also clear from storage
        },
        signUpButtonClicked: (state) => {
            state.isSigningUp = true;
        },
    },
});

export const logoutAsync = () => async (dispatch) => {
    try {
        console.log("login out");
        await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true }); // Ensure cookies are sent
        dispatch(authSlice.actions.logout()); // Dispatch sync logout action
    } catch (error) {
        console.error("Logout failed", error);
    }
};


export default authSlice;
export const authSliceActions = authSlice.actions;