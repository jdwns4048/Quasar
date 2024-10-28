<template>
    <viewer-layout>
        <q-btn @click="go">영업활동 편집 페이지로 이동</q-btn>
    </viewer-layout>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import ViewerLayout from 'pages/common/layouts/ViewerLayout.vue';

const router = useRouter();

function go() {
    router.push({
        path: '/sales-activity/editor'
    });
}
</script>
<style></style>
