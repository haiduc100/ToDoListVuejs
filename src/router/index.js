import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/to-do",
      name: "To do list",
      component: () => import("../views/ToDo/ToDoList.vue"),
      meta: {
        title: "To Do List",
      },
    },
  ],
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.name ?? "Home Page";
  });
});
export default router;
