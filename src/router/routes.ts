import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    /* {
        path: '/',
        component: () => import('pages/common/layouts/MainLayout.vue'),
        children: [
            {path: '', component: () => import('pages/IndexPage.vue')},
            {path: 'autocomplete', component: () => import('pages/test/Autocomplete.vue')},
            {path: 'selectbox', component: () => import('pages/test/SelectBox.vue')},
            {path: 'combobox', component: () => import('pages/test/Combobox.vue')},
            {path: 'inputvalue', component: () => import('pages/test/InputValue.vue')},
            {path: 'validator', component: () => import('pages/test/Validator.vue')},
            {path: 'searchAddress', component: () => import('pages/searchAddress/SearchAddress.vue')},
            {path: 'map', component: () => import('pages/map/MapVIew.vue')},
            // {path: 'sales-activity', component: () => import('pages/sales/SalesActivityMain.vue')},
            {path: 'calendarDetail', component: () => import('pages/sales/SalesActiv ityDetail.vue')}
        ]
    },*/
    {
        //홈
        path: '/',
        name: 'Home',
        component: () => import('pages/home/index.vue'),
        redirect: {name: 'HomeMain'},
        children: [
            {
                path: 'home',
                name: 'HomeMain',
                component: () => import('pages/home/Home.vue'),
                meta: {
                    title: 'T-CRM'
                }
            },
            {
                path: 'notification',
                name: 'Notification',
                component: () => import('pages/home/Notification.vue'),
                meta: {
                    title: '알림이력'
                }
            }
        ]
    },
    {
      path: '/test',
      name: 'infiniteScroll',
      component:() => import('pages/test/InfiniteScroll.vue')
    },
    {
        path: '/sales-activity',
        name: 'SalesActivity',
        component: () => import('pages/sales-activity/index.vue'),
        redirect: {name: 'SalesActivityMain'},
        children: [
            {
                path: 'main',
                name: 'SalesActivityMain',
                component: () => import('pages/sales/SalesActivityMain.vue'),
                meta: {
                    title: '영업활동관리'
                }
            },
            {
                path: 'viewer',
                name: 'SalesActivityViewer',
                component: () => import('pages/sales-activity/SalesActivityViewer.vue')
            },
            {
                path: 'editor',
                name: 'SalesActivityEditor',
                component: () => import('pages/sales-activity/SalesActivityEditor.vue')
            }
        ]
    },
    {
        path: '/order-sales',
        name: 'OrderSales',
        component: () => import('pages/order-sales/index.vue'),
        redirect: {name: 'OrderSalesMain'},
        children: [
            {
                path: 'main',
                name: 'OrderSalesMain',
                component: () => import('pages/order-sales/OrderSalesMain.vue'),
                meta: {
                    title: '수주판매현황'
                }
            }
        ]
    },
    {
        path: '/company',
        name: 'Company',
        component: () => import('pages/company/index.vue'),
        redirect: {name: 'CompanyInfoMain'},
        children: [
            {
                path: 'main',
                name: 'CompanyInfoMain',
                component: () => import('pages/company/CompanyInfoMain.vue'),
                meta: {
                    title: '고객정보'
                }
            },
            {
                path: 'overview-viewer',
                name: 'OverviewViewer',
                component: () => import('pages/company/overview/OverviewViewer.vue')
            },
            {
                path: 'voc-viewer',
                name: 'VOCViewer',
                component: () => import('pages/company/voc/VOCViewer.vue')
            },
            {
                path: 'activity-history-viewer',
                name: 'ActivityHistoryViewer',
                component: () => import('pages/company/activity-history/ActivityHistoryViewer.vue')
            }
        ]
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('pages/contact/index.vue'),
        redirect: {name: 'ContactInfoMain'},
        children: [
            {
                path: 'main',
                name: 'ContactInfoMain',
                component: () => import('pages/contact/ContactInfoMain.vue'),
                meta: {
                    title: '고객담당자정보'
                }
            },
            {
                path: 'viewer',
                name: 'ContactInfoViewer',
                component: () => import('pages/contact/ContactInfoViewer.vue')
            },
            {
                path: 'editor',
                name: 'ContactInfoEditor',
                component: () => import('pages/contact/ContactInfoEditor.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('pages/login/Login.vue')
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
];

export default routes;
