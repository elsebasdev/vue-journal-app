export default {

    name:'daybook',
    component: () => import('@/modules/daybook/layout/DayBookLayout.vue'),
    children:[  
        {
            path: '/',
            name: 'daybook-home',
            component: ()=>import(/* webpackChunkName: "homeview" */'@/modules/daybook/view/HomeView.vue')
        },
        {
            path: ':id',
            name: 'entry',
            component: ()=>import(/* webpackChunkName: "homeview" */'@/modules/daybook/view/EntryView.vue')
        }
        
    ]

}