<template>
  <q-card class="high">
    <q-card-section class="high bg-blue q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" class="absolute-left" @click="back" />
      <q-tabs class="float-right" @click="warning = true"
        ><q-icon name="info" size="20px" class="iconInfo"
      /></q-tabs>
      <div class="text-subtitle1 text-center">Pendaftaran</div>
    </q-card-section>
    <q-card-section>
      <br />
    </q-card-section>
    <q-card-section class="q-pt-sm">
      <q-form @submit="createPendaftaran" class="q-gutter-sm">
        <q-select
          v-model="daftaruntuk"
          label="Daftar Untuk"
          :options="[
            { label: 'Saya Sendiri', value: 'Saya Sendiri' },
            { label: 'Orang Lain', value: 'Orang Lain' },
          ]"
        ></q-select>
        <q-input
          v-model="form.nik"
          label="Nomor NIK / KTP"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan nama lengkap',
            (val) => (val && val.length <= 20) || 'Maksimal 20 kata',
          ]"
        ></q-input>
        <q-input
          v-model="form.firstname"
          label="Nama Depan"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Masukkan nama depan']"
        ></q-input>
        <q-input
          v-model="form.lastname"
          label="Nama Belakang"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan nama belakang',
          ]"
        ></q-input>
        <q-input
          v-model="form.birthdate"
          label="Tanggal Lahir"
          lazy-rules
          readonly
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan tanggal lahir',
          ]"
          @click="showDatePicker = true"
        ></q-input>

        <q-dialog v-model="showDatePicker">
          <q-date
            v-model="form.birthdate"
            mask="YYYY-MM-DD"
            @ok="showDatePicker = false"
            @cancel="showDatePicker = false"
          />
        </q-dialog>
        <q-input
          v-model="form.phone"
          label="Nomor Telepon"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan nomor telepon',
          ]"
        ></q-input>
        <q-input
          v-model="form.address"
          label="Alamat"
          lazy-rules
          type="textarea"
          :rules="[(val) => (val && val.length > 0) || 'Masukkan alamat']"
        ></q-input>
        <q-select
          v-model="form.service_uuid"
          label="Pilih Layanan"
          :options="services"
          emit-value
          map-options
        ></q-select>
        <q-input
          v-model="form.bio"
          label="Riwayat Pasien"
          lazy-rules
          type="textarea"
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan riwayat pasien',
          ]"
        ></q-input>
        <!-- Submit -->
        <div class="column items-center q-pt-md">
          <q-btn
            label="Submit"
            style="background-color: #045951"
            type="submit"
            class="button text-white"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router"; // Import useRouter for navigation
import { useAuthStore } from "/src/stores/auth-store";
import { useServiceStore } from "/src/stores/service-store";
import { usePatientStore } from "/src/stores/patient-store";

const $q = useQuasar();
const router = useRouter(); // Initialize router for navigation

const back = () => {
  router.push("../home");
};

const daftaruntuk = ref("");

const form = ref({
  nik: "",
  firstname: "",
  lastname: "",
  birthdate: "",
  phone: "",
  address: "",
  service_uuid: null,
  bio: "",
  user: ref([]),
});

const showDatePicker = ref(false); // Boolean to control the dialog visibility

const services = ref([]);

const getService = async () => {
  try {
    const res = await useServiceStore().all();
    // roles.value = res.data.data;
    services.value = res.data.data.map((service) => ({
      label: service.name,
      value: service.uuid,
    })); // Map API response to { label, value }
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response.data.status === "failed") {
      router.push("/notfound");
    }
  }
};

const userid = ref([]);

const createPendaftaran = async () => {
  try {
    console.log("ook");
    const res = await useAuthStore().me();
    // roles.value = res.data.data;
    form.value.user = res.data.data;

    await usePatientStore().create(form.value);
    $q.notify({
      message: "Pendaftaran pasien berhasil dibuat",
      icon: "check",
      color: "positive",
    });
    // onReset(); // Optionally reset the form on successful submission
    router.push({ name: "home" });
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response.data.status === "failed") {
      router.push("/notfound");
    }
  }
};

onMounted(() => {
  getService();
});
</script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
}
.shadow {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: -2px 2px 15px black;
}
.button {
  width: 100px;
  border-radius: 50px;
}
.iconInfo {
  margin-top: 3px;
  cursor: pointer;
}
.iconInfo:hover {
  color: azure;
  scale: 1.1;
  transition: background-color 0.3s ease;
  transition: scale 0.5s ease;
}
</style>
