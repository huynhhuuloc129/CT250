import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "home page",
        component: () => import("@/views/UserHomePage.vue"),
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
        path: "/personal-information",
        name: "personal information",
        component: () => import("@/views/PersonalInformation.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;