<template>
  <div>
    <el-table border :data="list" highlight-current-row>
      <el-table-column width="50px" type="expand">
        <template v-slot="scope">
          <el-row>
            <el-tag
              closable
              v-for="(item, index) in scope.row.attr_vals"
              :key="index"
              >{{ item }}</el-tag
            >

            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
            ></el-input>
            <el-button
              class="button-new-tag"
              size="small"
              @click="showInput"
              v-else
              >+ New Tag</el-button
            >
          </el-row>
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
        <el-form-item label="参数名称" prop="value">
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
import { editPut } from '@/api/params'
export default {
  props: {
    list: {
      type: Array,
      requireq: true
    },
    id: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      inputVisible: false,
      inputValue: '',
      dialogVisible: false,
      form: {
        attr_name: '', // 修改的值
        attr_id: null
      },
      rules: {
        value: [{
          required: true, message: '名称不能为空', tirgger: 'bulr'
        }]
      }
    }
  },
  methods: {
    showInput () {
      this.inputVisible = true
    },
    del () {

    },
    editAttr (row) { // 点击编辑按钮
      this.dialogVisible = true
      this.form.attr_name = row.attr_name
      this.form.attr_id = row.attr_id
    },
    async editAttributes () {
      this.dialogVisible = false
      // 去父组件修改
      try {
        const res = await editPut(this.id - 0, this.form)
        console.log(res)
      } catch (error) {
        this.$message.error('修改失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-table {
  margin-top: 15px;
}
.el-button--small {
  padding: 7px 20px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.el-row {
  padding: 20px;
  .el-tag {
    margin: 0 5px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
