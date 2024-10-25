<template>
    <main-layout>
        <div class="page">
            <div class="content">
                <q-btn class="btn" @click="go('sales-activity')">영업활동관리 </q-btn>
                <q-btn class="btn" @click="go('order-sales')">수주판매현황 </q-btn>
                <q-btn class="btn" @click="go('company')">고객정보 </q-btn>
                <q-btn class="btn" @click="go('contact')">고객담당자</q-btn>
                <!--            <q-btn class="btn" @click="go('login')">로그인</q-btn>-->

                <noti-send-popup ref="popup"></noti-send-popup>
                <q-page-sticky position="bottom-right" :offset="[25, 25]">
                    <q-btn fab icon="chat" color="blue" @click="openPopup" />
                </q-page-sticky>
            </div>
        </div>
    </main-layout>
    <!--    <div><h6>Home</h6></div>-->
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import NotiSendPopup from 'pages/home/NotiSendPopup.vue';
import {ref} from 'vue';
import MainLayout from 'pages/common/layouts/MainLayout.vue';

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
<style>
.page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    display: flex;
    flex-direction: column;
}

.btn {
    width: 200px;
    height: 50px;
    margin: 20px 0;
    background-color: darkslategrey;
    color: burlywood;
    font-family: Arial, sans-serif; /* 글씨체 */
    font-size: 16px; /* 글자 크기 */
    font-weight: bold; /* 글자 굵기 */
}
</style>
