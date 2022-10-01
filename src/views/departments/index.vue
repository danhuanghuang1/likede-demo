<template>
  <div class="departments-container">
    <el-card>
      <treenode :tree-node="title" :is-root="false" />
    </el-card>
    <el-tree :data="departs">
      <!-- slot-scope="{ data }"当前节点的数据 -->
      <treenode
        slot-scope="{ data }"
        :tree-node="data"
        @addDept="handleAddDept"
      /></el-tree>
    <!-- 再通过addDept弹窗，将控制开关的布尔值传到弹窗 -->
    <!-- current当前项的数据传到add组件里面 -->
    <addDept :dialog-visible.sync="dialogVisible" :current="current" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import addDept from './compoents/adddept.vue'
import treenode from './compoents/treenode.vue'
export default {
  name: 'HrsaasIndex',
  components: { treenode, addDept },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      nodeList: [],
      title: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      dialogVisible: false,
      current: {}
    }
  },

  mounted() {},
  created() {
    this.getDepartmentsApi()
  },
  methods: {
    async getDepartmentsApi() {
      // 调用人员列表
      const result = await getDepartments()
      // 公司设置
      this.title = { name: result.companyName, manager: result.companyManage }
      // this.departs = result.depts
      // 以及人员
      this.departs = tranListToTreeData(result.depts, '')
    },
    // 子组件触发事件，弹窗为true
    handleAddDept(treenode) {
      this.dialogVisible = true
      // 接受treenode子组件的数据存下来，想要传给adddept组件
      this.current = treenode
      // console.log(treenode)
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      padding-right: 20px;
    }
  }
}
</style>
