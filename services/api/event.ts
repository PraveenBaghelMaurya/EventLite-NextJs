import { axiosInstance as axios } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiEvent, EventFilters,EventById, getUpcomingEventsRequest, getUpcomingEventsResponse,getPastPopularEventsRequest,getPastPopularEventsResponse } from "../interface/event";


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
      if (filters.page != null) params.append("page", String(filters.page))
      if (filters.limit != null) params.append("limit", String(filters.limit))
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

export const getUpcomingEvents = createAsyncThunk<
  getUpcomingEventsResponse, getUpcomingEventsRequest, { rejectValue: string }
>(
  "event/get-upcoming-events",
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams()
      if (filters.page != null) params.append("page", String(filters.page))
      if (filters.limit != null) params.append("limit", String(filters.limit))
      const response = await axios.get(
        `/event/upcoming-events?${params.toString()}`
      )

      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch events"
      );
    }
  }
)

// export const getEventById = async(eventId:number)=>{
//   try{
//     const response : EventById = await axios.get(`/event/get-event/${eventId}`)
//     console.log("event Data",response.data)
//     return response.data as EventById
//   }catch(error:any){
//     throw error
//   }
// }

export const getPastPopularEvents = createAsyncThunk<
  getPastPopularEventsResponse, getPastPopularEventsRequest, { rejectValue: string }
>(
  "event/get-past-popular-events",
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams()
      if (filters.page != null) params.append("page", String(filters.page))
      if (filters.limit != null) params.append("limit", String(filters.limit))
      const response = await axios.get(
        `/event/past-popular-events?${params.toString()}`
      )

      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch events"
      );
    }
  }
)
