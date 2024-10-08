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
                    <q-item-section> Calendar </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/map')">
                    <q-icon name="bar_chart" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 지도 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/location')">
                    <q-icon name="emoji_transportation" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 주소 검색 </q-item-section>
                </q-item>

                <!-- TODO 아래의 테스트를 하위 메뉴로 이동시킬것.       -->
                <!--                <q-item clickable @click="changeUrl('/autocomplete')">-->
                <!--                    <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />-->
                <!--                    <q-item-section> Autocomplete </q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable @click="changeUrl('/selectbox')">-->
                <!--                    <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />-->
                <!--                    <q-item-section> Selectbox </q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable @click="changeUrl('/Combobox')">-->
                <!--                    <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />-->
                <!--                    <q-item-section> Combobox </q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable @click="changeUrl('/InputValue')">-->
                <!--                    <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />-->
                <!--                    <q-item-section> InputValue </q-item-section>-->
                <!--                </q-item>-->
                <!--                <br />-->
                <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
            </q-list>
        </q-drawer>

        <q-page-container padding>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import EssentialLink, {EssentialLinkProps} from 'components/EssentialLink.vue';
import {useRouter} from 'vue-router';

const linksList: EssentialLinkProps[] = [
    {
        title: 'Docs',
        caption: 'quasar.dev',
        icon: 'school',
        link: 'https://quasar.dev'
    }
];

export default defineComponent({
    name: 'MainLayout',

    components: {
        EssentialLink
    },

    setup() {
        const leftDrawerOpen = ref(false);
        const router = useRouter();
        function changeUrl(newUrl: string) {
            router.push(newUrl);
        }
        return {
            linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            changeUrl
        };
    }
});
</script>
