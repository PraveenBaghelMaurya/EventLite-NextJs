import { axiosInstance as axios } from "@/lib/axios";
import type { signup, Login, ApiUser } from "../interface/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const register = async (data: signup) => {
  try {
    const response = await axios.post("/user/sign-up", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = createAsyncThunk<ApiUser, Login, { rejectValue: string }>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/user/sign-in", data);
      console.log("API login response", response.data);
      if (response.data.success === true) {
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

interface LogoutResponse {
  success: boolean;
  message: string;
}

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    if(!token){
      return toast.error("Guest can't Sign Out");
    }
    const response = await axios.post("/user/sign-out", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.data.success === true){
      localStorage.removeItem("token");
    }
    return response.data;
  } catch (error:any) {
    console.log("API logout error", error);
    return error;
  }
}