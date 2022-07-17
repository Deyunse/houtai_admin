<template>
  <div>
    <router-view></router-view>
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
            v-model="parmas.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchFn"
            ></el-button>
          </el-input>
        </div>
        <el-button
          type="primary"
          class="add"
          @click="$router.push({ name: 'add' })"
          >添加商品</el-button
        >
      </div>
      <el-table border style="width: 100%" stripe :data="goodsList.goods">
        <el-table-column label="#" width="60" prop="index"> </el-table-column>
        <el-table-column label="商品名称" prop="goods_name"> </el-table-column>
        <el-table-column label="商品价格(元)" width="106" prop="goods_price">
        </el-table-column>
        <el-table-column label="商品重量" width="106" prop="goods_number">
        </el-table-column>
        <el-table-column label="创建时间" width="106" prop="add_time">
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="small"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="small"
              >删除</el-button
            >
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
          :total="goodsList.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('goods/getGoods', this.parmas)
  },
  data () {
    return {
      parmas: {
        query: '',
        pagenum: 1,
        pagesize: 5
      }

    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.parmas.pagesize = val
      this.$store.dispatch('goods/getGoods', this.parmas)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.parmas.pagenum = val
      this.$store.dispatch('goods/getGoods', this.parmas)
    },
    searchFn () {
      this.$store.dispatch('goods/getGoods', this.parmas)
    }
  },
  computed: {
    ...mapGetters(['extentList', 'goodsList'])
  },
  watch: {
    'parmas.query' () {
      if (this.parmas.query === '') {
        this.$store.dispatch('goods/getGoods', this.parmas)
      }
    }
  },
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
