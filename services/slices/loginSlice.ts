import { createSlice } from "@reduxjs/toolkit";
import type { ApiUser } from "../interface/user";
import { login } from "../api/authentication"; 

//interface for slice state after login
interface SliceState {
  data: ApiUser | null;
  loading: boolean;
  error: string | null;
}

//initial state for slice before login
const initialState: SliceState = {
  data: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {}, 

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong";
      });
  },
});

export default loginSlice.reducer;
