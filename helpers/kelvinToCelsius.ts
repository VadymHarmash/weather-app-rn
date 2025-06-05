export const kelvinToCelsius = (kelvin: number): string => {
  return (kelvin - 273.15).toFixed(0) + "°C";
};
