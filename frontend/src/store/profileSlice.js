import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
    isUpdatingProfile : false,
};

const profileSlice = createSlice({
    name: "profileProvider",
    initialState,
    reducers: {
        updateProfile: (state)=>{

        },
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
        updateProfile: (state)=>{

        }
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


export default profileSlice;
export const profileActions = profileSlice.actions;