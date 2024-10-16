<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
                <q-toolbar-title class="text-center full-width" clickable @click="changeUrl('/')"> T-CRM </q-toolbar-title>
                <div><q-icon name="notifications" style="font-size: 24px" /></div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-item-label header>
                    <div style="font-size: 18px; font-weight: bold; color: #1976d2">Quick Menu</div>
                </q-item-label>
                <q-item clickable @click="changeUrl('/')">
                    <q-icon name="home" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> Home </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/sales-activity')">
                    <q-icon name="calendar_month" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 영업활동 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/map')">
                    <q-icon name="pin_drop" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 지도 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/searchAddress')">
                    <q-icon name="my_location" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 주소 검색 </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container padding>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const leftDrawerOpen = ref(false);

/**
 * navigation toggle
 */
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
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
