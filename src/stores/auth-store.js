import { defineStore } from "pinia";
import { server } from "../boot/axios";

const token = localStorage.getItem("acces_token");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    id: null,
    name: null,
    email: null,
    password: null,
    role: null,
  }),

  getters: {},

  actions: {
    async register(name, email, password, repassword) {
      try {
        return await server.post("api/auth/register", {
          name,
          email,
          password,
          repassword,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async login(email, password) {
      try {
        return await server.post("api/auth/login", { email, password });
      } catch (error) {
        if (error) throw error;
      }
    },

    async logout() {
      try {
        return localStorage.removeItem("acces_token");
      } catch (error) {
        if (error) throw error;
      }
    },
  },
});
