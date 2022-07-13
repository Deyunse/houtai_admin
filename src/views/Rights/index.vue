<template>
  <div>
    <TableCrumbs
      :manage="extentList[2].authName"
      :list="extentList[2].children[1].authName"
    ></TableCrumbs>
    <div class="container">
      <el-table border :data="extentTeer" stripe>
        <el-table-column label="#" width="48" prop="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="scoped">
            <el-tag v-if="scoped.row.level === '0'">等级一</el-tag>
            <el-tag type="success" v-else-if="scoped.row.level === '1'"
              >等级二</el-tag
            >
            <el-tag type="warning" v-else>等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('rights/getExtent', 'list')
  },
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters(['extentList', 'extentTeer'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  background-color: #fff;
  padding: 40px 20px;
}
</style>
