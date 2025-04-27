import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isAuthenticated: sessionStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            sessionStorage.setItem("token", "temp-tokens");
            state.isAuthenticated = true;
        },
        logout(state) {
            sessionStorage.removeItem("token");
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;