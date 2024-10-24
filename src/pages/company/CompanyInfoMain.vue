<template>
    <div><h6>고객정보 Main</h6></div>
    <q-tabs v-model="tab" class="text-teal">
        <q-tab name="overview" label="개요" />
        <q-tab name="voc" label="VOC" />
        <q-tab name="activity-history" label="활동이력" />
    </q-tabs>

    <div v-if="tab === 'overview'">
        <overview-widjet></overview-widjet>
    </div>
    <div v-else-if="tab === 'voc'">
        <v-o-c-list-widget></v-o-c-list-widget>
    </div>
    <div v-else>
        <activity-history-widjet></activity-history-widjet>
    </div>
</template>

<script setup lang="ts">
//import
import {ref} from 'vue';
import ActivityHistoryWidjet from 'pages/company/activity-history/ActivityHistoryWidjet.vue';
import OverviewWidjet from 'pages/company/overview/OverviewWidjet.vue';
import VOCListWidget from 'pages/company/voc/VOCListWidget.vue';

// 상수 정의 (UPPER_SNAKE_CASE)

// 변수 정의 (camelCase)

const tab = ref('overview');
//-------- watch, watchEffect --------

// 함수 정의 (camelCase, 동사 + 명사 구조)

// 이벤트 핸들러 정의 (on + 명사 + 동사 구조)

//-------- 라이프 사이클 --------
</script>
