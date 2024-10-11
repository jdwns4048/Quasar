<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-gutter-sm">
      <q-page class="q-pa-md">
        <div id="map"></div>
        <q-btn class="q-mt-md" color="primary" label="주소 검색" @click="openPopup"/>
        <PostcodeDialog ref="popup" @apply="getAddress"/>
        <q-input class="textarea" v-model="centerAddr" label="map data" filled type="textarea" readonly/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import PostcodeDialog from 'pages/address/PostcodeDialog.vue';
import {Address} from 'src/defines/address';

const map = ref<kakao.maps.Map>();
const marker = ref<kakao.maps.Marker>();
const geocoder = ref<any>(null);
const centerAddr = ref('');
const popup = ref(PostcodeDialog);

function initMap() {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.2312, 127.0710),
    level: 5,
  };
  const markerPosition = options.center;

  map.value = new kakao.maps.Map(container as HTMLElement, options);
  geocoder.value = new kakao.maps.services.Geocoder();
  marker.value = new kakao.maps.Marker({
    map: map.value,
    position: markerPosition
  });

  /**
   * 좌표 값에 해당하는 주소 정보를 요청한다.
   */
  kakao.maps.event.addListener(map.value, 'click', function (position) {
    const coords = position.latLng;
    geocoder.value.coord2Address(coords.getLng(), coords.getLat(), searchDetailAddrFromCoords);
    displayMarker(coords);
  });
}

/**
 * 선택된 주소의 좌표 해당 위치로 지도 중심 이동 및 마커 이동
 * @param point
 */
function displayMarker(point) {
  if (marker.value) {
    marker.value.setMap(null);
  }
  marker.value = new kakao.maps.Marker({
    map: map.value,
    position: point
  });

}

/**
 * 주소 정보에 해당 좌표값 요청
 * @param places
 * @param callback
 */
function displayPlaces(places, callback: Function) {
  geocoder.value.addressSearch(places, callback)
}

/**
 * 좌표로 상세 주소 정보를 centerAddr 위치에 보여즘
 *
 */
const searchDetailAddrFromCoords = function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    centerAddr.value = result[0].address.address_name;
  }
}
/**
 * 카카오 우편번호 서비스 결과 값을 보기 좋은 형태로  변환.
 * @param data
 */
const getAddress = (data: Address) => {
  centerAddr.value = data.address;
  displayPlaces(centerAddr.value, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      displayMarker(coords);
      // 지도의 중심을 결과값으로 받은 위치로 이동
      map.value?.setCenter(coords);
    }
  });
};

function openPopup() {
  popup.value.open();
}

const loadMap = () => {
  const script = document.createElement('script');
  script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=5de7bb5646496ded9485a7308b93b729&autoload=false&libraries=services';
  script.onload = () => kakao.maps.load(initMap);
  document.head.appendChild(script);
}
onMounted(() => {
  loadMap();
});

</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}

.textarea {
  margin-top: 20px;
}
</style>
