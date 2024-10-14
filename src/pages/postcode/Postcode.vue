<template>
    <q-page class="q-pa-md">
        <q-btn color="primary" label="주소 검색" @click="openPopup" />
        <PostcodeDialog ref="popup" @apply="formatData" />
        <q-input class="textArea" v-model="address" label="response data" filled type="textarea" readonly rows="25" />
    </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import PostcodeDialog from 'pages/postcode/PostcodeDialog.vue';
import {formatPostcode} from 'src/plugin/utils/formatPostcode';
import {Postcode} from 'src/defines/postcode';

const address = ref('');
const popup = ref<typeof PostcodeDialog | null>(null);

/**
 * 카카오 우편번호 서비스 결과 값을 보기 좋은 형태로 변환.
 * @param data
 */
const formatData = (data: Postcode): void => {
    address.value = formatPostcode(data);
};

/**
 * 팝업을 엽니다.
 */
function openPopup(): void {
    if (popup.value) {
        popup.value.open();
    }
}
</script>

<style>
.textArea {
    margin-top: 20px;
}
</style>
