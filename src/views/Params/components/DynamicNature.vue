<template>
  <div>
    <el-table border :data="list" highlight-current-row>
      <el-table-column width="50px" type="expand">
        <template v-slot="scope">
          <ModiFication :list="scope.row"></ModiFication>
        </template>
      </el-table-column>
      <el-table-column label="#" width="50px" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="attr_name"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="editAttr(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="del"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改动态参数" :visible.sync="dialogVisible" width="50%">
      <el-form
        label-width="80px"
        :model="form"
        :rules="rules"
        v-if="dialogVisible"
      >
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="form.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAttributes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ModiFication from './ModiFication'
export default {
  props: {
    list: {
      type: Array,
      requireq: true
    }

  },
  created () { },
  data () {
    return {

      dialogVisible: false,
      form: {
        attr_name: '', // 修改的值
        attr_id: null
      },
      rules: {
        attr_name: [{
          required: true, message: '名称不能为空', tirgger: 'bulr'
        }]
      }
    }
  },
  methods: {

    editAttr (row) { // 点击编辑按钮
      this.dialogVisible = true
      this.form.attr_name = row.attr_name
      this.form.attr_id = row.attr_id
    },
    editAttributes () {
      this.dialogVisible = false
      // 去父组件修改
      this.$emit('editPut', this.form)
    },
    del () {

    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ModiFication }
}
</script>

<style scoped lang='less'>
.el-table {
  margin-top: 15px;
}
</style>
