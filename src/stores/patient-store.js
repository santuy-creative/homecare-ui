import { defineStore } from "pinia";
import { server, headersImage } from "src/boot/axios";

export const usePatientStore = defineStore("patients", {
  actions: {
    async all() {
      return await server.get("api/users/patients", {
        headers: headersImage,
      });
    },

    async dashboard() {
      return await server.get("api/users/patients");
    },

    async show(uuid) {
      return await server.get(`api/users/patients/${uuid}`, {
        headers: headersImage,
      });
    },

    async create(data) {
      return await server.post("api/users/patients", data, {
        headers: headersImage,
      });
    },

    async edit(data) {
      return await server.patch(`api/users/patients/${data.uuid}`, data, {
        headers: headersImage,
      });
    },

    async delete(id) {
      return await server.delete(`api/users/patients/${id}`, {
        headers: headersImage,
      });
    },
  },
});
