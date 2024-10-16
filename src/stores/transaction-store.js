import { defineStore } from "pinia";
import { server, headersImage } from "src/boot/axios";

export const useTransactionStore = defineStore("transactions", {
  actions: {
    async all() {
      return await server.get("api/transaction", {
        headers: headersImage,
      });
    },

    async dashboard() {
      return await server.get("api/transaction");
    },

    async show(uuid) {
      return await server.get(`api/transaction/${uuid}`, {
        headers: headersImage,
      });
    },

    async create(data) {
      return await server.post("api/transaction", data, {
        headers: headersImage,
      });
    },

    async edit(data) {
      return await server.patch(`api/transaction/${data.uuid}`, data, {
        headers: headersImage,
      });
    },

    async delete(id) {
      return await server.delete(`api/transaction/${id}`, {
        headers: headersImage,
      });
    },
  },
});
