<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="用户管理"
          name="first"
        ><el-row>
           <el-col :span="24" /><el-button
             type="primary"
             style="margin-left: 10px"
             @click="addRole"
           >新增人员</el-button>
         </el-row>

          <el-table v-loading="loading" style="width: 100%" :data="roleList">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="120"
            />
            <el-table-column
              align="center"
              prop="name"
              label="名称"
              width="240"
            />
            <el-table-column align="center" prop="description" label="描述" />
            <el-table-column align="center" label="操作">
              <template slot-scope="{ row }">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="editRoil(row)"
                >编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="delRole(row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" align="middle" justify="end" style="height: 60px">
            <el-pagination
              v-if="total > 0"
              background
              layout="prev, pager, next,sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2, 5, 10, 15]"
              @current-change="getRoleList"
              @size-change="getRoleList"
            /></el-row>
        </el-tab-pane>

        <el-tab-pane label="配置管理" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top: 50px">
            <el-form-item label="公司名称">
              <el-input
                v-model="getCompanyList.name"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="getCompanyList.companyAddress"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="getCompanyList.mailbox"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="getCompanyList.remarks"
                type="textarea"
                :rows="3"
                disabled
                style="width: 400px"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- background 添加背景
      current-page当前的页面
      page-size 每一页展示的条数
      page-sizes 每页显示个数选择器的选项设置 total 总共多少条数据
      layout 布局
      current-change改变当前页码的触发(current.-page值改变的时候触发)
      size-change改变页面的数据条数的时候触发(page-size值改变的时候触发) -->
    </el-card>
    <add-role
      ref="addRole"
      :dialog-visible.sync="dialogVisible"
      @refreshList="getRoleList()"
    />
  </div>
</template>

<script>
import { getRoleListApi, deleteRole, getCompanyInfo } from '@/api/setting'
import { mapGetters } from 'vuex'
import addRole from './compoents/addRole.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      dialogVisible: false,
      getCompanyList: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfoApi()
  },
  methods: {
    // 公司设置
    async getRoleList() {
      try {
        this.loading = true
        const res = await getRoleListApi(this.page)
        this.total = res.total
        this.roleList = res.rows
        // 将最后一页的数据删除完的时候,显示无数据,其实是有的,total不为0,length长度为0时表示这种情况
        // 解决方法,重新调用接口
        if (res.total > 0 && res.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 增加
    addRole() {
      this.dialogVisible = true
    },
    // 编辑
    // 点击编辑，显示弹窗，回显数据
    editRoil(row) {
      // 绑定ref拿到组件的formDate的值
      // 地址一样，为引用数据类型，还没保存之前页面已经更改，
      // 解决方法：深浅拷贝
      // 组件库给插槽slot-scope="{ row }"row可以获取到整行的数据(vue里面的)
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
    },
    // 删除角色
    // 给删除按钮添加点击事件
    // 删除按钮需要二次确认
    async delRole(id) {
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用删除接口
        await deleteRole(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 刷新列表
        this.getRoleList()
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 获取公司信息
    async getCompanyInfoApi() {
      this.getCompanyList = await getCompanyInfo()
    }
  }
}
</script>
