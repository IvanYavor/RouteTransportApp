import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import RouteList from "./components/RouteList.vue";
import RouteForm from "./components/RouteForm.vue";
import TransportList from "./components/TransportList.vue";
import TransportForm from "./components/TransportForm.vue";

const routes = [
  { path: "/routes", component: RouteList },
  { path: "/routes/create", component: RouteForm },
  { path: "/routes/:id/edit", component: RouteForm },
  { path: "/transports", component: TransportList },
  { path: "/transports/create", component: TransportForm },
  { path: "/transports/:id/edit", component: TransportForm },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
createApp(App).use(router).mount("#app");
