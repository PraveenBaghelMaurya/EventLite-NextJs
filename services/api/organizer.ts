import { axiosInstance as axios } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrganizers = async (filters: {
  page: number;
  limit: number;
}) => {
  const params = new URLSearchParams();
  if (filters.page) params.append("page", String(filters.page));
  if (filters.limit) params.append("limit", String(filters.limit));

  const response = await axios.get(
    `/organizer/get-organizers?${params.toString()}`
  );
  return response.data;
};

export const getOrganizers = createAsyncThunk(
  "organizer/getOrganizers",
  async (filters: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      return await fetchOrganizers(filters);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch organizers"
      );
    }
  }
);

export const fetchOrganizerEvent = async (filters: {
  page: number;
  limit: number;
  search?: string;
}) => {
    const token = localStorage.getItem("token");
  const query = new URLSearchParams();
  if (filters.page) query.append("page", String(filters.page));
  if (filters.limit) query.append("limit", String(filters.limit));
  if (filters.search) query.append("search", filters.search);

  const response = await axios.get(
    `/organizer/get-organizer-event?${query.toString()}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
