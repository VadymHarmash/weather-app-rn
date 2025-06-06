import { createAction, createSlice } from "@reduxjs/toolkit";
import { IWeatherSlice } from "@/interfaces/slice/weather.slice.interface";
import {
  fetchWeatherByCity,
  fetchWeatherForecastByCity,
} from "@/store/thunks/weather.thunk";

const initialState: IWeatherSlice = {
  weatherData: null,
  status: null,
  error: null,
  forecast: null,
};

export const resetWeatherState = createAction("weather/resetState");

export const weatherSlice = createSlice({
  name: "weather",
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
      })
      .addCase(resetWeatherState, (state) => {
        return { ...initialState };
      })
      .addCase(fetchWeatherForecastByCity.pending, (state) => {
        state.error = "";
      })
      .addCase(fetchWeatherForecastByCity.fulfilled, (state, action) => {
        state.forecast = action.payload;
        state.error = "";
      })
      .addCase(fetchWeatherForecastByCity.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
