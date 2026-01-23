import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import getUpcomingEventsSlice from "./slices/getUpcomingEventsSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    getUpcomingEvents: getUpcomingEventsSlice,
  },
});
export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
