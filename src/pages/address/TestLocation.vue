<template>
    <q-page class="q-pa-md">
        <q-btn color="primary" label="주소 검색" @click="isOpened = true" />
        <PostcodeDialog v-model="isOpened" @onComplete="getAddress" />
        <q-input class="textArea" v-model="address" label="response data" filled type="textarea" readonly rows="25" />
    </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import PostcodeDialog from 'src/pages/address/PostcodeDialog.vue';
import {formatAddress} from 'src/plugin/utils/formatAddress';

const isOpened = ref(false);
const address = ref('');

/**
 * 카카오 우편번호 서비스 결과 값을 보기 좋은 형태로  변환.
 * @param data
 */
const getAddress = (data: any) => {
    address.value = formatAddress(data);
};
</script>

<style>
.textArea {
    margin-top: 20px;
}
</style>
