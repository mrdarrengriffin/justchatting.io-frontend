import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/scss/style.scss";

import Alert from "./components/ui/Alert.vue";
import LoginCard from "./components/ui/LoginCard.vue";
import RegisterCard from "./components/ui/RegisterCard.vue";


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("Alert", Alert);
app.component("LoginCard", LoginCard);
app.component("RegisterCard", RegisterCard);

app.config.globalProperties.$auth = false;

app.mount("#app");
