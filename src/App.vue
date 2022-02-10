<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <Header class="login__dialog" />
    </v-app-bar>

    <v-main class="relative">
      <SimpleMapJsonComputedTest class="" />
      <SearchDialogs class="dialog_position" />
    </v-main>
  </v-app>
</template>

<script>
import SimpleMapJsonComputedTest from "@/views/SimpleMapJsonComputedTest";
import SearchDialogs from "@/components/SearchDialogs";
import Header from "@/global/Header";

export default {
  name: "App",
  components: {
    SimpleMapJsonComputedTest,
    SearchDialogs,
    Header,
  },
  data: () => ({}),
};
</script>

<style scoped>
.dialog_position {
  position: absolute;
  z-index: 1000;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
}

.login__dialog {
  z-index: 2000;
}
</style>
