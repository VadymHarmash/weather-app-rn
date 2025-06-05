import { createSlice } from "@reduxjs/toolkit";
import { IWeatherSlice } from "@/interfaces/slice/weather.slice.interface";
import { fetchWeatherByCity } from "@/store/thunks/weather.thunk";

const initialState: IWeatherSlice = {
  weatherData: null,
  status: null,
  error: null,
};

export const weatherSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.error = "";
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.error = "";
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
