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
    },
});

export default profileSlice;
export const profileActions = profileSlice.actions;