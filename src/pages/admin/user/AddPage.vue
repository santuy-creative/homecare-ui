<template>
  <q-page class="q-pa-sm">
    <q-form @submit="onSubmit" @reset="onReset">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add User</div>
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
            v-model="form.email"
            label="Email"
            outlined
            :rules="rules.email"
          />
          <q-input
            v-model="form.password"
            label="Password"
            outlined
            :rules="rules.password"
          />
          <q-select
            v-model="form.role_uuid"
            :options="roles"
            label="Pilih Role"
            filled
            emit-value
            map-options
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
import { url } from "/src/boot/axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "/src/stores/auth-store";
import { useRoleStore } from "/src/stores/role-store";

const $q = useQuasar();
const router = useRouter();
// Form data
const form = ref({
  name: "",
  email: "",
  password: "",
  role_uuid: null,
});

// Validation rules
const rules = {
  name: [(v) => !!v || "Nama harus diisi"],
  email: [(v) => !!v || "Harga harus diisi"],
  password: [(v) => !!v || "Password harus diisi"],
  role_uuid: [(v) => !!v || "Role harus diisi"],
};

// const selectedRole = ref(null); // Menyimpan opsi yang dipilih

const roles = ref([]);

const getRole = async () => {
  try {
    const res = await useRoleStore().all();
    // roles.value = res.data.data;
    roles.value = res.data.data.map((role) => ({
      label: role.name,
      value: role.uuid,
    })); // Map API response to { label, value }
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response.data.status === "failed") {
      router.push("/notfound");
    }
  }
};

onMounted(() => {
  getRole();
});

// Form submission handler
const onSubmit = async () => {
  // Assuming this is where you would normally send the data to the server
  try {
    console.log(form.value);
    await useAuthStore().registeradmin(form.value);
    $q.notify({
      message: "User berhasil dibuat",
      icon: "check",
      color: "positive",
    });
    // onReset(); // Optionally reset the form on successful submission
    router.push("/dashboard/user");
  } catch (error) {
    console.error("Error submitting form:", error);
    $q.notify({
      message: error.response?.data?.message || "User gagal dibuat",
      icon: "warning",
      color: "negative",
    });
  }
};

// Form reset handler
const onReset = () => {
  form.value = {
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    role_id: null, // Reset role_id
  };
};
</script>
