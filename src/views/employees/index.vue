<template>
  <div>
    <page-tolls type="success" :show-before="true">
      <!-- 作用域插槽： <slot name="after" :before="111">111</slot> 传值 -->
      <!-- <template v-slot:after="before">
        <span>共25条记录{{ before }}</span>
      </template> -->
      <template v-slot:before>
        <span>共25条记录</span>
      </template>
      <!-- 具名插槽 -->
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </page-tolls>
  </div>
</template>

<script>
export default {
  name: 'HrsaasIndex',
  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
