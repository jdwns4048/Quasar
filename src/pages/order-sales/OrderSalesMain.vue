<template>
    <main-layout>
        <q-tabs v-model="tab" class="text-teal">
            <q-tab name="sales" label="판매실적" />
            <q-tab name="price" label="판가현황" />
        </q-tabs>

        <div v-if="tab === 'sales'">
            <sales-track-widget></sales-track-widget>
        </div>
        <div v-else>
            <price-trend-widget></price-trend-widget>
        </div>
    </main-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';

// 상수 정의 (UPPER_SNAKE_CASE)

// 변수 정의 (camelCase)

const tab = ref('sales');
//-------- watch, watchEffect --------

// 함수 정의 (camelCase, 동사 + 명사 구조)

// 이벤트 핸들러 정의 (on + 명사 + 동사 구조)

//-------- 라이프 사이클 --------
import PriceTrendWidget from 'pages/order-sales/PriceTrendWidget.vue';
import SalesTrackWidget from 'pages/order-sales/SalesTrackWidget.vue';
import MainLayout from 'pages/common/layouts/MainLayout.vue';
</script>
