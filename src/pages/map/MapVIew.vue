<template>
    <q-page class="q-pa-md">
        <com-map-view ref="mapViewRef" @select="handleMapClick" @search-completed="handleSearchCompletion" :positionMarkers="positionMarkers"></com-map-view>
        <q-input class="textarea" v-model="address" label="map data" filled type="textarea" readonly />
    </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ComMapView from 'components/map/ComMap.vue';
const address = ref<string>('');
const mapViewRef = ref<typeof ComMapView | null>(null);
const positionMarkers = ref([
    {title: '농심', address: '서울시 동작구 여의대방로 112(신대방동)'},
    {title: '롯데백화점관악점', address: '서울 관악구 봉천로 209'},
    {title: '부산역', address: '부산 동구 중앙대로 206'}
]);

/**
 * 지도 클릭 이벤트의 정보
 * @param coordinates
 */
function handleMapClick(coordinates: any) {
    coordinates.value = coordinates;
}

/**
 * 주어진 주소 또는 좌표(위도와 경도)를 가지고 맵에서 검색을 수행합니다.
 * @param addressData
 */
function searchAddress(addressData: string | [number, number]) {
    if (mapViewRef.value) {
        mapViewRef.value.search(addressData);
    }
}

/**
 * 검색이 완료되었을 때 처리해주는 함수
 * address 값에 검색 결과를 설정합니다.
 *
 * @param {string} result - 검색 결과를 나타내는 문자열입니다.
 */
function handleSearchCompletion(result: string) {
    address.value = result;
}
</script>

<style scoped>
.textarea {
    margin-top: 20px;
}
</style>
