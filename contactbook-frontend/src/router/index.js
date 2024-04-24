
import {
    createWebHistory,
    createRouter
} from "vue-router";
import ContactBook from "@/views/Book/Book.vue";
const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/auth.vue"),
    },
    {
        path: "/",
        name: "book",
        component: ContactBook,
    },
    {
        path: "/",
        name: "publisher",
        component: () => import("@/views/Publisher/Publisher.vue"),
    },
    {
        path: "/",
        name: "staff",
        component: () => import("@/views/Staff/Staff.vue"),
    },
    {
        path: "/",
        name: "reader",
        component: () => import("@/views/Reader/Reader.vue"),
    },
    {
        path: "/",
        name: "rent",
        component: () => import("@/views/Rent/Rent.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/contact/:id",
        name: "contact.edit",
        component: () => import("@/views/Book/BookEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/rent/:id",
        name: "rent.edit",
        component: () => import("@/views/Rent/RentEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/publisher",
        name: "publisher.create",
        component: () => import("@/views/Publisher/PublisherCreate.vue"),
    },
    {
        path: "/rent",
        name: "rent.create",
        component: () => import("@/views/Rent/RentCreate.vue"),
    },
    {
        path: "/reader",
        name: "reader.create",
        component: () => import("@/views/Reader/ReaderCreate.vue"),
    },
    {
        path: "/contacts",
        name: "contact.create",
        component: () => import("@/views/Book/BookCreate.vue"),
    },
    {
        path: "/staff",
        name: "staff.create",
        component: () => import("@/views/Staff/StaffCreate.vue"),
    },
    {
        path: "/publisher/:id",
        name: "publisher.edit",
        component: () => import("@/views/Publisher/PublisherEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/staff/:id",
        name: "staff.edit",
        component: () => import("@/views/Staff/StaffEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/reader/:id",
        name: "reader.edit",
        component: () => import("@/views/Reader/ReaderEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
];
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,

});
export default router;