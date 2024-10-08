<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="row">
        <div id="map" @click="handleClick" ></div>
        <div id="info">
          <div id="centerAddr">
            {{ centerAddr }}
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted ,ref} from 'vue';
export default defineComponent({
  name: 'KakaoMap',
  setup() {
    const map = ref(null);
    let marker = ref<any>(null);
    let infowindow = ref<any>(null);
    const geocoder = ref<any>(null);
    const centerAddr = ref('');

    function searchDetailAddrFromCoords (coords: any, callback: Function) {
      geocoder.value.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    onMounted(() => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(initMap);
        script.src =
          '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5de7bb5646496ded9485a7308b93b729&libraries=services';
        document.head.appendChild(script);
      }
    });

    function initMap() {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.2312, 127.0710),
        level: 5,
      };
      map.value = new kakao.maps.Map(container, options);
      geocoder.value = new kakao.maps.services.Geocoder();
      const markerPosition = options.center

      marker = new kakao.maps.Marker({
        map: map.value,
        position: markerPosition
      });

      infowindow = new kakao.maps.InfoWindow({zindex: 1 });

    }

    function handleClick(){
      kakao.maps.event.addListener(map.value, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            centerAddr.value = !!result[0].road_address ?
              `도로명주소 : ${result[0].road_address.address_name}` :
              `지번 주소 : ${result[0].address.address_name}`;

            marker = new kakao.maps.Marker({
              map: map.value,
              position: mouseEvent.latLng
            });
            infowindow.setContent( centerAddr.value);
            infowindow.open(map.value, marker);
          }
        });
      });
    }

    return {
      map,
      marker,
      infowindow,
      geocoder,
      centerAddr,
      handleClick
    };
  }

});
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}


</style>
