import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import PrivacyPage from "./pages/PrivacyPage.vue";
import SupportPage from "./pages/SupportPage.vue";
import TermsPage from "./pages/TermsPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/privacy",
      name: "privacy",
      component: PrivacyPage
    },
    {
      path: "/terms",
      name: "terms",
      component: TermsPage
    },
    {
      path: "/support",
      name: "support",
      component: SupportPage
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/"
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 76,
        behavior: "smooth"
      };
    }

    return { top: 0 };
  }
});
