const routes = [
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/home/BerandaPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
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
    // meta: { requiresAuth: true, users: ["Admin", "Operator"] },
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
        path: "role",
        name: "dashboard.role",
        component: () => import("pages/admin/role/IndexPage.vue"),
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
        path: "user/edit/:id",
        name: "dashboard.user.edit",
        component: () => import("pages/admin/user/EditPage.vue"),
      },
      {
        path: "drug",
        name: "dashboard.drug",
        component: () => import("pages/admin/drug/IndexPage.vue"),
      },
      {
        path: "drug/add",
        name: "dashboard.drug.add",
        component: () => import("pages/admin/drug/AddPage.vue"),
      },
      {
        path: "drug/edit/:id",
        name: "dashboard.drug.edit",
        component: () => import("pages/admin/drug/EditPage.vue"),
      },
      {
        path: "payment",
        name: "dashboard.payment",
        component: () => import("pages/admin/payment/IndexPage.vue"),
      },
      {
        path: "payment/add",
        name: "dashboard.payment.add",
        component: () => import("pages/admin/payment/AddPage.vue"),
      },
      {
        path: "payment/edit/:id",
        name: "dashboard.payment.edit",
        component: () => import("pages/admin/payment/EditPage.vue"),
      },
      {
        path: "service",
        name: "dashboard.service",
        component: () => import("pages/admin/service/IndexPage.vue"),
      },
      {
        path: "service/add",
        name: "dashboard.service.add",
        component: () => import("pages/admin/service/AddPage.vue"),
      },
      {
        path: "service/edit/:id",
        name: "dashboard.service.edit",
        component: () => import("pages/admin/service/EditPage.vue"),
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
