import { createSlice } from "@reduxjs/toolkit";
import { singleEvent } from "../interface/event";
import { getPastPopularEvents } from "../api/event";

interface SliceState {
    data: singleEvent[];
    loading: boolean;
    error: string;
}

const initialState: SliceState = {
    data: [],
    loading: false,
    error: "",
}

const getPastPopularEventsSlice = createSlice({
    name: "getPastPopularEvents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPastPopularEvents.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(getPastPopularEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data.events;
        })
        builder.addCase(getPastPopularEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch events";
        })
    },
})

export default getPastPopularEventsSlice.reducer
