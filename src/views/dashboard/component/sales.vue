<template>
  <div class="main">
    <el-row>
      <el-col :span="4"><div class="order">销售统计</div></el-col>
      <el-col
        :span="20"
        class="time"
      ><span>2022.09.01</span>~<span>2022.09.29</span></el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col
        class="gongdan"
      ><span class="number">13958</span><span class="total">订单量(个)</span></el-col>
      <el-col
        class="gongdan"
      ><span class="number">9.02</span><span class="total">销售额(个)</span></el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main {
  background-color: #fbefe8;
  height: 200px;
  border-radius: 20px;
  padding: 20px;
  .time {
    font-size: 14px;
    color: #9c9c9d;
  }
  .order {
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 16px;
  }
  .gongdan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .number {
      font-size: 40px;
      margin-bottom: 15px;
      color: #ff5757;
      font-weight: 700;
    }
    .total {
      font-size: 15px;
      color: #de9791;
    }
  }
}
</style>
