import { createRouter, createWebHistory } from "vue-router";
import { useAlertStore } from "@/stores/alert";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import BetterChatView from "../views/BetterChat.vue";
import OBSChatOverlay from "../views/obs/overlays/Chat.vue";
import SongRequestView from "../views/SongRequest.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //{ path: '/:pathMatch(.*)', component: HomeView },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/better-chat",
      name: "better-chat",
      component: BetterChatView,
    },
    {
      path: "/song-request",
      name: "song-request",
      component: SongRequestView,
    },
    {
      path: "/better-chat/:streamer",
      name: "better-chat-streamer",
      component: BetterChatView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/obs/overlay/chat/:streamer",
      component: OBSChatOverlay,
      name: "obs",
    }
    
  ],
});

router.afterEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();
})

export default router;
