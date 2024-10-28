<template>
    <q-layout>
        <q-page-container>
            <q-page class="container">
                <div class="header">
                    <q-icon name="menu" style="font-size: 25px" @click="toggleLeftDrawer" />
                    <q-toolbar-title class="text-center full-width" style="font-size: 18px"> {{ title }} </q-toolbar-title>
                    <q-icon name="notifications" style="font-size: 25px" @click="changeUrl('/notification')" />
                </div>
                <div class="body">
                    <slot></slot>
                </div>
                <!--            <q-btn flat unelevated icon="arrow_back" style="color: black" @click="goBack" />-->
                <!--            <q-btn flat unelevated icon="arrow_forward" style="color: black" @click="goForward" />-->
            </q-page>
        </q-page-container>
        <q-drawer v-model="leftDrawerOpen" show-if-above>
            <q-list style="margin-top: 30px; color: darkslategray">
                <q-item clickable @click="changeUrl('/')">
                    <q-icon name="home" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> Home </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/sales-activity')">
                    <q-icon name="calendar_month" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 영업활동 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/order-sales')">
                    <q-icon name="leaderboard" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 판매현황 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/company')">
                    <q-icon name="apartment" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 고객정보 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/contact')">
                    <q-icon name="person" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 고객담당자 </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
    </q-layout>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();
const leftDrawerOpen = ref(false);
const title = computed(() => route.meta.title || route.name);

/**
 * navigation toggle
 */
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

/**
 * 뒤로 가기
 */
function goBack() {
    // router.back();
    router.forward();
}

/**
 * 앞으로 가기
 */
function goForward() {
    router.forward();
}

/**
 * URL을 변경하여 다른 페이지로 이동합니다.
 * @param newUrl
 */
function changeUrl(newUrl: string) {
    router.push(newUrl);
}

//Component 이름 정의.
defineOptions({
    name: 'MainLayout'
});
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
    justify-content: space-between;
    color: darkslategray;
    height: 70px;
    margin: 0 20px;
}

.body {
    flex: 1;
}
</style>
