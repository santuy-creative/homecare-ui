<template>
  <q-page class="q-pa-sm">
    <q-form @submit.prevent="onSubmit" @reset="onReset">
      <q-card>
        <q-card-section>
          <div class="text-h6">Update Service</div>
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
          /><br />

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
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { useServiceStore } from "/src/stores/service-store";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const serviceStore = useServiceStore();
const id = route.params.id;

// Form data
const form = ref({
  uuid: "",
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

// Fetch existing service data and populate form
const fetchService = async () => {
  try {
    // console.log(id);
    const res = await serviceStore.show(id);
    const item = res.data.data;
    form.value.uuid = item.uuid;
    form.value.name = item.name;
    form.value.description = item.description;
    form.value.price = item.price;
  } catch (error) {
    console.error("Error fetching service:", error);
    $q.notify({
      message: "Error fetching service",
      icon: "warning",
      color: "negative",
    });
  }
};

onMounted(() => {
  fetchService();
});

// Form submission handler
const onSubmit = async () => {
  try {
    console.log("Form submitted:", form.value);
    const res = await serviceStore.edit(form.value);
    console.log(res);

    $q.notify({
      message: "Service berhasil diperbarui",
      icon: "check",
      color: "positive",
    });
    router.push("/dashboard/service");
  } catch (error) {
    console.error("Error submitting form:", error);
    $q.notify({
      message: error.response?.data?.message || "Service gagal diperbarui",
      icon: "warning",
      color: "negative",
    });
  }
};

// Form reset handler
const onReset = () => {
  fetchService();
};
</script>
