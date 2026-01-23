import { createSlice } from "@reduxjs/toolkit";
import { filterEvents } from "../api/event";
import { ApiEvent } from "../interface/event";

interface SliceState {
  data: ApiEvent;
  loading: boolean;
  error: string;
}

const initialState = {
    data:{},
    loading: false,
    error: "",
}

const filterEventsSlice = createSlice({
    name: "filterEvents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(filterEvents.pending, (state) => {
            state.loading = true;
            state.error="";
        })
        .addCase(filterEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(filterEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || "Something went wrong";
        })
    }
})

export default filterEventsSlice.reducer

