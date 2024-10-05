<template>
  <q-page class="q-pa-sm">
    <q-table
      class="dashboard-table"
      table-header-class="bg-grey-2"
      title="User"
      row-key="id"
      :rows="currencyData"
      :columns="currencyColumns"
      :hide-header="grid"
      :grid="grid"
      :filter="filter"
      v-model:pagination="pagination"
      :rows-per-page-options="[10, 20, 30]"
      :separator="tableseparator"
      virtual-scroll
      flat
      bordered
    >
      <!-- Top -->
      <template v-slot:top-right="props">
        <!-- Table Type -->
        <q-option-group
          v-model="tableseparator"
          size="xs"
          :options="[
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
            { label: 'Cell', value: 'cell' },
            { label: 'None', value: 'none' },
          ]"
          class="q-mx-md"
          inline
        />

        <!-- Fullscreen -->
        <q-btn
          color="primary"
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="setFs(props)"
          flat
          round
          dense
        >
          <q-tooltip>{{
            props.inFullscreen ? "Keluar Layar Penuh" : "Beralih ke Layar Penuh"
          }}</q-tooltip>
        </q-btn>

        <!-- Grid Switch -->
        <q-btn
          color="primary"
          :icon="grid ? 'list' : 'grid_on'"
          @click="grid = !grid"
          class="q-mr-sm"
          flat
          round
          dense
        >
          <q-tooltip>{{ grid ? "List" : "Grid" }}</q-tooltip>
        </q-btn>

        <!-- Search -->
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Cari..."
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Create -->
      <template v-slot:top-left>
        <div class="text-h5 q-pr-lg">User</div>
        <q-btn
          color="primary"
          icon="add"
          class="shadow-3 q-my-sm"
          @click="navigateToAddItem"
          dense
        >
          <q-tooltip>Tambah User </q-tooltip>
        </q-btn>
      </template>

      <!-- Table -->
      <!-- No Data -->
      <template v-slot:no-data>
        <div class="text-body2 text-bold text-center q-pa-md">
          <q-icon name="warning_amber" size="25px" class="q-mx-sm" />
          Tidak ada data yang tersedia.
        </div>
      </template>

      <!-- ID -->
      <template #body-cell-id="props">
        <q-td :props="props">
          <div dense square>
            {{ props.rowIndex + 1 }}
          </div>
        </q-td>
      </template>

      <!-- User -->
      <template #body-cell-url="props">
        <q-td :props="props">
          <div dense square>
            {{ props.row.name }}
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn
            color="warning"
            field="edit"
            icon="edit"
            class="q-mx-xs"
            @click="navigateToEditItem(props.row.uuid)"
            dense
            round
          >
          </q-btn>
          <q-btn
            color="red"
            field="delete"
            icon="delete"
            class="q-mx-xs"
            @click="deleteItemDialog(props.row)"
            dense
            round
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { url } from "src/boot/axios";
import { useUserStore } from "/src/stores/user-store";
import { useRoleStore } from "/src/stores/role-store";

const $q = useQuasar();
const router = useRouter();

// GET
const items = ref([]);
const getItem = async () => {
  try {
    // const roles = await useRoleStore().all();
    // roles.value = roles.data.data;
    // roles.value = roles.data.data.map((role) => ({
    //   label: role.name,
    //   value: role.uuid,
    // }));

    const res = await useUserStore().all();
    items.value = res.data.data;
    console.log(items.value);
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response.data.status === "failed") {
      router.push("/notfound");
    }
  }
};

onMounted(() => {
  getItem();
});

//Add Item form
const navigateToAddItem = () => {
  router.push("/dashboard/user/add"); // Replace with your actual URL
};

//Edit Item form
const navigateToEditItem = (id) => {
  // console.log(slug);
  router.push(`user/edit/${id}`); // Replace with your actual URL
};

// Delete
const deleteItemDialog = (row) => {
  $q.dialog({
    title: "WARNING!!!",
    message: "Apakah Anda yakin ingin menghapus data ini?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await useUserStore().delete(row.uuid);

      $q.notify({
        message: "Promosi berhasil dihapus",
        icon: "check",
        color: "positive",
      });
      getItem();
    } catch (error) {
      console.error("Error submitting form:", error);
      $q.notify({
        message: error.response.data.message || "Promosi gagal dihapus",
        icon: "warning",
        color: "negative",
      });
    }
  });
};

// Table
const currencyData = items;
const currencyColumns = [
  {
    name: "id",
    field: "id",
    label: "No",
    headerStyle: "font-weight: bolder; font-size: 13px;",
  },
  {
    name: "name",
    field: "name",
    label: "Name",
    align: "left",
    sortable: false,
    headerStyle: "font-weight: bolder; font-size: 13px;",
  },
  {
    name: "email",
    field: "email",
    label: "Email",
    align: "left",
    sortable: false,
    headerStyle: "font-weight: bolder; font-size: 13px;",
  },
  {
    name: "role",
    field: "role_uuid",
    label: "Role",
    align: "left",
    sortable: false,
    headerStyle: "font-weight: bolder; font-size: 13px;",
  },
  {
    name: "action",
    field: "action",
    label: "Aksi",
    align: "center",
    headerStyle: "font-weight: bolder; font-size: 13px;",
  },
];

const tableseparator = ref("horizontal");
const filter = ref("");
const grid = ref(false);
const pagination = ref({});
const setFs = (props) => {
  props.toggleFullscreen();
};
</script>
