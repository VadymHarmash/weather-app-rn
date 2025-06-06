import { IWeatherDataEntry } from "@/interfaces/IWeatherData.interface";
import { IWeatherForecastEntry } from "@/interfaces/IWeatherForecastEntry";

export interface IWeatherSlice {
  weatherData: IWeatherDataEntry | null;
  status: "idle" | "loading" | "succeeded" | "failed" | null;
  error: string | null;
  forecast: IWeatherForecastEntry | null;
}
