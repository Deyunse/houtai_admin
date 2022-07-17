<template>
  <div>
    <!-- <TableCrumbs
      :manage="extentList[0].authName"
      :list="extentList[0].children[0].children[0].authName"
    ></TableCrumbs> -->
    <div class="add-container">
      <p><i class="el-icon-info"> </i>&nbsp;&nbsp;添加商品信息</p>

      <el-steps :space="200" :active="1" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs
        :tab-position="tabPosition"
        style="height: 200px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="基本信息">用户管理</el-tab-pane>
        <el-tab-pane label="商品参数">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
        <el-tab-pane label="完成">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () { },
  data () {
    return {
      tabPosition: 'left'
    }
  },
  methods: {

  },
  computed: {
    ...mapGetters(['extentList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.add-container {
  padding: 20px;
  background-color: #fff;
  margin-top: 15px;
  p {
    width: 100%;
    height: 37px;
    background-color: #f4f4f5;
    border-radius: 5px;
    font-size: 13px;
    text-align: center;
    line-height: 37px;
    color: #909399;
    margin-bottom: 15px;
    i {
      font-size: 16px;
    }
  }
}
</style>
