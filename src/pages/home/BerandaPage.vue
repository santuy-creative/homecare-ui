<template>
  <!-- Loading -->
  <!-- Page -->

  <q-page class="q-pa-sm bg-blue-2">
    <!-- Banner -->
    <div class="row q-pa-sm">
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

    <!-- Antrian 
    <div style="margin-top: 10px">
      <ListAntrian />
    </div>-->

    <!-- Item -->
    <ItemList />
  </q-page>
</template>

<script setup>
import mainIcon from "../../../svg/mainIcon.svg";
// import ListAntrian from "components/beranda/ListAntrian.vue";
import ItemList from "components/beranda/ItemList.vue";
</script>
