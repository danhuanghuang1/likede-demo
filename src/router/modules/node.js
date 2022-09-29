import Layout from '@/layout'
export default {
  path: '/node',
  component: Layout,
  redirect: '/node/region',
  meta: { title: '点位管理', icon: 'dashboard' },
  children: [
    {
      path: '/node/region',
      name: 'business',
      component: () => import('@/views/node/region.vue'),
      meta: { title: '区域管理', icon: 'dashboard' }
    },
    {
      path: '/node/node',
      name: 'operation',
      component: () => import('@/views/node/node.vue'),
      meta: { title: '点位管理', icon: 'dashboard' }
    },
    {
      path: '/node/partner',
      name: 'operation',
      component: () => import('@/views/node/partner.vue'),
      meta: { title: '合作商管理', icon: 'dashboard' }
    }
  ]
}
