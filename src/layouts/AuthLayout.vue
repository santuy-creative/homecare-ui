<template>
  <div style="height: 100vh" class="high">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 100%"
      class="shadow-2 rounded-borders"
    >
      <q-footer bordered class="bg-blue text-white">
        <q-tabs
          no-caps
          active-color="blue"
          indicator-color="transparent"
          class="text-white"
          style="font-size: 14px"
        >
          <q-route-tab :to="{ name: 'beranda' }" exact clickable v-ripple
            ><q-icon name="phone" size="20px" />Call Us</q-route-tab
          >
          <q-route-tab :to="{ name: 'riwayat' }" exact clickable v-ripple
            ><q-icon name="book" size="20px" />Chat Us</q-route-tab
          >
        </q-tabs>
      </q-footer>

      <q-page-container>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup></script>

<style>
::-webkit-scrollbar {
  display: none;
}
.high {
  max-width: 500px;
  margin: auto;
}
</style>
