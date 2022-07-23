<template>
  <el-table border :data="list" row-key="cat_id">
    <el-table-column label="#" type="index"></el-table-column>
    <el-table-column label="分类名称" prop="cat_name"> </el-table-column>
    <el-table-column label="是否有效">
      <template v-slot="{ row }">
        <i class="el-icon-success" :class="{ active: row.cat_name }"></i>
      </template>
    </el-table-column>
    <el-table-column label="排序">
      <template v-slot="{ row }">
        <el-tag type="success" v-if="row.cat_level === 0">一级</el-tag>
        <el-tag v-else-if="row.cat_level === 1">二级</el-tag>
        <el-tag type="warning" v-else>三级</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template>
        <el-button size="small" type="primary" icon="el-icon-edit"
          >编辑</el-button
        >
        <el-button size="small" type="danger" icon="el-icon-delete"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
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
.el-table {
  margin-top: 15px;
  font-size: 12px;
  color: #1f2d3d;
}
/deep/.el-button {
  padding: 8px 15px;
}
.active {
  color: #008000;
}
</style>
