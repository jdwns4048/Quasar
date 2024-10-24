<template>
    <q-dialog v-model="isOpened" maximized>
        <q-card class="q-card">
            <div><h6>알림보내기 팝업</h6></div>
            <div>
                <q-btn @click="close">닫기</q-btn>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue';

defineExpose({open});

const isOpened = ref<boolean>(false);

function open() {
    isOpened.value = true;
}

function close() {
    isOpened.value = false;
    clear();
}

function clear() {}
</script>
<style>
.q-card {
    height: 100vh;
}
</style>
