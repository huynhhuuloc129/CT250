import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "home page",
        component: () => import("@/views/UserHomePage.vue"),
    },
    {
        path: "/tenant",
        name: "tenant home page",
        component: () => import("@/views/TenantHomePage.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/myroom",
        name: "myroom",
        component: () => import("@/views/MyRoom.vue"),
    },
    {
        path: "/room-info",
        name: "room info",
        component: () => import("@/views/RoomInfo.vue"),
    },
    {
        path: "/personal-information",
        name: "personal information",
        component: () => import("@/views/PersonalInformation.vue"),
    },
    {
        path: "/tenant-personal-information",
        name: "tenant personal information",
        component: () => import("@/views/TenantPersonalInformation.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;