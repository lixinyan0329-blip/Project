import VueRouter from 'vue-router'

const routes = [
    {
        path:'/',
        name:'login',
        component:()=>import('../components/Login.vue')
    },
    {
        path:'/Register',
        name:'Register',
        component:()=>import('../components/Register.vue')
    },
    {
        path:'/Index2',
        name:'Index2',
        component:()=>import('../components/admin/index2.vue'),
        children:[
            {
                path:'/a1',
                name:'zhuye',
                component:()=>import('../components/admin/zhuye2.vue')
            },
            {
                path:'/a6',
                name:'manager',
                component:()=>import('../components/admin/manager.vue')
            },
            {
                path:'/a2-1',
                name:'manager',
                component:()=>import('../components/admin/courses2.vue')
            },
            {
                path:'/a2-2',
                name:'manager',
                component:()=>import('../components/admin/tushu2.vue')
            },
            {
                path:'/a3-4',
                name:'chengjjiluru',
                component:()=>import('../components/admin/chengjiluru.vue')
            },
            ]
    },
    {
        path:'/Index1',
        name:'Index1',
        component:()=>import('../components/teacher/index1.vue'),
        children:[
            {
                path:'/t1',
                name:'zhuye',
                component:()=>import('../components/teacher/zhuye1.vue')
            },
            {
                path:'/t2-1',
                name:'courses1',
                component:()=>import('../components/teacher/courses1.vue')
            },
            {
                path:'/t2-2',
                name:'tushu1',
                component:()=>import('../components/teacher/tushu1.vue')
            },
            {
                path:'/t3-2',
                name:'daping1',
                component:()=>import('../components/teacher/daping1.vue')
            },
            {
                path:'/t3-3',
                name:'zuoye',
                component:()=>import('../components/teacher/zuoye.vue')
            },
            {
                path:'/t3-4',
                name:'chengjiluru',
                component:()=>import('../components/teacher/chengjichakan.vue')
            },
            {
                path: '/7-2',
                name: 'life',
                component:()=>import('../components/life/index.vue')
            },
            {
                path: '/t9',
                name: 'gerenxinxi',
                component:()=>import('../components/teacher/gerenxinxi1.vue'),
            },
            {
                path: '/t10',
                name: 'profile',
                component:()=>import('../components/teacher/profile.vue')
            }
            ]
    },
    {
        path: '/Index',
        name: 'index',
        component: () => import('../components/Index.vue'),
        children:[
            {
                path:'/1',
                name:'zhuye',
                component:()=>import('../components/Main.vue')
            },
            {
                path:'/2-2',
                name:'tushu',
                component:()=>import('../components/tushu.vue')
            },
            {
                path:'/3-2',
                name:'daping',
                component:()=>import('../components/daping.vue')
            },
            {
                path:'/3-3',
                name:'kaoshi',
                component:()=>import('../components/kaoshi.vue')
            },
            {
                path:'/3-4',
                name:'zhaunqu',
                component:()=>import('../components/zhuanqu.vue')
            },
            {
                path:'/2-3',
                name:'yuyin',
                component:()=>import('../components/VoiceTranslate.vue')
            },
            {
                path:'/2-1',
                name:'courses',
                component:()=>import('../components/courses.vue')
            },
            {
                path:'/2-4',
                name:'kebiao',
                component:()=>import('../components/kebiao-kaoshi.vue')
            },
            {
                path:'/5',
                name:'zixi',
                component:()=>import('../components/zixi.vue')
            },
            {
                path:'/6',
                name:'admin',
                component:()=>import('../components/admin.vue')
            },
            {
                path: '/7-1',
                name: 'resume',
                component:() => import('../components/resume/index.vue')
            },
            {
                path: '/7-2',
                name: 'life',
                component:()=>import('../components/life/index.vue')
            },
            {
                path: '/7-3',
                name: 'lianjie',
                component:()=>import('../components/lianjie.vue')
            },
            {
                path: '/7-4',
                name: 'fuwu',
                component:()=>import('../components/fuwu.vue')
            },
            {
                path: '/1111',
                name: 'jiaofeidenglu',
                component:()=>import('../components/jiaofeidenglu.vue')
            },
            {
                path: '/7-5',
                name: 'jiaowu',
                component:()=>import('../components/jiaowu.vue')
            },
            {
                path: '/2222',
                name: 'sushefenpei',
                component:()=>import('../components/sushefenpei.vue')
            },
            {
                path: '/3333',
                name: 'sushegeren',
                component:()=>import('../components/sushegeren.vue')
            },
            {
                path: '/10',
                name: 'gerenxinxi',
                component:()=>import('../components/gerenxinxi.vue')
            },
        ]
    },
]

const router = new VueRouter({
    mode:'history',
    routes
})
export default router;
