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
            {path: 'searchAddress', component: () => import('pages/searchAddress/SearchAddress.vue')},
            {path: 'map', component: () => import('pages/map/MapVIew.vue')},
            {path: 'sales-activity', component: () => import('pages/sales/SalesActivityMain.vue')},
            {path: 'calendarDetail', component: () => import('pages/sales/SalesActivityDetail.vue')}
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
];

export default routes;
