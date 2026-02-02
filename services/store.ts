import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import getUpcomingEventsSlice from "./slices/getUpcomingEventsSlice";
import getPastPopularEventsSlice from "./slices/getPastPopularEvents";
import getOrganizerSlice from "./slices/getOrganizer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    getUpcomingEvents: getUpcomingEventsSlice,
    getPastPopularEvents: getPastPopularEventsSlice,
    getOrganizer: getOrganizerSlice,
  },
});
export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
