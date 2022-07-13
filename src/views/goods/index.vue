<template>
  <div>
    <TableCrumbs
      :manage="extentList[0].authName"
      :list="extentList[0].children[0].authName"
    ></TableCrumbs>
    <el-card class="box-card">
      <div class="search-header">
        <div style="margin-top: 15px; width: 370px">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            :clearable="true"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-button type="primary" class="add">添加商品</el-button>
      </div>
      <el-table border style="width: 100%" stripe>
        <el-table-column label="#" width="60"> </el-table-column>
        <el-table-column label="商品名称"> </el-table-column>
        <el-table-column label="商品价格(元)" width="106"> </el-table-column>
        <el-table-column label="创建时间" width="106"> </el-table-column>
        <el-table-column label="操作" width="190">
          <template>
            <el-button type="primary"></el-button>
            <el-button type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          total="12"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
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
.search-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  .add {
    margin-left: 20px;
    height: 40px;
    margin-top: 12px;
  }
}
/deep/.el-card__body {
  margin-top: 5px;
  padding: 0 20px 15px;
  border: 0;
}
.search-header {
  margin-bottom: 15px;
}
.block {
  margin-top: 20px;
}
</style>
