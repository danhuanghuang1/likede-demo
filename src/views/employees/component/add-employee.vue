<template>
  <el-dialog title="新增员工" :visible="dialogVisible">
    <!-- 表单 -->
    <el-form
      ref="addEmployee"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 80%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 80%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 80%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 80%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 80%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 80%"
          placeholder="请选择部门"
          @focus="getDepartments"
        >
          <!-- default-expand-all默认展开 -->
          <!-- :props="{ label: 'name' }"
        props默认渲染label 可通过这个字段改渲染字段 -->
        </el-input>
        <el-tree
          v-show="isShow"
          v-loading="loading"
          style="width: 80%"
          :data="treeData"
          :props="{ label: 'name' }"
          default-expand-all
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 80%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>

    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import employees from '@/api/constant/employees.js'
import { getDepartments } from '@/api/departments'
import { addEmployee } from '@/api/employess'
import { tranListToTreeData } from '@/utils'
export default {
  name: 'HrsaasAddEmployee',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 2,
            max: 4,
            message: '用户姓名为2-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空' }],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      hireType: employees.hireType,
      treeData: [],
      isShow: false,
      loading: false
    }
  },

  mounted() {},

  methods: {
    // 实现弹窗组件的显示和隐藏
    // el-dialog组件显示隐藏 :visible
    // 父到子props点击关闭按钮close $emit去改父组件里的值(upate:dialogVisible)
    // handleClose完善
    // 1，表单重置2.表单绑定的值从新赋值
    handleClose() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.isShow = false
      this.$refs.addEmployee.resetFields() // 重置校验结果
      this.$emit('update:dialogVisible', false)
    },
    // 获取部门树节点
    async getDepartments() {
      // 树的显示隐藏
      this.isShow = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    // 部门input框获取焦点
    selectNode(node) {
      // 第一个参数，当前节点的信息
      this.formData.departmentName = node.name
      this.isShow = false
    },
    // 点击确定
    async btnOk() {
      try {
        await this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        //  关闭弹窗
        this.handleClose()
        // 渲染列表
        this.$parent.getEmployeeListApi()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
