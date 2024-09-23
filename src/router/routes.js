const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    path: "/beranda",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("pages/home/BerandaPage.vue"),
        name: "beranda",
      },
      {
        path: "riwayat",
        component: () => import("pages/home/RiwayatPage.vue"),
        name: "riwayat",
      },
      {
        path: "pembayaran/:slug",
        component: () => import("pages/home/PembayaranPage.vue"),
        name: "pembayaran",
      },
      {
        path: "profile",
        component: () => import("pages/home/ProfilePage.vue"),
        name: "profile",
      },
    ],
    path: "/login",
    component: () => import("src/layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/auth/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    // meta: { requiresAuth: true, roles: ["Admin", "Operator"] },
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("pages/admin/IndexPage.vue"),
      },
      {
        path: "home",
        name: "dashboard.home",
        component: () => import("pages/admin/IndexPage.vue"),
      },
      {
        path: "role",
        name: "dashboard.role",
        component: () => import("pages/admin/role/IndexPage.vue"),
      },
      {
        path: "profile/edit/:slug",
        name: "dashboard.profile.edit",
        component: () => import("pages/admin/profile/EditPage.vue"),
      },
      {
        path: "banner",
        name: "dashboard.banner",
        component: () => import("pages/admin/banner/IndexPage.vue"),
      },
      {
        path: "role/add",
        name: "dashboard.role.add",
        component: () => import("pages/admin/role/AddPage.vue"),
      },
      {
        path: "role/edit/:id",
        name: "dashboard.role.edit",
        component: () => import("pages/admin/role/EditPage.vue"),
      },
      {
        path: "gallery",
        name: "dashboard.gallery",
        component: () => import("pages/admin/gallery/IndexPage.vue"),
      },
      {
        path: "gallery/add",
        name: "dashboard.gallery.add",
        component: () => import("pages/admin/gallery/AddPage.vue"),
      },
      {
        path: "gallery/edit/:slug",
        name: "dashboard.gallery.edit",
        component: () => import("pages/admin/gallery/EditPage.vue"),
      },
      {
        path: "testimonial",
        name: "dashboard.testimonial",
        component: () => import("pages/admin/testimonial/IndexPage.vue"),
      },
      {
        path: "testimonial/add",
        name: "dashboard.testimonial.add",
        component: () => import("pages/admin/testimonial/AddPage.vue"),
      },
      {
        path: "testimonial/edit/:slug",
        name: "dashboard.testimonial.edit",
        component: () => import("pages/admin/testimonial/EditPage.vue"),
      },
      {
        path: "user",
        name: "dashboard.user",
        component: () => import("pages/admin/user/IndexPage.vue"),
      },
      {
        path: "user/add",
        name: "dashboard.user.add",
        component: () => import("pages/admin/user/AddPage.vue"),
      },
      {
        path: "user/edit/:slug",
        name: "dashboard.user.edit",
        component: () => import("pages/admin/user/EditPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
