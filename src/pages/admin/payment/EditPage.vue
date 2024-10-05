<template>
  <q-page class="q-pa-sm">
    <q-form @submit.prevent="onSubmit" @reset="onReset">
      <q-card>
        <q-card-section>
          <div class="text-h6">Update Payment</div>
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
import { usePaymentStore } from "/src/stores/payment-store";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const paymentStore = usePaymentStore();
const id = route.params.id;

// Form data
const form = ref({
  uuid: "",
  name: "",
  description: "",
});

// Validation rules
const rules = {
  name: [(v) => !!v || "Nama harus diisi"],
  description: [(v) => !!v || "Deskripsi harus diisi"],
};

// Fetch existing payment data and populate form
const fetchPayment = async () => {
  try {
    // console.log(id);
    const res = await paymentStore.show(id);
    const item = res.data.data;
    form.value.uuid = item.uuid;
    form.value.name = item.name;
    form.value.description = item.description;
  } catch (error) {
    console.error("Error fetching payment:", error);
    $q.notify({
      message: "Error fetching payment",
      icon: "warning",
      color: "negative",
    });
  }
};

onMounted(() => {
  fetchPayment();
});

// Form submission handler
const onSubmit = async () => {
  try {
    console.log("Form submitted:", form.value);
    const res = await paymentStore.edit(form.value);
    console.log(res);

    $q.notify({
      message: "Payment berhasil diperbarui",
      icon: "check",
      color: "positive",
    });
    router.push("/dashboard/payment");
  } catch (error) {
    console.error("Error submitting form:", error);
    $q.notify({
      message: error.response?.data?.message || "Payment gagal diperbarui",
      icon: "warning",
      color: "negative",
    });
  }
};

// Form reset handler
const onReset = () => {
  fetchPayment();
};
</script>
