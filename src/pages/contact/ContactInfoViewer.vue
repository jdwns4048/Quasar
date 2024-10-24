<template>
    <div><h6>담당자 viewer</h6></div>
    <q-btn @click="go">영업활동 편집 페이지로 이동</q-btn>
</template>

<script setup lang="ts">
//import
import {useRouter} from 'vue-router';
// 상수 정의 (UPPER_SNAKE_CASE)

// 변수 정의 (camelCase)

const router = useRouter();
//-------- watch, watchEffect --------

// 함수 정의 (camelCase, 동사 + 명사 구조)
function go() {
    router.push({
        path: '/contact/editor'
    });
}
// 이벤트 핸들러 정의 (on + 명사 + 동사 구조)

//-------- 라이프 사이클 --------
</script>
