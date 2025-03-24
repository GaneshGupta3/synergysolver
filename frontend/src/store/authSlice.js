import { createSlice } from "@reduxjs/toolkit";
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
        await axios.post("/auth/logout"); // Call API
        dispatch(authSlice.actions.logout()); // Dispatch sync logout action
    } catch (error) {
        console.error("Logout failed", error);
    }
};

export default authSlice;
export const authSliceActions = authSlice.actions;