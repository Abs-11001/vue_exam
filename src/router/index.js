import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'welcome',
            path: '/',
            component: () => import('../components/Welcome')
        },
        {
            name: 'detail',
            path: '/detail',
            component: () => import('../components/Detail'),

        }
    ]
})