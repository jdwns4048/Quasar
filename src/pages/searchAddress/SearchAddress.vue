<template>
    <q-page class="q-pa-md">
        <q-input class="input" v-model="searchKeyword" label="검색할 주소 입력" outlined type="text" />
        <q-btn color="primary" label="주소 검색" @click="openPopup(searchKeyword)" />
        <com-search-address-popup ref="popup" keyword="기흥테라타워" />
        <q-input class="text-area" v-model="address" label="response data" filled type="textarea" readonly rows="25" />
    </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ComSearchAddressPopup from 'components/address/ComSearchAddressPopup.vue';
import {Postcode} from 'src/defines/postcode';

const address = ref<string>('');
const popup = ref<typeof ComSearchAddressPopup | null>(null);
const searchKeyword = ref<string | null>(null);

/**
 * 팝업을 열고 주소 검색 결과를 처리
 *
 * @async
 * @function openPopup
 * @returns {Promise<void>}
 */
async function openPopup(keyword: string | null): Promise<void> {
    if (popup.value) {
        const data: Postcode = await popup.value.open(keyword);
        address.value = formatData(data);
    }
}

/**
 * 전달받은 데이터를 보여주기 좋은 포맷으로 변환.
 * @param data
 */
function formatData(data: Postcode) {
    let result = '';

    Object.keys(data).forEach(key => {
        const value = data[key] || ''; // 값이 없으면 ''로 설정
        result += `${key}: ${value}\n`; // 각 줄마다 key: value 형식으로 추가
    });
    return result;
}
</script>

<style>
.input {
    margin-bottom: 10px;
}

.text-area {
    margin-top: 20px;
}
</style>
