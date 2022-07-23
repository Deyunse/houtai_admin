<template>
  <div>
    <TableCrumbs
      :manage="extentList[0].authName"
      :list="extentList[1].children[0].authName"
    ></TableCrumbs>
    <el-card>
      <div style="margin-top: 15px; width: 40%" class="search-header">
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          :clearable="true"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <TableItem></TableItem>
    </el-card>
  </div>
</template>

<script>
import TableItem from './TableItem.vue'
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('orders/getOrder', this.params)
  },
  data () {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['extentList'])
  },
  watch: {},
  filters: {},
  components: { TableItem }
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
</style>
