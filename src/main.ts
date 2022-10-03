import { createApp } from "vue";
import { createPinia } from "pinia";
import VueSocketIO from 'vue-3-socket.io';

import App from "./App.vue";
import router from "./router";

import "./assets/scss/style.scss";

import Alert from "./components/ui/Alert.vue";
import LoginCard from "./components/ui/LoginCard.vue";
import RegisterCard from "./components/ui/RegisterCard.vue";
import Chat from "./components/better-chat/Chat.vue";
import ChatSidebar from "./components/better-chat/ChatSidebar.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(new VueSocketIO({
    connection: import.meta.env.VITE_SERVER_URI,
}));
app.component("Alert", Alert);
app.component("LoginCard", LoginCard);
app.component("RegisterCard", RegisterCard);
app.component("Chat", Chat);
app.component("ChatSidebar", ChatSidebar);

app.config.globalProperties.$auth = false;

app.mount("#app");
