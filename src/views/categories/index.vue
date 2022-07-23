<template>
  <div>
    <TableCrumbs
      :manage="extentList[0].authName"
      :list="extentList[0].children[0].authName"
    ></TableCrumbs>
    <el-card>
      <el-button type="primary">添加分类</el-button>
      <AddFication :list="list"></AddFication>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddFication from './components/AddFication'
import { getCategories } from '@/api/params'
export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      parmas: {
        pagenum: 1,
        pagesize: 5
      },
      tatol: null,
      list: []
    }
  },
  methods: {
    async getCategories () {
      try {
        const res = await getCategories(this.parmas)
        this.tatol = res.data.data.tatol
        this.list = res.data.data.result
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: { ...mapGetters(['extentList']) },
  watch: {},
  filters: {},
  components: { AddFication }
}
</script>

<style scoped lang='less'>
/deep/.el-card {
  margin-top: 20px;
}
</style>
