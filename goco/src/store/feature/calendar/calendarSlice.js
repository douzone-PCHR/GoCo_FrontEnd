import { createSlice } from '@reduxjs/toolkit';

// const getData = createAsyncThunk("")

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    data: [],
    inSuccess: false,
    message: '',
    loading: false,
  },
  reducers: {},
  extraReducers: () => {},
});

export default calendarSlice;
