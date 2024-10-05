import { defineStore } from "pinia";
import { server, headersImage } from "src/boot/axios";

export const usePaymentStore = defineStore("payments", {
  actions: {
    async all() {
      return await server.get("api/payment_methods", {
        headers: headersImage,
      });
    },

    async dashboard() {
      return await server.get("api/payment_methods");
    },

    async show(uuid) {
      return await server.get(`api/payment_methods/${uuid}`, {
        headers: headersImage,
      });
    },

    async create(data) {
      return await server.post("api/payment_methods", data, {
        headers: headersImage,
      });
    },

    async edit(data) {
      return await server.patch(`api/payment_methods/${data.uuid}`, data, {
        headers: headersImage,
      });
    },

    async delete(id) {
      return await server.delete(`api/payment_methods/${id}`, {
        headers: headersImage,
      });
    },
  },
});
