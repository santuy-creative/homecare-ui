<template>
  <!-- Loading -->
  <!-- Page -->

  <q-page class="q-pa-sm">
    <!-- Banner -->
    <div class="row q-mt-md">
      <div
        class="banner-container bg-blue"
        style="
          border-radius: 30px;
          width: 100%;
          height: 120px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        "
      >
        <div style="order: 2">
          <img :src="mainIcon" />
        </div>

        <div style="order: 1; color: white">
          <span style="font-size: 30px; line-height: 1.5; font-weight: 900">
            MCO
          </span>
          <br />
          <div style="line-height: 1; font-weight: 600">
            <span style="font-size: 10px"
              >Kemudahan Kesehatan dalam Satu Aplikasi,
            </span>
            <br />
            <span style="font-size: 10px">Kesehatan di Ujung Jari Anda</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-pa-sm q-mt-xl justify-center items-center">
      <q-form @submit="onRegister" style="width: 300px">
        <q-input outlined stack-label v-model="name" label="Name" type="text" />
        <q-input
          outlined
          stack-label
          v-model="email"
          label="Email"
          type="email"
          class="q-mt-md"
        />
        <q-input
          outlined
          stack-label
          v-model="password"
          label="Password"
          type="password"
          class="q-mt-md"
        />

        <!-- Login Button -->
        <q-btn
          class="bg-blue text-white q-mt-lg"
          style="width: 300px; border-radius: 30px; font-size: 20px"
          type="submit"
          label="Register"
        />
      </q-form>
    </div>
    <div class="q-px-md q-mt-md text-center">
      <div class="q-mb-md no-account">Don't have an account?</div>
      <q-btn color="teal" outline rounded to="/login" size="15px">Login</q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth-store";

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");

onMounted(() => {
  // Reset email dan password saat komponen dimuat
  name.value = "";
  email.value = "";
  password.value = "";
});

// Login
const onRegister = async () => {
  try {
    const res = await authStore.register(
      name.value,
      email.value,
      password.value
    );

    localStorage.setItem("token", res.data.access_token);
    $q.notify({
      message: "Register Success",
      icon: "check",
      color: "positive",
    });
    router.push({ name: "home" });
    // window.location.reload();
  } catch (error) {
    $q.notify({
      icon: "warning",
      color: "negative",
      message: "Silahkan coba lagi",
    });
    console.error(error);
  }
};
import mainIcon from "../../../svg/mainIcon.svg";
</script>
