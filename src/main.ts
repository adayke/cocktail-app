import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import App from "./App.vue";
import "./assets/styles/main.scss";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");
