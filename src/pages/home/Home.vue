<template>
    <div><h6>Home</h6></div>
    <div>
        <q-btn @click="go('notification')">알림이력</q-btn>
        <q-btn @click="openPopup">알림보내기</q-btn>
        <q-btn @click="go('sales-activity')">영업활동관리 </q-btn>
        <q-btn @click="go('order-sales')">수주판매현황 </q-btn>
        <q-btn @click="go('company')">고객정보 </q-btn>
        <q-btn @click="go('contact')">고객담당자</q-btn>
        <q-btn @click="go('login')">로그인</q-btn>

        <noti-send-popup ref="popup"></noti-send-popup>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import NotiSendPopup from 'pages/home/NotiSendPopup.vue';
import {ref} from 'vue';

const router = useRouter();
const popup = ref<typeof NotiSendPopup | null>(null);

function go(path: string) {
    router.push({
        path: '/' + path
    });
}

function openPopup() {
    if (popup.value) {
        popup.value.open();
    }
}
</script>
