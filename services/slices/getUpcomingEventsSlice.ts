import { createSlice } from "@reduxjs/toolkit";
import { singleEvent } from "../interface/event";
import { getUpcomingEvents } from "../api/event";

interface SliceState {
  data: singleEvent[];
  loading: boolean;
  error: string;
}

const initialState : SliceState = {
    data:[],
    loading: false,
    error: "",
}

const getUpcomingEventsSlice = createSlice({
    name: "getUpcomingEvents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUpcomingEvents.pending,(state)=>{
            state.loading = true;
            state.error = "";
        })
        builder.addCase(getUpcomingEvents.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload.data;
        })
        builder.addCase(getUpcomingEvents.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to fetch events";
        })
    },
})

export default getUpcomingEventsSlice.reducer
