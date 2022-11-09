import { createSlice} from "@reduxjs/toolkit";

const initialState = {

};

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase()
    }
})