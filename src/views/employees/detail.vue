<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登陆账户设置" name="first">
            <el-form
              ref="form"
              :model="accountInfo"
              :rules="accountInfoRule"
              label-width="80px"
            >
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountInfo.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="updateEmployees"
                >更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            lazy
            label="个人详情"
            name="second"
          ><UserInfo /></el-tab-pane>
          <el-tab-pane
            lazy
            label="岗位信息"
            name="third"
          ><JobInfo /></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/employess'
import UserInfo from '@/views/employees/component/user-info.vue'
import JobInfo from '@/views/employees/component/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      accountInfoRule: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' },
          { min: 6, message: '密码最少6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserDetailByIdApi()
  },
  methods: {
    // 获取个人的信息
    async getUserDetailByIdApi() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountInfo = res
    },
    async updateEmployees() {
      try {
        // 验证表单
        await this.$refs.form.validate()
        // 更新用户信息
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log('校验失败')
      }
    },
    tabClick() {
      // 将控制tab栏显示的字段存到本地，刷新页面不跳转
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style></style>
