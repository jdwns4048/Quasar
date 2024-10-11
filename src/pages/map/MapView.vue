<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="row q-gutter-sm">
      <div id="map" @click="mapClick" ></div>
      <q-page class="q-pa-md">
        <q-btn color="primary" label="주소 검색" @click="isOpened = true" />
        <PostcodeDialog v-model="isOpened" @onComplete="getAddress" />
        <q-input class="textarea" v-model="centerAddr" label="map data" filled type="textarea" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted ,ref} from 'vue';
import PostcodeDialog from 'pages/address/PostcodeDialog.vue';
import {Address} from 'src/defines/address';

export default defineComponent({
  name: 'KakaoMap',
  components: {PostcodeDialog},
  setup() {
    const map = ref<null | kakao.maps.Map>(null);
    const marker = ref<null | kakao.maps.Marker>(null);
    const geocoder = ref<any>(null);
    const centerAddr = ref('');
    const isOpened = ref(false);


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

    }
    /**
     * 선택된 주소의 좌표 해당 위치로 지도 중심 이동 및 마커 이동
     * @param point
     */
    function searchAddress(point){
      marker.value = new kakao.maps.Marker({
        map: map.value,
        position: point
      });
    }

    /**
     * 검색 결과 항목 클릭 시 지도 및 장소 정보 출력
     * @param places
     * @param callback
     */
    function displayPlaces(places,callback:Function){
      geocoder.value.addressSearch(places,callback)
    }


    function mapClick() {
      kakao.maps.event.addListener(map.value, 'click', function (position) {
        const coords = position.latLng;
        geocoder.value.coord2Address(coords.getLng(), coords.getLat(), searchDetailAddrFromCoords);
        searchAddress(coords);
      });
    }

    const searchDetailAddrFromCoords = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          centerAddr.value = result[0].address.address_name;
        }else{
          alert('status 확인')
        }
      }
    /**
     * 카카오 우편번호 서비스 결과 값을 보기 좋은 형태로  변환.
     * @param data
     */
    const getAddress = (data: Address) => {
      centerAddr.value=data.address;
      displayPlaces(centerAddr.value,function (result,status){
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          searchAddress(coords);

          // 지도의 중심을 결과값으로 받은 위치로 이동
          map.value.setCenter(coords);
        }
      });
    };

    const loadMap=()=>{
      const script = document.createElement('script');
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=5de7bb5646496ded9485a7308b93b729&autoload=false&libraries=services';
      script.onload = () => kakao.maps.load(initMap);
      document.head.appendChild(script);
    }
    onMounted(() => {
      loadMap();
    });

    return {
      map,
      marker,
      geocoder,
      centerAddr,
      isOpened,
      getAddress,
      mapClick
    };
  }

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

.info_window__content {
  width: 140px;
  text-align: center;
  font-size: 12px;
  padding: 6px 0;
  border-radius: 8px;
}
</style>
