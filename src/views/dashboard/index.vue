<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row>
      <el-col :span="18" class="grid-content">
        <div class="main">
          <el-row>
            <!-- 工单统计 -->
            <el-col
              :span="12"
            ><div class="statistical"><statistical /></div>
            </el-col>
            <!-- 销售统计 -->
            <el-col :span="12"><div class="statistical"><sales /></div> </el-col>
          </el-row>
        </div>
        <!-- 销售数据 -->
        <div class="sales">销售数据</div>
      </el-col>
      <!-- 商品热榜 -->
      <el-col :span="6" class="grid-content">
        <div class="hot">商品热榜</div>
      </el-col>
    </el-row>
    <el-row>
      <!-- 合作商点位数 -->
      <el-col :span="12"><div class="cooperation">合作商点位数</div></el-col>
      <!-- 异常设备监控 -->
      <el-col :span="12"><div class="abnormal">异常设备监控</div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import statistical from './component/statistical.vue'
import sales from './component/sales.vue'
export default {
  name: 'Dashboard',
  components: {
    statistical,
    sales
  },
  computed: {
    ...mapGetters(['name'])
  }
  // created() {
  //   this.$store.dispatch('user/getuserInfo')
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container {
  .main {
    // background-color: red;
    height: 200px;
  }
  .hot {
    background-color: pink;
    height: 600px;
  }
  .statisticals {
    height: 200px;
    background-color: aqua;
    margin-right: 10px;
  }
  .sales {
    background-color: aqua;
    height: 380px;
  }
  .abnormal,
  .cooperation {
    margin: 20px 10px 0 0;
    height: 500px;
    background-color: deeppink;
  }
}
</style>
