import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#D11F1F",
        secondary: "#ECFC3C",
        accent: "#4d8b31",
        error: "#8e3b46",
        info: "#2196F3",
        success: "#2c6e49",
        warning: "#FB8C00",
      },
    },
  },
});
