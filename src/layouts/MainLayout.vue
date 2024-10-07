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
                    <q-item-section> 영업활동관리 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/dashboard')">
                    <q-icon name="bar_chart" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 수주판매현황 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/company-info')">
                    <q-icon name="emoji_transportation" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 고객정보 </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/company-contact')">
                    <q-icon name="diversity_3" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> 고객담당자정보 </q-item-section>
                </q-item>

                <!-- TODO 아래의 테스트를 하위 메뉴로 이동시킬것.       -->
                <q-item clickable @click="changeUrl('/autocomplete')">
                    <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> Autocomplete </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/selectbox')">
                    <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> Selectbox </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/Combobox')">
                    <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> Combobox </q-item-section>
                </q-item>
                <q-item clickable @click="changeUrl('/InputValue')">
                    <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />
                    <q-item-section> InputValue </q-item-section>
                </q-item>
                <!--        <q-item clickable @click="changeUrl('/Validator')">-->
                <!--          <q-icon name="attachment" style="font-size: 24px; margin-right: 15px" />-->
                <!--          <q-item-section>-->
                <!--            Validate-->
                <!--          </q-item-section>-->
                <!--        </q-item>-->
                <br />
                <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
            </q-list>
        </q-drawer>

        <q-page-container>
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
    // {
    //   title: 'Github',
    //   caption: 'github.com/quasarframework',
    //   icon: 'code',
    //   link: 'https://github.com/quasarframework'
    // },
    // {
    //   title: 'Discord Chat Channel',
    //   caption: 'chat.quasar.dev',
    //   icon: 'chat',
    //   link: 'https://chat.quasar.dev'
    // },
    // {
    //   title: 'Forum',
    //   caption: 'forum.quasar.dev',
    //   icon: 'record_voice_over',
    //   link: 'https://forum.quasar.dev'
    // },
    // {
    //   title: 'Twitter',
    //   caption: '@quasarframework',
    //   icon: 'rss_feed',
    //   link: 'https://twitter.quasar.dev'
    // },
    // {
    //   title: 'Facebook',
    //   caption: '@QuasarFramework',
    //   icon: 'public',
    //   link: 'https://facebook.quasar.dev'
    // },
    // {
    //   title: 'Quasar Awesome',
    //   caption: 'Community Quasar projects',
    //   icon: 'favorite',
    //   link: 'https://awesome.quasar.dev'
    // }
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
