<template>
    <main-layout>
        <q-btn @click="go">영업활동 뷰어 페이지로 이동</q-btn>
        <q-btn @click="userPopUpOpen">고객 담당자 팝업</q-btn>
        <div v-if="selectedUser" class="q-mt-md">Selected Value: {{ selectedUser }}</div>
        <user-popup ref="userPopup" @confirm="updateSelectedUser"></user-popup>
    </main-layout>
</template>

<script setup lang="ts">
//import
import {useRouter} from 'vue-router';
import MainLayout from 'pages/common/layouts/MainLayout.vue';
import UserPopup from 'pages/contact/UserPopup.vue';
import {ref} from 'vue';

// 상수 정의 (UPPER_SNAKE_CASE)

// 변수 정의 (camelCase)

const router = useRouter();
const userPopup = ref<typeof UserPopup | null>(null);
const selectedUser = ref('');
//-------- watch, watchEffect --------

// 함수 정의 (camelCase, 동사 + 명사 구조)
function go() {
    router.push({
        path: '/contact/viewer'
    });
}

function userPopUpOpen() {
    if (userPopup.value) {
        userPopup.value.open();
    }
}
function updateSelectedUser(user: string) {
    selectedUser.value = user;
}

// 이벤트 핸들러 정의 (on + 명사 + 동사 구조)

//-------- 라이프 사이클 --------
</script>
