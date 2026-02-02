import { createSlice } from "@reduxjs/toolkit";
import { getOrganizers } from "../api/organizer";
import { ApiOrganizer } from "../interface/event";

interface SliceState {
  data: ApiOrganizer;
  loading: boolean;
  error: string;
}

const initialState = {
    data:{success:false,message:"",data:[]},
    loading: false,
    error: "",
}

const getOrganizerSlice = createSlice({
    name: "getOrganizer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getOrganizers.pending, (state) => {
            state.loading = true;
            state.error="";
        })
        .addCase(getOrganizers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(getOrganizers.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || "Something went wrong";
        })
    }
})

export default getOrganizerSlice.reducer

