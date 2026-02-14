import { axiosInstance as axios } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiEvent, EventFilters,EventById, getUpcomingEventsRequest, getUpcomingEventsResponse,getPastPopularEventsRequest,getPastPopularEventsResponse } from "../interface/event";
export const createEvent = async (eventData: any) => {
  try {
    const token = localStorage.getItem("token");
    console.log("create Event Token 1: ", token);
    
    const response = await axios.post("/event/create-event", eventData, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    console.log("create Event Token 2: ", token);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export const fetchFilteredEvents = async (filters: EventFilters) => {
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
}

export const filterEvents = createAsyncThunk<
  ApiEvent,
  EventFilters,
  { rejectValue: string }
>(
  "event/filter-event",
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchFilteredEvents(filters)
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch events"
      );
    }
  }
)

export const fetchUpcomingEvents = async (filters: getUpcomingEventsRequest) => {
  const params = new URLSearchParams()
  if (filters.page != null) params.append("page", String(filters.page))
  if (filters.limit != null) params.append("limit", String(filters.limit))
  
    const response = await axios.get(
    `/event/upcoming-events?${params.toString()}`
  )
  console.log("fetchUpcomingEvents aa gaya",response.data)

  return response.data
}

export const getUpcomingEvents = createAsyncThunk<
  getUpcomingEventsResponse, getUpcomingEventsRequest, { rejectValue: string }
>(
  "event/get-upcoming-events",
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchUpcomingEvents(filters)
      console.log("getUpcomingEvents aa gaya")
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch events"
      );
    }
  }
)

export const fetchPastPopularEvents = async (filters: getPastPopularEventsRequest) => {
  const params = new URLSearchParams()
  if (filters.page != null) params.append("page", String(filters.page))
  if (filters.limit != null) params.append("limit", String(filters.limit))

    const response = await axios.get(
    `/event/past-popular-events?${params.toString()}`
  )
  console.log("fetchPastPopularEvents aa gaya",response.data)

  return response.data
}

export const getPastPopularEvents = createAsyncThunk<
  getPastPopularEventsResponse, getPastPopularEventsRequest, { rejectValue: string }
>(
  "event/get-past-popular-events",
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchPastPopularEvents(filters)
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch events"
      );
    }
  }
)

export const getEventByCategoryName = async(categoryName:string,page:number,limit:number)=>{
  try{
    const params = new URLSearchParams()
    if (categoryName != null) params.append("name", categoryName)
    if (page != null) params.append("page", String(page))
    if (limit != null) params.append("limit", String(limit))
              
    const response = await axios.get(`/event/category-events?${params.toString()}`)
    return response.data
  }catch(error:any){
    throw error
  }
}

export const getEventById = async(id:string)=>{
  try{
    const response = await axios.get(`/event/get-event/${id}`)
    return response.data
  }catch(error:any){
    throw error
  }
}
