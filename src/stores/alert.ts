import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    type: null,
    message: null,
    visible: false,
  }),
  actions: {
    success(message) {
      this.visible = true;
      this.type = "success";
      this.message = message;
    },
    warning(message) {
      this.visible = true;
      this.type = "warning";
      this.message = message;
    },
    error(message) {
      this.visible = true;
      this.type = "error";
      this.message = message;
    },
    clear() {
      this.visible = false;
      this.type = null;
      this.message = null;
    },
  },
});
