<template>
    <q-page class="q-pa-md">
        <div id="map"></div>
        <q-btn class="q-mt-md" color="primary" label="주소 검색" @click="openPopup" />
        <PostcodeDialog ref="popup" @apply="formatData" />
        <q-input class="textarea" v-model="centerAddr" label="map data" filled type="textarea" readonly />
    </q-page>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import PostcodeDialog from 'pages/postcode/PostcodeDialog.vue';
import {Postcode} from 'src/defines/postcode';

const map = ref<kakao.maps.Map | null>(null);
const marker = ref<kakao.maps.Marker | null>(null);
const geocoder = ref<kakao.maps.services.Geocoder | null>(null);
const centerAddr = ref('');
const popup = ref<typeof PostcodeDialog | null>(null);

function initMap(): void {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.2312, 127.071),
        level: 5
    };
    const markerPosition = options.center;

    map.value = new kakao.maps.Map(container as HTMLElement, options);
    geocoder.value = new kakao.maps.services.Geocoder();
    marker.value = new kakao.maps.Marker({
        map: map.value,
        position: markerPosition
    });

    /**
     * 지도에 위치 클릭 시 해당 좌표 값의 주소 정보를 요청한다.
     */
    kakao.maps.event.addListener(map.value, 'click', function (position: kakao.maps.event.MouseEvent) {
        if (geocoder.value) {
            const coords = position.latLng;
            geocoder.value.coord2Address(coords.getLng(), coords.getLat(), detailAddrFromCoords);
            displayMarker(coords);
        }
    });
}

/**
 * 선택된 주소의 좌표 해당 위치로 지도 중심 이동 및 마커 이동
 * @param point
 */
function displayMarker(point: kakao.maps.LatLng): void {
    if (marker.value) {
        marker.value.setPosition(point);
    }
}

/**
 * 주소 정보에 해당 좌표값 요청
 * @param places
 */
function displayPlace(places: string): void {
    if (geocoder.value) {
        geocoder.value.addressSearch(places, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const latlng = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
                displayMarker(latlng);
                map.value?.setCenter(latlng);
            }
        });
    }
}

/**
 * 좌표로 상세 주소 정보를 centerAddr 위치에 보여즘
 *
 */
const detailAddrFromCoords = function (result, status: kakao.maps.services.Status): void {
    if (status === kakao.maps.services.Status.OK) {
        centerAddr.value = result[0].address.address_name;
    }
};
/**
 * 카카오 우편번호 서비스 결과 값을 보기 좋은 형태로  변환.
 * @param data
 */
const formatData = (data: Postcode): void => {
    centerAddr.value = data.address;
    displayPlace(centerAddr.value);
};

function openPopup(): void {
    if (popup.value) {
        popup.value.open();
    }
}

const loadMap = (): void => {
    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=5de7bb5646496ded9485a7308b93b729&autoload=false&libraries=services';
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
