<template>
  <div>
    <TableCrumbs
      :manage="extentList[0].authName"
      :list="extentList[0].children[0].children[1].authName"
    ></TableCrumbs>
    <el-card> 123 </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: { ...mapGetters(['extentList']) },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
