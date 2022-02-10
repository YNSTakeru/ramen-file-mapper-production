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
      <l-marker :lat-lng="withPopup">
        <!-- クリックするとポップアップするマーカーを設置 -->
        <l-popup>
          <!-- I am a popupは最初の一文 -->
          <!-- innkerClickでアラートが呼ばれる -->
          <div @click="innerClick">
            I am a popup
            <!-- 以降はv-showで表示 -->
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <!-- ポップアップ済みのマーカーを設置 -->
      <l-marker :lat-lng="withTooltip">
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
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
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
  },
};
</script>

<style scoped>
.map_wrapper {
  height: calc(100vh - 293px);
}
</style>