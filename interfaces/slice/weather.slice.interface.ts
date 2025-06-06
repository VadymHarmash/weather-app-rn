import { IWeatherDataEntry } from "@/interfaces/IWeatherData.interface";

export interface IWeatherSlice {
  weatherData: IWeatherDataEntry | null;
  status: "idle" | "loading" | "succeeded" | "failed" | null;
  error: string | null;
}
