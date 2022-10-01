<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col><span>{{ treeNode.name }}</span></el-col>

    <el-col :span="4">
      <el-row type="flex">
        <el-col>
          <span>{{ treeNode.manager }}</span>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span> 操作<i class="el-icon-arrow-down el-icon--right" /> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="isRoot"
                command="del"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {}
  },
  methods: {
    // 下拉组件里面的事件，给父组件绑定，给下拉选项一个command属性，传入一个参，这个参数为command属性值
    handleCommand(type) {
      // 点击添加按钮时
      if (type === 'add') {
        // 点击触发父组件事件，弹窗弹开,并将当前想的数据传给父组件
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        console.log('edit')
      } else {
        console.log('del')
      }
    }
  }
}
</script>

<style></style>
