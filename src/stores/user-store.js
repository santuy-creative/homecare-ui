import { defineStore } from "pinia";
import { server, headersImage } from "src/boot/axios";

export const useUserStore = defineStore("users", {
  actions: {
    async all() {
      return await server.get("api/users", {
        headers: headersImage,
      });
    },

    async dashboard() {
      return await server.get("api/users");
    },

    async show(uuid) {
      return await server.get(`api/users/${uuid}`, {
        headers: headersImage,
      });
    },

    async create(data) {
      return await server.post("api/auth/register-by-admin", data, {
        headers: headersImage,
      });
    },

    async edit(data) {
      return await server.patch(`api/users/${data.uuid}`, data, {
        headers: headersImage,
      });
    },

    async delete(id) {
      return await server.delete(`api/users/${id}`, {
        headers: headersImage,
      });
    },
  },
});
