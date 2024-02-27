export default {

    name:'daybook',
    sensitive: true,
    component: () => import('@/modules/daybook/layout/DayBookLayout.vue'),
    children:[  
        {
            path: '',
            name: 'daybook-home',
            sensitive: true,
            component: ()=>import(/* webpackChunkName: "homeview" */'@/modules/daybook/view/HomeView.vue')
        },
        {
            path: ':id',
            name: 'entry',
            component: ()=>import(/* webpackChunkName: "entryView" */'@/modules/daybook/view/EntryView.vue'),
            props:(route) => {
                return{
                    id: route.params.id
                }
            }
        }
        
    ]

}