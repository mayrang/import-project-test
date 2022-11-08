import { combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import userSlice from "./UserSlice";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

const rootReducer = (state, action) => {
    switch(action.type){
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                user: userSlice.reducer
            });
            return combineReducer(state, action);
        }
    }
}

export default rootReducer;