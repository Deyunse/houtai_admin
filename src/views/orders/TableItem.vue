<template>
  <el-table border :data="orderlist">
    <el-table-column label="#" type="index"> </el-table-column>
    <el-table-column label="订单编号" prop="order_number"> </el-table-column>
    <el-table-column label="订单价格" prop="order_price"> </el-table-column>
    <el-table-column label="是否付款">
      <template v-slot="{ row }">
        <el-button size="small" type="danger" v-if="row.order_pay === '0'">
          未支付
        </el-button>
        <el-button size="small" type="success" v-else>已支付</el-button>
      </template>
    </el-table-column>
    <el-table-column label="是否发货" prop="is_send"> </el-table-column>
    <el-table-column label="下单时间" prop="create_time"> </el-table-column>
    <el-table-column label="操作">
      <template>
        <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters(['orderlist'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-table {
  margin-top: 15px;
}
</style>
