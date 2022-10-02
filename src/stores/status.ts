import { defineStore } from "pinia";
import axios from "axios";

export const useStatusStore = defineStore({
  id: "status",
  state: () => ({
    status: 'checking',
    message: 'Attempting to connect to server...',
    visible: false,
  }),
  actions: {
    async check() {
      this.status = 'checking';
      this.message = 'Attempting to connect to server...'
      return await axios
      .get(import.meta.env.VITE_SERVER_URI + "/info/server")
      .then((response) => {
          this.status = 'online';
          this.message = 'Connected to server';
          this.visible = false;
        })
        .catch((error) => {
          this.status = 'offline';
          this.message = 'Unable to communicate with server. Please check Discord for updates';
          this.visible = true;
        });
    },
  },
});
