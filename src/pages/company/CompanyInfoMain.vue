<template>
    <main-layout>
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
    </main-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ActivityHistoryWidjet from 'pages/company/activity-history/ActivityHistoryWidjet.vue';
import OverviewWidjet from 'pages/company/overview/OverviewWidjet.vue';
import VOCListWidget from 'pages/company/voc/VOCListWidget.vue';
import MainLayout from 'pages/common/layouts/MainLayout.vue';

const tab = ref('overview');
</script>
