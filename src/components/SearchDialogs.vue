<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="font-bold secondary--text"
        >
          絞り込みボタン
        </v-btn>
      </template>
      <v-card class="primary secondary--text" dark>
        <v-card-title>
          <span class="text-h5">マップに表示される店舗を絞り込みます</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="category"
                  label="種類で絞り込む"
                  multiple
                  @change="setCategory"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="getPrefectures"
                  label="都道府県で絞り込む"
                  multiple
                  @change="setPrefecture"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="cities()"
                  label="市、郡で絞り込む"
                  multiple
                  @change="setCity"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="dialog = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      searchAddress: "hoge",
      getPrefectures: ["大阪府", "兵庫県", "京都府", "和歌山県", "奈良県"],
      category: [
        "醤油",
        "味噌",
        "鶏白湯",
        "あっさり",
        "スッキリ",
        "山形",
        "塩",
        "豚骨",
        "牛骨",
        "創作",
        "京都",
        "鯛担麺",
        "魚介",
        "讃岐",
        "ミシュラン",
        "坦々麺",
        "冷やしラーメン",
      ],
    };
  },
  computed: {},
  methods: {
    ...mapGetters(["filteredShops", "cities"]),
    ...mapActions([
      "setPrefectureAction",
      "setCityAction",
      "setCategoryAction",
    ]),
    setPrefecture(event) {
      this.setPrefectureAction({ value: event });
    },
    setCity(event) {
      this.setCityAction({ value: event });
    },
    setCategory(event) {
      this.setCategoryAction({ value: event });
    },
  },
};
</script>

<style>
</style>