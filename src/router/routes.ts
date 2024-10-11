import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {path: '', component: () => import('pages/IndexPage.vue')},
            {path: 'autocomplete', component: () => import('pages/test/Autocomplete.vue')},
            {path: 'selectbox', component: () => import('pages/test/SelectBox.vue')},
            {path: 'combobox', component: () => import('pages/test/Combobox.vue')},
            {path: 'inputvalue', component: () => import('pages/test/InputValue.vue')},
            {path: 'validator', component: () => import('pages/test/Validator.vue')},
            {path: 'location', component: () => import('pages/address/TestLocation.vue')},
            {path: 'map', component: () => import('pages/map/MapView.vue')},
            {path: 'calendar', component: () => import('pages/calendar/CalendarMain.vue')}
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
];

export default routes;
