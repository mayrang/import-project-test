import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const asyncUserResister = createAsyncThunk(
    'user/asyncUserResister',
    async (data, {rejectWithValue}) => {
        try{
            const result = await axios.post("/auth/register", data);
            return result.data;
        }catch(err){
            console.log(err);
            console.log(err.response.data);
            return rejectWithValue(err.response.data || {});
        }
        
    }
);

export const asyncUserLogin = createAsyncThunk(
    'user/asyncUserLogin',
    async (data, {rejectWithValue}) => {
        try{
            const result = await axios.post("/auth/login", data);
            console.log(result.data);
            return result.data;
        }catch(err){
            console.log(err.response.data);
            return rejectWithValue(err.response.data || {});
        }
    }
);

export const asyncUserLoadMyInfo = createAsyncThunk(
    'user/asyncUserLoadMyInfo',
    async (cookie, {rejectWithValue}) => {
        try{
            const result = await axios.get("/auth/me", {
                headers: {
                    cookie: cookie
                }
            });
            return result.data;
        }catch(err){
            console.log("error", err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const asyncUserLogout = createAsyncThunk(
    'user/asyncUserLogout',
    async (_, {rejectWithValue}) => {
        try{
            await axios.get("/auth/logout");
            
        }catch(err){
            console.log("error", err);
            return rejectWithValue(err.response.data);
        }
    }
);


const initialState = {
    user: null,
    registerLoading: false,
    registerDone: false,
    registerError: null,
    loginLoading: false,
    loginDone: false,
    loginError: null,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(asyncUserResister.pending, (state, action) => {
            state.registerLoading = true;
            state.registerDone = false;
            state.registerError = null;
        });
        builder.addCase(asyncUserResister.fulfilled, (state, action) => {
            state.registerLoading = false;
            state.registerDone = true;
            state.registerError = null;

        });
        builder.addCase(asyncUserResister.rejected, (state, action) => {
            state.registerLoading = false;
            state.registerDone = false;
            state.registerError = action.payload;
        });
        builder.addCase(asyncUserLogin.pending, (state, action) => {
            state.loginLoading = true;
            state.loginDone = false;
            state.loginError = null;
        });
        builder.addCase(asyncUserLogin.fulfilled, (state, action) => {
            state.loginLoading = false;
            state.loginDone = true;
            state.loginError = null;
        });
        builder.addCase(asyncUserLogin.rejected, (state, action) => {
            state.loginLoading = false;
            state.loginDone = false;
            state.loginError = action.payload;
        });
        builder.addCase(asyncUserLoadMyInfo.pending, (state, action) => {
            state.loadMyInfoLoading = true;
            state.loadMyInfoDone = false;
            state.loadMyInfoError = null;
        });
        builder.addCase(asyncUserLoadMyInfo.fulfilled, (state, action) => {
            state.loadMyInfoDone = true;
            state.loadMyInfoLoading = false;
            state.user = action.payload;
            state.loadMyInfoError = null;
        });
        builder.addCase(asyncUserLoadMyInfo.rejected, (state, action) => {
            state.loadMyInfoDone = false;
            state.loadMyInfoLoading = false;
            state.loadMyInfoError = action.payload;
        });
        builder.addCase(asyncUserLogout.pending, (state, action) => {
            state.logoutLoading = true;
            state.logoutDone = false;
            state.logoutError = null;
        });
        builder.addCase(asyncUserLogout.fulfilled, (state, action) => {
            state.logoutLoading = false;
            state.logoutDone = true;
            state.logoutError = null;
        });
        builder.addCase(asyncUserLogout.rejected, (state, action) => {
            state.logoutLoading = false;
            state.logoutDone = false;
            state.logoutError = action.payload;
        });
    }
});

export default userSlice;