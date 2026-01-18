import { axiosInstance as axios } from "@/lib/axios";
import type{ signup, Login, ApiUser } from "../interface/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = async (data: signup) => {
    try {
        const response = await axios.post("/user/sign-up", data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const login = createAsyncThunk<ApiUser, Login, { rejectValue: string }>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/user/sign-in", data);
      console.log("API login response", response.data)
      if(response.data.success === true){
        localStorage.setItem("token", response.data.data.accessToken);
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);
