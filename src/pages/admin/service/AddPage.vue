<template>
  <q-page class="q-pa-sm">
    <q-form @submit="onSubmit" @reset="onReset">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Service</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input
            v-model="form.name"
            label="Name"
            outlined
            :rules="rules.name"
          />
          <q-input
            v-model="form.description"
            label="Description"
            outlined
            :rules="rules.description"
          />
          <q-input
            v-model="form.price"
            label="Price"
            outlined
            :rules="rules.price"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="Reset" type="reset" color="secondary" flat />
          <q-btn label="Submit" type="submit" color="primary" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { url } from "/src/boot/axios";
import { useRouter } from "vue-router";
import { useServiceStore } from "/src/stores/service-store";

const $q = useQuasar();
const router = useRouter();
// Form data
const form = ref({
  name: "",
  description: "",
  price: "",
});

// Validation rules
const rules = {
  name: [(v) => !!v || "Nama harus diisi"],
  description: [(v) => !!v || "Deskripsi harus diisi"],
  price: [(v) => !!v || "Harga harus diisi"],
};

// Form submission handler
const onSubmit = async () => {
  // Assuming this is where you would normally send the data to the server
  try {
    await useServiceStore().create(form.value);
    $q.notify({
      message: "Service berhasil dibuat",
      icon: "check",
      color: "positive",
    });
    // onReset(); // Optionally reset the form on successful submission
    router.push("/dashboard/service");
  } catch (error) {
    console.error("Error submitting form:", error);
    $q.notify({
      message: error.response?.data?.message || "Service gagal dibuat",
      icon: "warning",
      color: "negative",
    });
  }
};

// Form reset handler
const onReset = () => {
  form.value = {
    name: "",
    description: "",
    price: "",
  };
};
</script>
