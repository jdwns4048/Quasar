<template>
    <q-page class="q-pa-md">
        <q-btn color="primary" label="주소 검색" @click="openPopup" />
        <ComSearchAddressPopup ref="popup" />
        <q-input class="textArea" v-model="address" label="response data" filled type="textarea" readonly rows="25" />
    </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ComSearchAddressPopup from 'components/ComSearchAddressPopup.vue';
import {postcode} from 'src/plugin/utils/format/postcode';
import {Postcode} from 'src/defines/postcode';

const address = ref('');
const popup = ref<typeof ComSearchAddressPopup | null>(null);

/**
 * 팝업을 엽니다.
 */
async function openPopup() {
    if (popup.value) {
        const data: Postcode = await popup.value.open();
        address.value = postcode(data);
    }
}
</script>

<style>
.textArea {
    margin-top: 20px;
}
</style>
