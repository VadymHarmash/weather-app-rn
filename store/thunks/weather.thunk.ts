import { createAsyncThunk } from "@reduxjs/toolkit";
import { $axios } from "@/store/axios";
import { IWeatherDataEntry } from "@/interfaces/IWeatherData.interface";
// @ts-ignore
import { AxiosError } from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "cfd3e97e1333d6f64be43d8b9fea3fb8";

export const fetchWeatherByCity = createAsyncThunk<
  IWeatherDataEntry,
  string,
  { rejectValue: string }
>("weather/fetchByCity", async (city: string, { rejectWithValue }) => {
  try {
    if (!API_KEY) {
      throw new Error("OpenWeatherMap API Key is not defined");
    }
    if (!BASE_URL) {
      throw new Error("OpenWeatherMap Base URL is not defined");
    }

    const requestUrl = `${BASE_URL}/weather`;
    const params = {
      q: city,
      appid: API_KEY,
    };

    const response = await $axios.get<IWeatherDataEntry>(requestUrl, {
      params: params,
    });
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      console.error("API error:", error.response.data);
      console.error("Error status:", error.response.status);
      return rejectWithValue(
        (error.response.data as { message: string }).message ||
          `Error: ${error.response.status}`,
      );
    } else if (error.request) {
      console.error("No API response:", error.request);
      return rejectWithValue("No server response.");
    } else {
      console.error("Request error:", error.message);
      return rejectWithValue(error.message || "Unexpected error.");
    }
  }
});
