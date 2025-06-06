import { createAction, createSlice } from "@reduxjs/toolkit";
import { IWeatherSlice } from "@/interfaces/slice/weather.slice.interface";
import { fetchWeatherByCity } from "@/store/thunks/weather.thunk";

const initialState: IWeatherSlice = {
  weatherData: null,
  status: null,
  error: null,
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
      });
  },
});

export default weatherSlice.reducer;
