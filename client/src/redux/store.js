import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV === 'development',
    });
    return store;
};

const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === 'development'
});

export default wrapper;