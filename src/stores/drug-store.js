import { defineStore } from "pinia";
import { server, headersImage } from "src/boot/axios";

export const useDrugStore = defineStore("drugs", {
  actions: {
    async all() {
      return await server.get("api/drugs", {
        headers: headersImage,
      });
    },

    async dashboard() {
      return await server.get("api/drugs");
    },

    async show(uuid) {
      return await server.get(`api/drugs/${uuid}`, {
        headers: headersImage,
      });
    },

    async create(data) {
      return await server.post("api/drugs", data, {
        headers: headersImage,
      });
    },

    async edit(data) {
      return await server.patch(`api/drugs/${data.uuid}`, data, {
        headers: headersImage,
      });
    },

    async delete(id) {
      return await server.delete(`api/drugs/${id}`, {
        headers: headersImage,
      });
    },
  },
});
