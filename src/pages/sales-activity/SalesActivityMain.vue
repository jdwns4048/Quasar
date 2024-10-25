<template>
    <main-layout>
        <q-tabs v-model="tab" class="text-teal">
            <q-tab name="all" label="전체활동" />
            <q-tab name="completed" label="실적 입력 활동" />
            <q-tab name="inCompleted" label="실적 미입력 활동" />
        </q-tabs>

        <div v-if="tab === 'all'">전체활동</div>
        <div v-else-if="tab === 'completed'">실적입력활동</div>
        <div v-else>실적미입력활동</div>
    </main-layout>
</template>

<script setup lang="ts">
import MainLayout from 'pages/common/layouts/MainLayout.vue';
import {ref} from 'vue';

const tab = ref('overview');
</script>
