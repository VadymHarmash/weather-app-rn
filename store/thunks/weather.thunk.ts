import { createAsyncThunk } from "@reduxjs/toolkit";
import { $axios } from "@/store/axios";
import { IWeatherDataEntry } from "@/interfaces/IWeatherData.interface";

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

        const fullRequestUrlWithParams = `${requestUrl}?q=${city}&appid=${API_KEY}`;
        console.log("Запит до API OpenWeatherMap за адресою:", fullRequestUrlWithParams);

        const response = await $axios.get<IWeatherDataEntry>(
            requestUrl,
            {
                params: params,
            },
        );
        return response.data;
    } catch (e: any) {
        if (e.response) {
            console.error("Помилка відповіді API:", e.response.data);
            console.error("Статус помилки:", e.response.status);
            return rejectWithValue(e.response.data.message || `Помилка: ${e.response.status}`);
        } else if (e.request) {
            console.error("Немає відповіді від API:", e.request);
            return rejectWithValue("Немає відповіді від сервера. Перевірте підключення до інтернету.");
        } else {
            console.error("Помилка при налаштуванні запиту:", e.message);
            return rejectWithValue(e.message || "Невідома помилка.");
        }
    }
});
