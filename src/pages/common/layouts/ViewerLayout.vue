<template>
    <q-layout>
        <q-page-container>
            <q-page class="container">
                <div class="header">
                    <q-icon class="side-item" name="arrow_back" style="font-size: 25px; margin-left: 5px" @click="goBack" />
                    <q-toolbar-title class="title" style="font-size: 18px"> {{ title }} </q-toolbar-title>
                    <q-btn class="edit_btn side-item" style="font-size: 18px" @click="edit" unelevated>편집</q-btn>
                </div>
                <div class="body">
                    <slot></slot>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {computed} from 'vue';

const router = useRouter();
const route = useRoute();
const title = computed(() => route.meta.title || route.name);

function goBack() {
    console.log('back');
    router.back();
}

function edit() {
    console.log('edit');
}
</script>
<style>
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    color: darkslategray;
    height: 50px;
    margin-top: 10px;
}

.body {
    flex: 1;
}

.title {
    text-align: center;
}

.side-item {
    width: 80px;
}
</style>
