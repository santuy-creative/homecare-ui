<template>
  <div class="row q-mt-md"></div>
</template>

<script setup>
import { ref } from "vue";
import FormPendaftaran from "components/beranda/item/FormPendaftaran.vue";
import StatusRegistrasi from "components/beranda/item/StatusRegistrasi.vue";
import BiayaPenanganan from "components/beranda/item/BiayaPenanganan.vue";
import InformasiJadwal from "components/beranda/item/InformasiJadwal.vue";
import FAQ from "components/beranda/item/FAQ.vue";

const bot = ref("bottom");
const danger = ref(false);
const maximizedToggle = ref(true);

const formPendaftaran = ref(false);
const statusRegistrasi = ref(false);
const biayaPenanganan = ref(false);
const informasiJadwal = ref(false);
const faq = ref(false);
</script>

<style scoped>
.hover:hover {
  cursor: pointer;
  background-color: rgba(0, 255, 255, 0.144);
  transition: background-color 0.4s ease;
}

.card {
  box-shadow: none;
  border: none;
}
</style>
