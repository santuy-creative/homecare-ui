import { defineStore } from "pinia";
import { server, headersImage } from "src/boot/axios";

export const useRoleStore = defineStore("roles", {
  actions: {
    async all() {
      return await server.get("api/roles", {
        headers: headersImage,
      });
    },

    async dashboard() {
      return await server.get("api/roles");
    },

    async show(uuid) {
      return await server.get(`api/roles/${uuid}`, {
        headers: headersImage,
      });
    },

    async create(data) {
      return await server.post("api/roles", data, {
        headers: headersImage,
      });
    },

    async edit(data) {
      return await server.post(`api/roles/${data.uuid}`, data, {
        headers: headersImage,
      });
    },

    async delete(id) {
      return await server.delete(`api/roles/${id}`, {
        headers: headersImage,
      });
    },
  },
});
