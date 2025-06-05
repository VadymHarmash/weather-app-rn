import { IWeatherDataEntry } from "@/interfaces/IWeatherData.interface";

export interface IWeatherSlice {
  weatherData: IWeatherDataEntry | null;
  status: "loading" | "failed" | "success" | null;
  error: string | null;
}
