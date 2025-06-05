import axios from "axios";

export const $axios = axios.create({
  baseURL: process.env.BASE_URL,
});
