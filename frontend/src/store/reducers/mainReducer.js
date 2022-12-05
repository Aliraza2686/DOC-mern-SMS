import { createSlice } from "@reduxjs/toolkit";

export const mainReducer = createSlice({

    name: "mainReducer",
    initialState: {
        count : 0
    },
    reducers : {
        increament : (state) => {
            state.count++;
        },
        decreament : (state) => {
            state.count--;
        },
        increamentBy : (state, action) => {
            state.count += action.payload;
        }
    }
});

export const {increament, decreament, increamentBy} = mainReducer.actions;
export default mainReducer.reducer;