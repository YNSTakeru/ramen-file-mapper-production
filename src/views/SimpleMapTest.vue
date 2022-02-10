 <template>
  <div class="map_wrapper" style="width: 100%">
    <!-- overflowは、はみ出してもスクロールで表示 -->
    <div style="height: 200px; overflow: auto">
      <!-- ポップアップの位置はwithPopup変数に格納 -->
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <!-- currentCenterでセンター座標を表示 -->
      <!-- currentZoomで現在のズーム度を表示 -->
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <!-- showLongTextで、テキストを出したり隠したりする -->
      <button @click="showLongText">Toggle long popup</button>
      <!-- v-ifでマップを表示したり隠したり -->
      <button @click="showMap = !showMap">Toggle map</button>
    </div>
    <!-- ここからmap表示 -->
    <!-- styleでマップをどこまで表示するか設定 -->
    <!-- centerUpdateで中央の位置を更新 -->
    <!-- zoomUpdateでzoomの位置を更新 -->
    <!-- l-tile-layer マップの読み込みとクレジットを載せる、必要！ -->
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <!-- マーカーを設置 -->
      <l-marker :lat-lng="withPopup" @click="stylingPopup">
        <!-- クリックするとポップアップするマーカーを設置 -->
        <l-popup :options="{ minWidth: 350, maxWidth: 600 }">
          <!-- I am a popupは最初の一文 -->
          <!-- innkerClickでアラートが呼ばれる -->

          <l-tooltip
            :options="{ permanent: false, interactive: false, sticky: true }"
          >
            <div>お出汁とスパイス 元祖エレクトロニカレー</div>
          </l-tooltip>

          <div class="secondary--text flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <a
                href="https://electronicurry.com/"
                target="_blank"
                rel="noopener"
              >
                <div class="text-lg secondary--text">
                  お出汁とスパイス 元祖エレクトロニカレー
                </div>
              </a>
              <a
                href="https://electronicurry.com/"
                target="_blank"
                rel="noopener"
              >
                <div class="relative">
                  <div
                    class="
                      absolute
                      text-xl
                      primary
                      top-2
                      right-2
                      p-2
                      rounded-full
                      secondary--text
                    "
                  >
                    ¥
                    <span class="text-lg">850</span>
                  </div>
                </div>
              </a>
            </div>

            <div>２０２２年１月７日（金） 紹介</div>
            <div class="mt-2 grid grid-cols-2 w-full gap-2">
              <div class="">住所</div>
              <div>大阪市都島区中野町3-5-13</div>
              <div class="">TEL</div>
              <div>06-7708-1833</div>
              <div class="">営業時間</div>
              <div>11:00～15:00 18:00～21:00</div>
            </div>

            <!-- <table class="">
              <tr>
                <td class="border-r b border-dashed">TEL</td>
                <td class="px-4"></td>
              </tr>
              <tr>
                <td class="border-r border-dashed">TEL</td>
                <td class="px-4">06-7708-1833</td>
              </tr>
            </table> -->
          </div>
        </l-popup>
      </l-marker>
      <!-- ポップアップ済みのマーカーを設置 -->
      <l-marker :lat-lng="withTooltip" @click="stylingPopup;">
        <!-- I am a tooltipをクリックするとインタラクティブする -->
        <!-- permanentをfalseにするとホバーで名前が出る -->
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
  data() {
    return {
      zoom: 10,
      center: latLng(34.64208188462634, 135.5117223421365),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(34.70221568663101, 135.52819796933701),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        //   一回のスクロールでどれだけ拡大縮小するか
        zoomSnap: 0.7,
      },
      showMap: true,
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    stylingPopup() {
      this.$nextTick(() => {
        const popup = document.querySelector(
          ".leaflet-popup-content-wrapper, .leaflet-popup-tip"
        );
        if (!popup.classList.contains("primary"))
          popup.classList.add("primary");
      });
    },
  },
};
</script>

<style scoped>
.map_wrapper {
  height: calc(100vh - 256px);
}

.shop_name {
  color: #b0a010;
}

.leaflet-popup {
  background-color: #90f;
}
</style>