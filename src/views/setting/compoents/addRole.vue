<template>
  <div>
    <!-- visible控制这个在组件显示隐藏 -->
    <el-dialog
      :title="title"
      width="30%"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="roleDialogForm" label-width="80px" :model="formData">
        <el-form-item
          prop="name"
          label="角色"
          :rules="[{ required: true, message: '角色必填', trigger: 'blur' }]"
        >
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" row="3" />
        </el-form-item>
      </el-form>
      <el-row
        slot="footer"
        type="flex"
        justify="center"
        align="middle"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          v-loading="loading"
          type="primary"
          @click="submit"
        >确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addRole } from '@/api/setting'
import { updateRole } from '@/api/setting'
export default {
  name: 'AddRole',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑成功' : '新增成功'
    }
  },
  methods: {
    // 取消的功能，或者是确定后的操作
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
      // 要点击新增的时候清空formData里面的数据
      this.formData = {
        name: '',
        description: ''
      }
    },
    // 提交时间
    async submit() {
      try {
        // 判断验证是否通过
        await this.$refs.roleDialogForm.validate()
        // 接口
        this.loading = true
        // 获取角色列表时有id
        // 通过判断有没有formData里面的id，有调用编辑
        this.formData.id
          ? await updateRole(this.formData)
          : await addRole(this.formData)

        // 重新渲染列表
        this.$emit('refreshList')
        this.formData.id
          ? this.$message.success('修改成功')
          : this.$message.success('新增成功')
        //  优化点：
        // 1,如果先点击编辑，再新增的时候id会存留,，要点击新增的时候清空formData里面的数据
        // 2,标题显示
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
