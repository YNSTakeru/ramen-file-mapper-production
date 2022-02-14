<template>
  <div class="flex items-center z-1001">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/ramen.svg"
        transition="scale-transition"
        width="40"
      />
      <div class="secondary--text font-bold text-sm md:text-xl">
        ラーメンファイルマッパー
      </div>
    </div>
    <v-spacer></v-spacer>
    <LoginDialog v-if="!loggedIn()" />
    <EditDialog v-if="loggedIn()" :buttonText="'マイページ'" />
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog";
import EditDialog from "@/components/EditDialog";
import { mapGetters } from "vuex";
export default {
  components: {
    LoginDialog,
    EditDialog,
  },
  data() {
    return {};
  },
  watch: {
    editDialog: {
      handler(newValue) {
        this.edialog = newValue;
      },
      deep: true,
    },
  },
  methods: {
    ...mapGetters(["editDialog", "loggedIn"]),
  },
};
</script>

<style>
.z-1001 {
  z-index: 1001;
}
</style>