import axios from "axios";
const apiRootPath = process.env.VUE_APP_TEST;

export const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: apiRootPath,
});
