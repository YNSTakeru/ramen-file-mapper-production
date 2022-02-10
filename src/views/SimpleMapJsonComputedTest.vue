 <template>
  <div class="map_wrapper relative" style="width: 100%">
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
      <l-marker
        v-for="(shop, s_i) in shops"
        :key="s_i"
        :lat-lng="points[s_i]"
        @click="stylingPopup"
        :visible="filteredChecks[s_i]"
      >
        <l-icon
          v-if="shop.shopInfo.icon"
          :icon-size="[40, 47]"
          :icon-anchor="[16, 37]"
          :icon-url="require('@/assets/icons/' + shop.shopInfo.icon)"
        >
        </l-icon>
        <l-icon
          v-if="!shop.shopInfo.icon"
          :icon-size="[40, 47]"
          :icon-anchor="[16, 37]"
          :icon-url="require('@/assets/ramen.svg')"
        >
        </l-icon>
        <l-popup :options="{ minWidth: 300, maxWidth: 600 }">
          <l-tooltip
            :options="{ permanent: false, interactive: false, sticky: true }"
          >
            <div>{{ shop.shopInfo.shopName }}</div>
          </l-tooltip>

          <div class="secondary--text flex flex-col gap-2 font-bold">
            <div class="flex flex-col gap-2">
              <a :href="shop.shopInfo.url" target="_blank" rel="noopener">
                <div
                  class="
                    text-lg
                    secondary--text
                    transition-opacity
                    ease-in-out
                    duration-1000
                    hover:opacity-80
                  "
                >
                  {{ shop.shopInfo.shopName }}
                </div>
              </a>
              <a :href="shop.shopInfo.url" target="_blank" rel="noopener">
                <div class="relative">
                  <img
                    src="@/assets/error.jpg"
                    :alt="shop.shopInfo.shopName + '店のラーメン画像'"
                    class="
                      object-cover
                      w-full
                      h-auto
                      hover:opacity-80
                      transition-opacity
                      duration-1000
                    "
                  />

                  <div
                    class="
                      absolute
                      text-xl
                      bg-indigo-600
                      top-2
                      right-2
                      p-2
                      rounded-full
                      secondary--text
                    "
                  >
                    ¥
                    <span class="text-lg">{{ shop.shopInfo.price }}</span>
                  </div>
                </div>
              </a>
            </div>

            <div>{{ getbroadCastDate(shop.shopInfo.broadCastDate) }} 紹介</div>
            <div class="mt-2 flex flex-col items-start w-full gap-2">
              <div>
                <div class="text-xs">商品名</div>
                <div class="">{{ shop.shopInfo.productName }}</div>
              </div>
              <div>
                <div class="text-xs">住所</div>
                <div class="">{{ shop.addressInfo.address }}</div>
              </div>
              <div>
                <div class="text-xs" v-show="shop.shopInfo.tel">TEL</div>
                <div class="" v-show="shop.shopInfo.tel">
                  {{ shop.shopInfo.tel }}
                </div>
              </div>
              <div>
                <div class="text-xs">営業時間</div>
                <div class="">
                  <span
                    v-for="(bhs, index) in shop.shopInfo.businessHours.weeks"
                    :key="index"
                  >
                    <span v-show="Object.keys(bhs)[0] === 'sns'">
                      <a :href="bhs.sns" target="_blank" rel="noopener">
                        <div
                          class="
                            secondary--text
                            rounded-full
                            w-40
                            p-2
                            text-center
                            font-bold
                            bg-indigo-600
                            hover:bg-indigo-400
                            transition
                            ease-in-out
                            duration-1000
                          "
                        >
                          詳細はこちらをクリック
                        </div>
                      </a>
                    </span>
                    <div
                      class="text-xs pt-1"
                      v-show="Object.keys(bhs)[0] !== 'sns' && bhs.begin"
                    >
                      <span
                        >{{ getWeekDay(bhs.begin) }}曜日
                        <span>〜{{ getWeekDay(bhs.end) }}曜日</span>
                      </span>
                    </div>
                    <div v-for="(bs, value, index) in bhs.bhs" :key="index">
                      <span>{{ bs.begin }}〜{{ bs.end }}</span>
                      <span class="pl-4" v-show="bs.lo">
                        ラストオーダー{{ bs.lo }}
                      </span>
                    </div>
                    <div class="text-xs py-1" v-show="bhs.weekday">平日</div>
                    <div v-for="(bs, value, index) in bhs.weekday" :key="index">
                      <span>{{ bs.begin }}〜{{ bs.end }}</span>
                      <span class="pl-4" v-show="bs.lo"
                        >ラストオーダー{{ bs.lo }}
                      </span>
                      <span v-show="value !== bhs.weekday.length - 1">, </span>
                    </div>
                    <div class="text-xs py-1" v-show="bhs.holiday">
                      土曜日、日曜日、祝日
                    </div>
                    <div v-for="(bs, value, index) in bhs.holiday" :key="index">
                      <span>{{ bs.begin }}〜{{ bs.end }}</span>
                      <span class="pl-4" v-show="bs.lo"
                        >ラストオーダー{{ bs.lo }}</span
                      >
                    </div>
                    <div class="text-xs py-1" v-show="bhs.regularHoliday">
                      定休日
                    </div>
                    <span v-show="bhs.regularHoliday">{{
                      bhs.regularHoliday
                    }}</span>
                  </span>
                </div>
              </div>
              <div>
                <div v-show="shop.shopInfo.caution">補足情報</div>
                <div v-show="shop.shopInfo.caution" class="col-span-2">
                  {{ shop.shopInfo.caution }}
                </div>
              </div>
              <div>
                <div v-show="shop.shopInfo.sns">
                  <div v-show="shop.shopInfo.sns"></div>
                  <div class="flex justify-start gap-2">
                    <Link
                      :name="'GoogleMap'"
                      :show="shop.shopInfo.googleMap ? true : false"
                      :link="shop.shopInfo.googleMap"
                    />
                    <Link
                      :name="'Twitter'"
                      :show="shop.shopInfo.twitter ? true : false"
                      :link="shop.shopInfo.twitter"
                    />
                    <Link
                      :name="'Instagram'"
                      :show="shop.shopInfo.instagram ? true : false"
                      :link="shop.shopInfo.instagram"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  LIcon,
} from "vue2-leaflet";
import { mapGetters } from "vuex";
import Link from "@/components/Link";
export default {
  name: "SimpleMapJsonTest",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    Link,
    LIcon,
  },
  computed: {
    ...mapGetters(["shops", "points", "filteredChecks"]),
  },
  data() {
    return {
      zoom: 10,
      center: latLng(34.64208188462634, 135.5117223421365),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(34.70221568663101, 135.52819796933701),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.7,
      },
      showMap: true,
      weeks: ["日", "月", "火", "水", "木", "金", "土"],
    };
  },
  mounted() {},
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    stylingPopup() {
      this.$nextTick(() => {
        const popup = document.querySelectorAll(
          ".leaflet-popup-content-wrapper"
        );
        if (!popup[popup.length - 1].classList.contains("primary"))
          popup[popup.length - 1].classList.add("primary");
      });
    },
    getbroadCastDate(broadCastDate) {
      const date = new Date(broadCastDate);
      return `${date.getFullYear()}年${
        1 + date.getMonth()
      }月${date.getDate()}日(${this.weeks[date.getDay()]})`;
    },
    getWeekDay(weekDay) {
      return this.weeks[weekDay];
    },
    clickHandler() {
      window.alert("and mischievous");
    },
  },
};
</script>

<style scoped>
.map_wrapper {
  width: 100vw;
  height: calc(100vh - 64px);
}
</style>