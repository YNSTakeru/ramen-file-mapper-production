<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-top-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="white primary--text"
        class="font-bold"
        dark
        v-bind="attrs"
        v-on="on"
      >
        ログイン
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="secondary--text font-bold"
          >ログイン</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon color="secondary">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list three-line subheader class="p-20 px-10">
        <v-card-actions
          class="
            flex
            justify-center
            flex-col
            gap-8
            bg-gray-200
            p-10
            md:w-96
            mx-auto
          "
        >
          <v-btn @click="login" v-if="!loggedIn" color="white primary--text"
            >Googleアカウントでログイン</v-btn
          >
          <EditDialog v-if="loggedIn" :buttonText="'編集画面を開く'" />
          <v-btn color="blue darken-1" text @click="dialog = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import EditDialog from "@/components/EditDialog";
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      rules: [(value) => !!value || "文字を入力してください"],
    };
  },
  computed: {
    ...mapGetters(["editDialog", "loggedIn"]),
  },
  methods: {
    ...mapActions(["setEditDialogAction", "setUserIdAction"]),
    setEditDialog() {
      this.setEditDialogAction({ value: !this.editDialog });
      this.dialog = false;
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          this.setUserIdAction({ userId: user.uid });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },
  },
  components: {
    EditDialog,
  },
};
</script>

<style scoped>
</style>