<template>
  <div class="app-container">
    <PageTolls>
      <template #before>
        <span slot="before">共166条记录</span>
      </template>
      <template #after>
        <el-button
          size="small"
          type="warning"
          @click="$router.push('/import')"
        >导入</el-button>
        <el-button
          size="small"
          type="danger"
          @click="exportExcel"
        >导出</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleEmploy"
        >新增员工</el-button>
      </template>
    </PageTolls>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column
          label="聘用形式"
          prop="formOfEmployment"
          :formatter="formatterFn"
        />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{ row }">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              @click="view(row)"
            >查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="del(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next, sizes, total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2, 5, 10]"
          :total="total"
          @current-change="getEmployeeListApi"
          @size-change="getEmployeeListApi"
        />
      </el-row>
    </el-card>
    <!-- 弹窗 -->
    <AddEmployee :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import AddEmployee from './component/add-employee.vue'
import { getEmployeeList, delEmployee } from '@/api/employess'
import EnumHireType from '@/api/constant/employees'
export default {
  name: 'HrsaasIndex',
  components: {
    AddEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType,
      dialogVisible: false
    }
  },
  mounted() {
    this.getEmployeeListApi()
  },
  methods: {
    // 渲染页面列表
    async getEmployeeListApi() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    // 聘用形式格式化
    formatterFn(row, column, cellValue) {
      const res = this.hireType.find((ele) => ele.id === parseInt(cellValue))
      return (res && res.value) || this.hireType[1].value
    },
    handleEmploy() {
      this.dialogVisible = true
    },
    // 删除功能
    async del(id) {
      try {
        await this.$confirm('确认删除给员工吗', '提示', {
          type: 'warning'
        })
        // 调用删除接口
        await delEmployee(id)
        this.$message.success('删除成功')
        // 渲染页面
        this.getEmployeeListApi()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    // 导出excel
    async exportExcel() {
      // 文件懒加载， 点击导出时，import('@/vendor/Export2Excel')，返回promise
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      // 获得全部的列表
      const { rows } = await getEmployeeList({ page: 1, size: this.total })
      console.log(rows)
      const exportData = {
        手机号: 'mobile',
        姓名: 'username',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      const header = Object.keys(exportData)
      //   数据是一个二维数组，第一层长度和获取到的数据列表长度一致
      const newArr = rows.map((item) => {
        // 里面的数组顺序要和header的长度和顺序一致
        // 通过映射表找两者之间的关联
        return header.map((h) => {
          // 返回的聘用形式为1，2，需要经过判断以下，修改为对应的value
          if (h === '聘用形式') {
            const find = this.hireType.find((hire) => {
              // 如果返回的值与hireType的id值相等，返回hireType的value值
              return hire.id === parseInt(item[exportData[h]])
            })
            return find ? find.value : '未知'
          }
          return item[exportData[h]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        data: newArr, // 具体数据 必填
        filename: '员工信息表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    // 点击查看，跳转路由
    view(row) {
      this.$router.push('/employees/detail/' + row.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
