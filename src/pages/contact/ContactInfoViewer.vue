<template>
    <div><h6>담당자 viewer</h6></div>
    <q-btn @click="go">담당자 편집 페이지로 이동</q-btn>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter();

function go() {
    router.push({
        path: '/contact/editor'
    });
}
</script>
