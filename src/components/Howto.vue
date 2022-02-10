<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-top-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="indigo secondary--text"
        class="font-bold"
        dark
        v-bind="attrs"
        v-on="on"
      >
        使い方
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="secondary--text font-bold"
          >使い方</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon color="secondary">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list three-line subheader class="">
        <v-card-actions class="flex justify-center flex-col gap-8 p-10 mx-auto">
          <div class="bg-gray-200 p-10">
            マイページは以下の情報を登録、編集することができます。
            <ul class="flex flex-col gap-2 pt-4">
              <li v-for="(item, i) in items" :key="i">{{ item.text }}</li>
            </ul>
            <div class="pt-4">
              また、カテゴリーでは以下の4種類のグループ<br />（スープ、味、都道府県、その他)から登録することができます
            </div>
            <ul class="flex flex-col gap-1 pt-4">
              <li class="font-bold">スープ</li>
              <li class="pl-4" v-for="(soup, i) in soups" :key="i">
                {{ soup }}
              </li>
            </ul>
            <ul class="flex flex-col gap-1 pt-4">
              <li class="font-bold">味</li>
              <li class="pl-4">あっさり</li>
              <li class="pl-4">スッキリ</li>
            </ul>
            <ul class="flex flex-col gap-1 pt-4">
              <li class="font-bold">都道府県</li>
              <li class="pl-4">山形</li>
              <li class="pl-4">京都</li>
            </ul>
            <ul class="flex flex-col gap-1 pt-4">
              <li class="font-bold">その他</li>
              <li class="pl-4">創作</li>
              <li class="pl-4">鯛坦麺</li>
              <li class="pl-4">讃岐</li>
              <li class="pl-4">ミシュラン</li>
            </ul>
            <div class="pt-4">
              一覧にないカテゴリーを登録希望される場合は以下のメールアドレスまでご連絡ください
            </div>
            <div class="pt-2 flex justify-center">
              takeru.yanase1010@gmail.com
            </div>
            <div class="pt-4 flex flex-col flex-start gap-4">
              また、以下の画像の変更を保存ボタンを選択すると編集した内容が反映されます
              <div class="flex justify-center">
                <img
                  src="@/assets/changedSaveButton.png"
                  alt="変更を保存ボタン"
                  class="h-20 w-auto"
                />
              </div>
            </div>
          </div>
          <v-btn color="blue darken-1" text @click="dialog = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      rules: [(value) => !!value || "文字を入力してください"],
      items: [
        { text: "店舗名" },
        { text: "住所" },
        { text: "電話番号" },
        { text: "商品名" },
        { text: "画像" },
        { text: "価格" },
        { text: "営業時間" },
        { text: "定休日" },
        { text: "サイトURL" },
        { text: "補足情報" },
      ],
      soups: [
        "醤油",
        "味噌",
        "鶏白湯",
        "塩",
        "豚骨",
        "牛骨",
        "魚介",
        "坦々麺",
        "冷やしラーメン",
      ],
    };
  },
  computed: {
    ...mapGetters(["editDialog", "loggedIn"]),
  },
  methods: {
    ...mapActions(["setEditDialogAction", "setUserIdAction"]),
  },
  components: {},
};
</script>

<style scoped>
.information__wrapper {
  width: 1280px;
}
</style>