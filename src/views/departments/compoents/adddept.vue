<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="dialogVisible">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      ref="addDeptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in employee"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button
          v-loading="loading"
          type="primary"
          size="small"
          @click="submit"
        >确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { getEmployeeSimple, addDepartments } from '@/api/employess'
export default {
  name: 'HrsaasAddDept',
  // 通过属性控制组件显隐
  // 父子
  // 子到父用.sync
  // 在关闭弹窗的时候update:dialogVisible
  props: {
    // 控制弹窗布尔值
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 每一列的数据
    current: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 部门编码在整个模块中都不允许重复
    // 拿到所有的部门数据一个个的比较过去如果出现重复则校验不通过否则校验通过
    const codeCheck = async(rule, value, callback) => {
      // 调用接口，获取已有的角色列表
      const { depts } = await getDepartments()
      //   判断编码里面有没有重复的 重复返回true
      const isRepeat = depts.some((ele) => ele.code === value)
      //   有报错提示，反则
      isRepeat ? callback(new Error(`模块已经存在${value}编码`)) : callback()
    }
    // 部门名称同级部门中禁止出现重复部门
    // 重点是同级部门如何从所有部门中把同级部门的数据刷选出来
    // 先确定父ID
    // 先从tree拿到数据在把数据送到父组件
    // 父组件在把数据给addDept
    const nameCheck = async(rule, value, callback) => {
      // 调用接口，获取已有的角色列表
      const { depts } = await getDepartments()
      //   判断编码里面有没有重复的 重复返回true
      const deptstj = depts.filter((item) => item.pid === this.current.id)
      //   有报错提示，反则
      console.log(deptstj)
      callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: codeCheck, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '部门负责人必填' }],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '部门介绍1-300个字符',
            trigger: 'blur'
          }
        ]
      },
      employee: [],
      loading: false
    }
  },
  //   部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门
  // 部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复
  // 部门负责人（manager）：必填
  // 部门介绍 ( introduce)：必填 1-300个字符

  methods: {
    // 点击取消按钮，将false传回
    handleClose() {
      this.$emit('update:dialogVisible', false)
      // 清空校验
      this.$refs.addDeptForm.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    async getEmployeeSimple() {
      // 获得部门列表
      const res = await getEmployeeSimple()
      this.employee = res
    },

    async submit() {
      try {
        // 表单校验通过后调用接口
        // 因为是添加子部门，所以我们需要将新增的部门pid设置成当前部门的id,新增的部门就成了自己的子部门

        await this.$refs.addDeptForm.validate()
        // 确定按钮的Loading状态
        this.loading = true
        await addDepartments({ ...this.formData, pid: this.current.id })
        // 接口新增成功之后消息提示成功
        this.$message.success('新增成功')
        // 刷新父组件的组织架构列表
        this.$parent.getDepartmentsApi()
        // 关闭弹窗
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
