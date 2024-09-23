<template>
  <q-page class="q-pa-sm">
    <q-form @submit.prevent="onSubmit" @reset="onReset">
      <q-card>
        <q-card-section>
          <div class="text-h6">Update Role</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input
            v-model="form.name"
            label="Name"
            outlined
            :rules="rules.name"
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
import { useRoleStore } from "/src/stores/role-store";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const roleStore = useRoleStore();
const id = route.params.id;

// Form data
const form = ref({
  uuid: "",
  name: "",
});

// Validation rules
const rules = {
  name: [(v) => !!v || "Nama harus diisi"],
};

// Fetch existing role data and populate form
const fetchRole = async () => {
  try {
    console.log(id);
    const res = await roleStore.show(id);
    const item = res.data.data;
    form.value.uuid = item.uuid;
    form.value.name = item.name;
  } catch (error) {
    console.error("Error fetching role:", error);
    $q.notify({
      message: "Error fetching role",
      icon: "warning",
      color: "negative",
    });
  }
};

onMounted(() => {
  fetchRole();
});

// Form submission handler
const onSubmit = async () => {
  // Assuming this is where you would normally send the data to the server
  try {
    console.log("Form submitted:", form.value);
    const res = await roleStore.edit(form.value);
    console.log(res.data);

    $q.notify({
      message: "Role berhasil diperbarui",
      icon: "check",
      color: "positive",
    });
    router.push("/dashboard/role");
  } catch (error) {
    console.error("Error submitting form:", error);
    $q.notify({
      message: error.response?.data?.message || "Role gagal diperbarui",
      icon: "warning",
      color: "negative",
    });
  }
};

// Form reset handler
const onReset = () => {
  fetchRole();
};
</script>
