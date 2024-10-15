<template>
    <q-page class="q-pa-md">
        <div id="map"></div>
        <q-btn class="q-mt-md q-mr-md" color="primary" label="주소 검색" @click="openPopup" />
        <q-btn class="q-mt-md" color="primary" label="원위치(clear)" @click="clear" />
        <ComSearchAddressPopup ref="popup" />
        <q-input class="textarea" v-model="address" label="map data" filled type="textarea" readonly />
    </q-page>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import ComSearchAddressPopup from 'components/ComSearchAddressPopup.vue';
import {Postcode} from 'src/defines/postcode';
import {KakaoMap} from 'vue3-kakao-maps';
const map = ref<kakao.maps.Map | null>(null);
const marker = ref<kakao.maps.Marker | null>(null);
const geocoder = ref<kakao.maps.services.Geocoder | null>(null);
const address = ref<string>('');
const popup = ref<typeof ComSearchAddressPopup | null>(null);

function initMap(): void {
    const container = document.getElementById('map') as HTMLElement;
    const options = {center: new kakao.maps.LatLng(37.2312, 127.071), level: 5};
    const markerPosition = options.center;
ㄴ
    map.value = new kakao.maps.Map(container, options);
    geocoder.value = new kakao.maps.services.Geocoder();
    geocoder.value.coord2Address(options.center.getLng(), options.center.getLat(), updateAddress);
    marker.value = new kakao.maps.Marker({map: map.value, position: markerPosition});
    kakao.maps.event.addListener(map.value, 'click', selectMapPoint);
}

/**
 * 지도 클릭 시 클릭한 위치의 좌표 정보를 통해 주소를 요청하고 해당 좌표에 마커를 표시한다.
 * @param point - 클릭한 위치의 좌표
 */
function selectMapPoint(point: kakao.maps.event.MouseEvent): void {
    const coords = point.latLng;
    if (geocoder.value) {
        geocoder.value.coord2Address(coords.getLng(), coords.getLat(), updateAddress);
        setMarker(coords);
    }
}

/**
 * 선택된 위치로 마커 이동
 * @param point
 */
function setMarker(point: kakao.maps.LatLng): void {
    if (marker.value) {
        marker.value.setPosition(point);
    }
}

/**
 * 주소 정보에 해당하는 좌표값을 요청.
 * @param place
 */
function searchAddress(place: string): void {
    if (geocoder.value) {
        geocoder.value.addressSearch(place, handleSearchResult);
    }
}

/**
 * 주소 검색 결과를 처리하는 콜백 함수
 * @param result
 * @param status
 */
function handleSearchResult(result: any, status: kakao.maps.services.Status): void {
    if (status === kakao.maps.services.Status.OK) {
        const latlng = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
        setMarker(latlng);
        map.value?.setCenter(latlng);
    }
}

/**
 * 좌표로 상세 주소 정보를 address 위치에 보여즘
 *
 */
const updateAddress = function (result: any, status: kakao.maps.services.Status): void {
    if (status === kakao.maps.services.Status.OK) {
        address.value = result[0].address.address_name;
    }
};

/**
 * 주소 검색 팝업을 엽니다.
 */
async function openPopup(): Promise<void> {
    if (popup.value) {
        const data: Postcode = await popup.value.open();
        address.value = data.address;
        searchAddress(address.value);
    }
}


/**
 * 지도 초기화(기존위치로 이동)
 */

function clear(): void {
    kakao.maps.load(initMap);
}

const loadMap = (): void => {
    if (document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]')) {
        kakao.maps.load(initMap);
        return;
    }
    const key = import.meta.env.VITE_KAKAOMAP_KEY;
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.onload = () => kakao.maps.load(initMap);
    document.head.appendChild(script);
};

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
