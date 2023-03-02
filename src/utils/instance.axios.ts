import axios from "axios";
const apiRootPath = process.env.VUE_APP_TEST;

export const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: apiRootPath,
});

// instance.interceptors.request.use((config) => {
//   config.headers["Access-Control-Allow-Origin"] = "*"; // CORS 설정(모든 리소스 허용)
//   return config;
// });
