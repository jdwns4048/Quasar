<template>
    <q-page class="q-pa-md">
        <com-map-view ref="mapViewRef" @select="handleMapClick" @search-completed="handleSearchCompletion"></com-map-view>
        <q-btn class="q-mt-md q-mr-md" color="primary" label="주소 검색" @click="openPopup" />
        <q-btn class="q-mt-md" color="primary" label="원위치(clear)" @click="clear" />
        <com-search-address-popup ref="popup" />
        <q-input class="textarea" v-model="address" label="map data" filled type="textarea" readonly />
    </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ComMapView from 'components/map/ComMap.vue';
import ComSearchAddressPopup from 'components/address/ComSearchAddressPopup.vue';
import {Postcode} from 'src/defines/postcode';

const popup = ref<typeof ComSearchAddressPopup | null>(null);
const address = ref<string>('');
const coordinates = ref<null>();
const mapViewRef = ref<typeof ComMapView | null>(null);

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

/**
 * 주소 초기화(원위치)
 */
function clear() {
    if (mapViewRef.value) {
        mapViewRef.value.clear();
    }
}
</script>

<style scoped>
.textarea {
    margin-top: 20px;
}
</style>
