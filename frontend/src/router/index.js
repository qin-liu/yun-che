import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有开发环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
    { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
    { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
    path: '/',
    component: _import('main'),
    name: 'main',
    redirect: { name: 'home' },
    meta: { title: '主入口整体布局' },
    children: [
        // 通过meta对象设置路由展示方式
        // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
        // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
        { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
        { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
        {
            path: '/demo-01',
            component: null, // 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
            name: 'demo-01',
            meta: {
                title: '我是一个通过iframe嵌套展示内容, 并通过tab打开 demo',
                isTab: true,
                iframeUrl: 'http://fast.demo.renren.io/'
            }
        }
    ],
    beforeEnter(to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
            next({ name: 'login' })
        }
        next()
    }
}

const router = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes)
})

export default router