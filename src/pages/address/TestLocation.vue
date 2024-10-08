<template>
    <q-page class="q-pa-md">
        <q-btn color="primary" label="주소 검색" @click="isOpened = true" />
        <PostcodeDialog v-model="isOpened" @onComplete="getAddress" />
        <q-input class="textArea" v-model="address" label="response data" filled type="textarea" readonly rows="25" />
    </q-page>
</template>

<script lang="ts">
import {ref} from 'vue';
import PostcodeDialog from 'src/pages/address/PostcodeDialog.vue';
import {formatAddress} from 'src/plugin/utils/formatAddress';

export default {
    name: 'TestLocation',
    components: {PostcodeDialog},
    setup() {
        const isOpened = ref(false);
        const address = ref('');

        const getAddress = (data: any) => {
            address.value = formatAddress(data);
        };

        return {isOpened, address, getAddress};
    }
};
</script>
<style>
.textArea {
    margin-top: 20px;
}
</style>
