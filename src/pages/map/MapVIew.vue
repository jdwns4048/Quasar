<template>
    <com-map-view ref="mapViewRef" @map-click="onSelect" @search-completed="onSearchCompleted"> </com-map-view>
    <q-btn class="q-mt-md q-mr-md" color="primary" label="주소 검색" @click="openPopup" />
    <q-btn class="q-mt-md" color="primary" label="원위치(clear)" @click="clear" />
    <com-search-address-popup ref="popup" />
    <q-input class="textarea" v-model="address" label="map data" filled type="textarea" readonly />
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ComMapView from 'components/map/ComMapView.vue';
import ComSearchAddressPopup from 'components/address/ComSearchAddressPopup.vue';
import {Postcode} from 'src/defines/postcode';
const popup = ref<typeof ComSearchAddressPopup | null>(null);
const address = ref<string>('');
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

function onSelect(location: [number, number]) {
    searchAddress(location);
}

function searchAddress(addressData: string | [number, number]) {
    if (mapViewRef.value) {
        mapViewRef.value.search(addressData);
    }
}

function onSearchCompleted(result: string) {
    address.value = result;
}

function clear() {
    if (mapViewRef.value) {
        mapViewRef.value.clear();
    }
}
</script>

<style scoped></style>
