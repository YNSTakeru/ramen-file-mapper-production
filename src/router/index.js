import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/simplemap",
    name: "SimpleMap",
    component: () =>
      import(/* webpackChunkName: "SimpleMap" */ "../views/SimpleMap.vue"),
  },
  {
    path: "/simplemaptest",
    name: "SimpleMapTest",
    component: () =>
      import(
        /* webpackChunkName: "SimpleMapTest" */ "../views/SimpleMapTest.vue"
      ),
  },
  {
    path: "/1",
    name: "SimpleMapJsonTest",
    component: () =>
      import(
        /* webpackChunkName: "SimpleMapJsonTest" */ "../views/SimpleMapJsonTest.vue"
      ),
  },
  {
    path: "/2",
    name: "SimpleMapJsonComputedTest",
    component: () =>
      import(
        /* webpackChunkName: "SimpleMapJsonComputedTest" */ "../views/SimpleMapJsonComputedTest.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
