<template>
    <div><h6>Home</h6></div>
    <div>
        <q-btn @click="go('notification')">알림이력으로 이동</q-btn>
        <q-btn @click="go('sales-activity')">영업활동관리 </q-btn>
        <q-btn @click="go('order-sales')">수주판매현황 </q-btn>
        <q-btn @click="go('company')">고객정보 </q-btn>
        <q-btn @click="go('contact')">고객담당자</q-btn>
        <q-btn @click="go('login')">로그인</q-btn>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

// 상수 정의 (UPPER_SNAKE_CASE)

// 변수 정의 (camelCase)

const router = useRouter();
//-------- watch, watchEffect --------

// 함수 정의 (camelCase, 동사 + 명사 구조)
function go(path: string) {
    router.push({
        path: '/' + path
    });
}
// 이벤트 핸들러 정의 (on + 명사 + 동사 구조)

//-------- 라이프 사이클 --------
</script>
