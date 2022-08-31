import { configureStore } from '@reduxjs/toolkit';
import calendarSlice from './feature/calendar/calendarSlice';

const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
  },
});

export default store;
