import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/basic-settings'),
                    meta: { title: '基础设置' }
                },
                {
                    path: '/business',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/business'),
                    meta: { title: '商品管理' }
                },
                {
                    path: '/classify',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/classify'),
                    meta: { title: '用户商品管理' }
                },
                {
                    path: '/integral',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/integral'),
                    meta: { title: '积分管理' }
                },

                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
