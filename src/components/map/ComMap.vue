<template>
    <div id="map"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, toRefs} from 'vue';

//defineEmits
const emit = defineEmits(['select', 'search-completed', 'markerAdded']);
//defineProps

//TODO maxMarkers default 변경 예정 .

const props = defineProps({
    canAddMultipleMarkers: {
        type: Boolean,
        default: false
    },
    maxMarkers: {
        type: Number,
        default: Infinity
    }
});
//defineExpose
/** Exposed Methods **/
defineExpose({search, clear});

const map = ref<kakao.maps.Map | null>(null);
const marker = ref<kakao.maps.Marker | null>(null);
const geocoder = ref<kakao.maps.services.Geocoder | null>(null);
const address = ref<string>('');
const markers = ref<kakao.maps.Marker[]>([]); // 추가: 마커들을 저장할 배열 레퍼런스

const {canAddMultipleMarkers, maxMarkers} = toRefs(props);
//TODO async, await 형식으로 변경 예정 .
function loadMap() {
    if (document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]')) {
        kakao.maps.load(initMap);
        return;
    }
    const key = import.meta.env.VITE_KAKAOMAP_KEY;
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.onload = () => kakao.maps.load(initMap);
    document.head.appendChild(script);
}

/** Handlers **/
function initMap() {
    const container = document.getElementById('map') as HTMLElement;
    const options = {center: new kakao.maps.LatLng(37.2312, 127.071), level: 5};
    const markerPosition = options.center;
    map.value = new kakao.maps.Map(container, options);
    marker.value = new kakao.maps.Marker({map: map.value, position: markerPosition});

    geocoder.value = new kakao.maps.services.Geocoder();
    geocoder.value.coord2Address(options.center.getLng(), options.center.getLat(), updateAddress);

    kakao.maps.event.addListener(map.value, 'click', onMapClick);
}
/**
 * 지도 클릭 시 클릭한 위치의 좌표 정보를 통해 주소를 요청하고 해당 좌표에 마커를 표시한다.
 * @param event - 클릭한 위치의 좌표
 */

function onMapClick(event: kakao.maps.event.MouseEvent): void {
    const coords = event.latLng;
    emit('select', event);
    if (geocoder.value) {
        geocoder.value.coord2Address(coords.getLng(), coords.getLat(), updateAddress);
        emit('search-completed', address.value);
    }
    createMarker(coords.getLat(), coords.getLng());
}

/**
 * 주소 정보에 해당하는 좌표값을 요청.
 * @param address
 */

function searchByAddress(address: string) {
    if (geocoder.value) {
        geocoder.value.addressSearch(address, handleSearchResult);
    }
}

/**
 * 좌표 값에 해당하는 도로명 주소 정보를 요청한다.
 * @param coords
 */

function searchByCoord(coords: [number, number]) {
    if (geocoder.value) {
        geocoder.value.coord2Address(coords[0], coords[1], updateAddress);
    }
}

/**
 * 값이 없을땐 초기화
 * @param value
 */
function search(value: string | [number, number]) {
    if (!value) return kakao.maps.load(initMap);
    typeof value === 'string' ? searchByAddress(value) : searchByCoord(value);
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

//TODO markers 수 컨트롤 예정 - 수정중
function createMarker(lat, lng) {
    if (!canAddMultipleMarkers.value || markers.value.length > maxMarkers.value) {
        return;
    }
    if (map.value) {
        const marker = new kakao.maps.Marker({
            map: map.value,
            position: new kakao.maps.LatLng(lat, lng)
        });
        markers.value.push(marker); // Marker 추가를 배열에 추가
        emit('markerAdded', marker);
    }
}
/**
 * 좌표로 상세 주소 정보를 address 위치에 보여즘
 *
 */
function updateAddress(result: any, status: kakao.maps.services.Status) {
    if (status === kakao.maps.services.Status.OK) {
        address.value = result[0].address.address_name;
        emit('search-completed', address.value);
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
 * 지도 초기화(기존위치로 이동)
 */
function clear(): void {
    kakao.maps.load(initMap);
}

//TODO async, await 형식으로 변경 예정 .
onMounted(() => {
    loadMap();
});
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>
