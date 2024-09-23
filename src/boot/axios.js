import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const url = "http://localhost:8000/";
const server = axios.create({ baseURL: url });

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
const headersImage = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
};

server.defaults.withCredentials = true;

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$server = server;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, server, url, token, headers, headersImage };
