<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name: 'welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ manage }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ list }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    manage: {
      type: String,
      required: true
    },
    list: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 10px;
}
</style>
