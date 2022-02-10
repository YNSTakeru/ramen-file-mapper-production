import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { latLng } from "leaflet";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const setFilter = (state) => {
  let filteredChecks = state.shops.map(() => false);
  let filteredShops;
  if (state.selectedCategory.length > 0) {
    filteredShops = state.shops.filter((shop) => {
      for (const shopCategory of shop.shopInfo.category) {
        for (const selectedCategory of state.selectedCategory) {
          if (shopCategory.indexOf(selectedCategory) !== -1) {
            return true;
          }
        }
      }
      return false;
    });
  } else {
    filteredShops = state.shops.map((shop) => shop);
  }
  if (state.selectedPrefectures.length > 0) {
    filteredShops = filteredShops.filter((shop) => {
      for (const selectedPrefectures of state.selectedPrefectures) {
        if (shop.addressInfo.prefecture.indexOf(selectedPrefectures) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  if (state.selectedCities.length > 0) {
    filteredShops = filteredShops.filter((shop) => {
      for (const selectedCities of state.selectedCities) {
        if (shop.addressInfo.city.indexOf(selectedCities) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  for (let i = 0; i < filteredShops.length; i++) {
    filteredChecks[filteredShops[i].shopInfo.id - 1] = true;
  }
  state.filteredChecks = filteredChecks;
};

export default new Vuex.Store({
  state: {
    shops: null,
    selectedPrefectures: [],
    selectedCities: [],
    filteredShops: null,
    filteredChecks: [],
    osakaCities: {
      prefecture: "大阪府",
      cities: [
        "大阪市",
        "豊中市",
        "吹田市",
        "堺市",
        "守口市",
        "高槻市",
        "池田市",
        "東大阪市",
      ],
    },
    naraCities: { prefecture: "奈良県", cities: ["奈良市"] },
    hyogoCities: { prefecture: "兵庫県", cities: ["神戸市"] },
    wakayamaCities: { prefecture: "和歌山県", cities: ["和歌山市", "有田郡"] },
    kyotoCities: { prefecture: "京都府", cities: ["京都市"] },
    cities: [
      "大阪市",
      "豊中市",
      "吹田市",
      "堺市",
      "守口市",
      "高槻市",
      "京都市",
      "池田市",
      "東大阪市",
      "奈良市",
      "神戸市",
      "和歌山市",
    ],
    selectedCategory: [],
    editDialog: false,
    loggedIn: false,
    userId: null,
    image: null,
    imageUrl: null,
    form: {},
  },
  getters: {
    shops(state) {
      const jsonData = require("@/json/ramen.json");
      state.shops = jsonData;
      return jsonData;
    },
    points(state) {
      return state.shops.map((shop) =>
        latLng(shop.addressInfo.latitude, shop.addressInfo.longitude)
      );
    },
    filteredChecks: (state) => state.filteredChecks,
    cities: (state) => state.cities,
    editDialog: (state) => state.editDialog,
    loggedIn: (state) => state.loggedIn,
    userId: (state) => state.userId,
    stateForm: (state) => state.form,
    stateImage: (state) => state.image,
    stateImageUrl: (state) => state.imageUrl,
  },
  mutations: {
    setPrefectureMutation(state, { value }) {
      state.selectedPrefectures = value;
      setFilter(state);
    },
    setCityMutation(state, { value }) {
      state.selectedCities = value;
      setFilter(state);
    },
    setCategoryMutation(state, { value }) {
      state.selectedCategory = value;
      setFilter(state);
    },
    setEditDialogMutation(state, { value }) {
      state.editDialog = value;
    },
    setUserIdMutation(state, { userId }) {
      state.userId = userId;
      state.loggedIn = true;
    },
    sendShopDataMutation(state, { obj }) {
      state.form = obj;
    },
    setProductImageMutation(state, { imgData }) {
      state.image = imgData.image;
      state.imageUrl = imgData.imageUrl;
    },
    setImageUrlMutation(state, { url }) {
      state.imageUrl = url;
    },
  },
  actions: {
    setPrefectureAction({ commit }, { value }) {
      commit("setPrefectureMutation", { value });
    },
    setCityAction({ commit }, { value }) {
      commit("setCityMutation", { value });
    },
    setCategoryAction({ commit }, { value }) {
      commit("setCategoryMutation", { value });
    },
    setEditDialogAction({ commit }, { value }) {
      commit("setEditDialogMutation", { value });
    },
    async sendShopDataAction({ commit }, { obj, imgData }) {
      const db = firebase.firestore();

      db.collection("shops")
        .doc(this.state.userId)
        .set({
          obj,
        })
        .then(() => {
          commit("sendShopDataMutation", { obj });
          if (imgData.imageUrl !== this.state.imageUrl) {
            const imageURL = `images/${this.state.userId}`;
            firebase
              .storage()
              .ref()
              .child(imageURL)
              .put(imgData.image)
              .then(() => {
                commit("setProductImageMutation", { imgData });
              })
              .catch((error) => {
                alert("画像のアップロードに失敗しました");
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log("エラー", error);
        });
    },
    setUserIdAction({ commit }, { userId }) {
      const db = firebase.firestore();
      const docRef = db.collection("shops").doc(userId);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            commit("sendShopDataMutation", { obj: doc.data().obj });
            // 画像の取得
            const imageURL = `images/${userId}`;
            firebase
              .storage()
              .ref()
              .child(imageURL)
              .getDownloadURL()
              .then((url) => {
                commit("setImageUrlMutation", { url });
              })
              .catch((error) => {
                alert("画像のダウンロードに失敗しました");
                console.log(error);
              });
          } else {
            console.log("そんなドキュメントはない");
          }
        })
        .catch((error) => {
          console.log("エラーだよ", error);
        });

      commit("setUserIdMutation", { userId });
    },
  },
  modules: {},
});
