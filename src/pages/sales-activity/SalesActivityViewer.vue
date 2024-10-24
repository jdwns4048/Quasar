<template>
    <div><h6>영업활동 Viewer</h6></div>
    <q-btn @click="go">영업활동 편집 페이지로 이동</q-btn>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter();

function go() {
    router.push({
        path: '/sales-activity/editor'
    });
}
</script>
