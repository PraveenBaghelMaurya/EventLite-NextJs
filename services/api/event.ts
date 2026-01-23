import { axiosInstance as axios } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiEvent, EventFilters,EventById } from "../interface/event";


export const filterEvents = createAsyncThunk<
  ApiEvent,
  EventFilters,
  { rejectValue: string }
>(
  "event/filter-event",
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams()

      if (filters.searchQuery) params.append("searchQuery", filters.searchQuery)
      if (filters.categoryType) params.append("categoryType", String(filters.categoryType))
      if (filters.timeRange) params.append("timeRange", filters.timeRange)
      if (filters.page) params.append("page", String(filters.page))
      if (filters.limit) params.append("limit", String(filters.limit))
      if (filters.sortBy) params.append("sortBy", filters.sortBy)
      if (filters.sortOrder) params.append("sortOrder", filters.sortOrder)

      const response = await axios.get(
        `/event/filter-event?${params.toString()}`
      )

      return response.data
    } catch (error: any) {
     return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch events"
      );
    }
  }
)

export const getEventById = async(eventId:number)=>{
  try{
    const response : EventById = await axios.get(`/event/get-event/${eventId}`)
    console.log("event Data",response.data)
    return response.data as EventById
  }catch(error:any){
    throw error
  }
}
