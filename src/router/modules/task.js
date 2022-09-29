import Layout from '@/layout'
export default {
  path: '/task',
  component: Layout,
  redirect: '/task/business',
  meta: { title: '工单管理', icon: 'dashboard' },
  children: [
    {
      path: '/task/business',
      name: 'business',
      component: () => import('@/views/task/taskbusiness.vue'),
      meta: { title: '运营工单', icon: 'dashboard' }
    },
    {
      path: '/task/operation',
      name: 'operation',
      component: () => import('@/views/task/taskoperation.vue'),
      meta: { title: '运维工单', icon: 'dashboard' }
    }
  ]
}
