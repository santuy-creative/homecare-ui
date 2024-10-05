<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr fFf">
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
      >
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>HCare Dashboard</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="item in menuList" :key="item.label">
              <router-link v-if="item.path" :to="item.path" class="router-link">
                <q-item>
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
              </router-link>
              <q-item clickable v-else @click="item.action">
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>{{ item.label }}</q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>

      <q-footer
        elevated
        :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
      >
        <q-toolbar>
          <q-toolbar-title>HCare All rights reserved</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "/src/stores/auth-store";

const $q = useQuasar();
const router = useRouter();

// const authStore = useAuthStore();

const drawer = ref(false);

const menuList = [
  {
    icon: "home",
    label: "Home Web",
    path: "/",
    separator: false,
  },
  {
    icon: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    separator: false,
  },
  {
    icon: "book",
    label: "Role",
    path: "/dashboard/role",
    separator: false,
  },
  {
    icon: "camera",
    label: "Drug",
    path: "/dashboard/drug",
    separator: false,
  },
  {
    icon: "umbrella",
    label: "Service",
    path: "/dashboard/service",
    separator: false,
  },
  {
    icon: "money",
    label: "Payment",
    path: "/dashboard/payment",
  },
  {
    icon: "edit_note",
    label: "Nurse",
    path: "/dashboard/nurse",
    separator: false,
  },
  {
    icon: "image",
    label: "Customer",
    path: "/dashboard/customer",
    separator: false,
  },
  {
    icon: "person",
    label: "Patient",
    path: "/dashboard/patient",
    separator: true,
  },
  {
    icon: "man",
    label: "User",
    path: "/dashboard/user",
    separator: true,
  },
  {
    icon: "logout",
    iconColor: "primary",
    label: "Logout",
    separator: false,
    action: () => {
      // console.log("Logout action triggered");
      $q.dialog({
        title: "Keluar",
        message: "Apakah anda yakin?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await useAuthStore().logout();
        router.push({ name: "login" });

        $q.notify({
          message: "Logout Berhasil",
          icon: "check",
          color: "positive",
        });
      });
    },
  },
];
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
