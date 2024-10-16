<template>
  <div class="row q-mt-md">
    <!-- Form Pendaftaran -->
    <div class="col-4 text-center hover card" @click="formPendaftaran">
      <q-card-section>
        <q-icon class="q-mb-sm" color="black" name="description" size="40px" />
        <div class="text-subtitle2" style="color: black">Form Pendaftaran</div>
      </q-card-section>
    </div>

    <!-- Status Registrasi -->
    <div class="col-4 text-center hover card" @click="statusRegistrasi = true">
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="black"
          name="event_available"
          size="40px"
        />
        <div class="text-subtitle2" style="color: black">Status Registrasi</div>
      </q-card-section>
      <q-dialog
        v-model="statusRegistrasi"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <StatusRegistrasi />
      </q-dialog>
    </div>

    <!-- Biaya Penanganan -->
    <div class="col-4 text-center hover card" @click="biayaPenanganan = true">
      <q-card-section>
        <q-icon class="q-mb-sm" color="black" name="price_change" size="40px" />
        <div class="text-subtitle2" style="color: black">Biaya Penanganan</div>
      </q-card-section>
      <q-dialog
        v-model="biayaPenanganan"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <BiayaPenanganan />
      </q-dialog>
    </div>

    <!-- Informasi Jadwal -->
    <div class="col-4 text-center hover card" @click="informasiJadwal = true">
      <q-card-section>
        <q-icon class="q-mb-sm" color="black" name="info" size="40px" />
        <div class="text-subtitle2" style="color: black">Informasi Jadwal</div>
      </q-card-section>
      <q-dialog
        v-model="informasiJadwal"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <InformasiJadwal />
      </q-dialog>
    </div>

    <!-- FAQ -->
    <div class="col-4 text-center hover card" @click="faq = true">
      <q-card-section>
        <q-icon class="q-mb-sm" color="black" name="live_help" size="40px" />
        <div class="text-subtitle2" style="color: black">FAQ</div>
      </q-card-section>
      <q-dialog
        v-model="faq"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <FAQ />
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter for navigation

const router = useRouter(); // Initialize router for navigation

const maximizedToggle = ref(true);
const statusRegistrasi = ref(false);
const biayaPenanganan = ref(false);
const informasiJadwal = ref(false);
const faq = ref(false);

const formPendaftaran = () => {
  router.push("home/formdaftar");
};
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
