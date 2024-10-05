import { defineStore } from "pinia";
import { server, headersImage } from "src/boot/axios";

export const useServiceStore = defineStore("services", {
  actions: {
    async all() {
      return await server.get("api/service_types", {
        headers: headersImage,
      });
    },

    async dashboard() {
      return await server.get("api/service_types");
    },

    async show(uuid) {
      return await server.get(`api/service_types/${uuid}`, {
        headers: headersImage,
      });
    },

    async create(data) {
      return await server.post("api/service_types", data, {
        headers: headersImage,
      });
    },

    async edit(data) {
      return await server.patch(`api/service_types/${data.uuid}`, data, {
        headers: headersImage,
      });
    },

    async delete(id) {
      return await server.delete(`api/service_types/${id}`, {
        headers: headersImage,
      });
    },
  },
});
