<template>
    <div>
        <h6>영업활동 Main</h6>
        <q-btn @click="go('sales-activity/viewer')">영업활동 뷰어 페이지로 이동</q-btn>
        <q-btn @click="go('sales-activity/editor')">활동추가</q-btn>
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
