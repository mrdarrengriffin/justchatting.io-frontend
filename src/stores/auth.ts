import { useAlertStore } from "./alert";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("authToken"),
  }),
  getters: {
    getToken() {
      return this.token;
    },
    getUserInfo() {
      const tokenParts = this.token.split(".");
      const tokenUserPart = tokenParts[1];
      return JSON.parse(atob(tokenUserPart));
    },
  },
  actions: {
    async login(email, password) {
      useAlertStore().clear();
      return await axios
        .post(import.meta.env.VITE_SERVER_URI + "/user/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("authToken", response.data.token);
          this.token = response.data.token;
          router.push("/");
          useAlertStore().success("Login successful!");
        })
        .catch((error) => {
          var data = error.response.data;
          if(!data){
            useAlertStore().error(error.message);
            return;
          }
          if(data && data.error){
            useAlertStore().error(data.error);
          }
          return data;
        });
    },
    async register(name, email, password) {
        useAlertStore().clear();
        return await axios
          .post(import.meta.env.VITE_SERVER_URI + "/user/register", {
            name: name,
            email: email,
            password: password,
          })
          .then((response) => {
            localStorage.setItem("authToken", response.data.token);
            this.token = response.data.token;
            useAlertStore().success("Registration successful! Welcome!");
            router.push("/");
          })
          .catch((error) => {
            var data = error.response.data;
            if(data && data.error){
              useAlertStore().error(data.error);
            }
            return data;
          });
      },
    logout() {
      this.token = null;
      localStorage.removeItem("authToken");
      router.push("/login");
    },
  },
});
