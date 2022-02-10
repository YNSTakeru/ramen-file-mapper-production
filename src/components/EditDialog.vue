<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="indigo secondary--text"
        class="font-bold"
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ buttonText }}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="secondary--text font-bold"
          >マイページ</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <Howto />
        <v-btn icon dark @click="closeDialog">
          <v-icon color="secondary">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              ref="shopName"
              v-model="shopName"
              label="店舗名"
              :rules="rules"
              hide-details="auto"
              required
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              ref="address"
              v-model="address"
              label="住所"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-text-field
            ref="tel"
            v-model="tel"
            label="電話番号"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field
            ref="productName"
            v-model="productName"
            label="商品名"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-list-item>
        <v-list-item v-show="imageUrl" class="relative">
          <label
            for="image"
            class="image__wrapper bg-contain bg-center"
            :style="imageUrlStyle"
          >
            <input
              type="file"
              class="opacity-0"
              id="image"
              @change="pickedImagePhoto"
            />
          </label>
        </v-list-item>
        <v-list-item>
          <v-file-input
            v-model="image"
            label="商品画像を選択してください"
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg, image/bmp, image/jpg"
            @change="pickedImage"
          ></v-file-input>
        </v-list-item>
        <v-list-item>
          <v-text-field
            ref="price"
            v-model="price"
            label="価格"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-autocomplete
            ref="selectedCategory"
            v-model="selectedCategory"
            :items="category"
            chips
            color="primary lighten-2"
            label="カテゴリー"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.group"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-list-item>
        <v-list-item>
          <v-text-field
            ref="businessHours"
            v-model="businessHours"
            label="営業時間"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field
            ref="holiday"
            v-model="holiday"
            label="定休日"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field
            ref="url"
            v-model="url"
            label="サイトURL"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field
            ref="caution"
            v-model="caution"
            label="補足情報"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            閉じる
          </v-btn>
          <v-btn color="blue darken-1" text @click="setEditDialog">
            変更を保存
          </v-btn>
        </v-card-actions>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Howto from "@/components/Howto";
export default {
  components: {
    Howto,
  },
  props: {
    buttonText: {
      type: String,
    },
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      selectedCategory: [],
      name: "醤油",
      category: [
        { header: "スープ" },
        { name: "醤油", group: "スープ" },
        { name: "味噌", group: "スープ" },
        { name: "鶏白湯", group: "スープ" },
        { name: "塩", group: "スープ" },
        { name: "豚骨", group: "スープ" },
        { name: "牛骨", group: "スープ" },
        { name: "魚介", group: "スープ" },
        { name: "坦々麺", group: "スープ" },
        { name: "冷やしラーメン", group: "スープ" },
        { divider: true },
        { header: "味" },
        { name: "あっさり", group: "味" },
        { name: "スッキリ", group: "味" },
        { divider: true },
        { header: "都道府県" },
        { name: "山形", group: "都道府県" },
        { name: "京都", group: "都道府県" },
        { header: "その他" },
        { name: "創作", group: "その他" },
        { name: "鯛坦麺", group: "その他" },
        { name: "讃岐", group: "その他" },
        { name: "ミシュラン", group: "その他" },
      ],
      shopName: null,
      address: null,
      tel: null,
      productName: null,
      imageUrl: null,
      image: null,
      businessHours: null,
      holiday: null,
      price: null,
      url: null,
      caution: null,
      formHasError: false,
      rules: [(value) => !!value || "文字を入力してください"],
    };
  },
  computed: {
    ...mapGetters(["editDialog", "stateForm", "stateImage", "stateImageUrl"]),
    form() {
      return {
        shopName: this.shopName,
        address: this.address,
        tel: this.tel,
        productName: this.productName,
        businessHours: this.businessHours,
        price: this.price,
        holiday: this.holiday,
        url: this.url,
        caution: this.caution,
        selectedCategory: this.selectedCategory,
      };
    },
    imageUrlStyle() {
      return "background-image: url(" + this.imageUrl + ")";
    },
  },
  watch: {
    stateForm() {
      this.shopName = this.stateForm.shopName;
      this.address = this.stateForm.address;
      this.tel = this.stateForm.tel;
      this.productName = this.stateForm.productName;
      this.businessHours = this.stateForm.businessHours;
      this.price = this.stateForm.price;
      this.holiday = this.stateForm.holiday;
      this.url = this.stateForm.url;
      this.caution = this.stateForm.caution;
      this.selectedCategory = this.stateForm.selectedCategory;
    },
    stateImage() {
      this.image = this.stateImage;
    },
    stateImageUrl() {
      this.imageUrl = this.stateImageUrl;
    },
  },
  methods: {
    ...mapActions(["setEditDialogAction", "sendShopDataAction"]),
    setEditDialog() {
      this.submit();
      if (!this.formHasErrors) {
        this.sendShopDataAction({
          obj: this.form,
          imgData: { image: this.image, imageUrl: this.imageUrl },
        });
        this.closeDialog();
      }
    },
    closeDialog() {
      this.setEditDialogAction({ value: true });
      this.dialog = false;
    },
    remove(item) {
      const index = this.selectedCategory.indexOf(item.name);
      if (index >= 0) this.selectedCategory.splice(index, 1);
    },
    submit() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
    },
    pickedImage() {
      if (this.image === undefined) return;
      if (
        this.image.type === "image/jpeg" ||
        this.image.type === "image/png" ||
        this.image.type === "image/jpg" ||
        this.image.type === "image/bmp"
      ) {
        const image = document.querySelector(".image__wrapper");
        console.log(image);
        this.imageUrl = URL.createObjectURL(this.image);
        image.style.backgroundImage = "url(" + this.imageUrl + ")";
      }
    },
    pickedImagePhoto(event) {
      if (this.image === undefined) return;
      const image = document.querySelector(".image__wrapper");
      this.imageUrl = URL.createObjectURL(event.target.files[0]);
      image.style.backgroundImage = "url(" + this.imageUrl + ")";
      this.image = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.image__wrapper {
  height: 220px;
  width: auto;
}
</style>