<template>
  <div>
    <el-row>
      <el-tag
        closable
        v-for="(item, index) in list.attr_vals"
        :key="index"
        @close="del()"
      >
        {{ item }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button class="button-new-tag" size="small" @click="showInput()" v-else
        >+ New Tag</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { addcategories, delAtegor } from '@/api/params.js'
export default {
  props: {
    list: {
      type: Object,
      required: true
    }
  },

  created () { },
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    showInput () {
      this.inputVisible = true
    },
    async handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        if (inputValue === '') return this.$message.error('请输入内容 ')
        const res = await addcategories({ attr_name: inputValue, attr_sel: 'many', attr_vals: this.list.attr_vals.join(' '), attr_id: this.attr_id, cat_id: this.list.cat_id })
        console.log(res)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    del () {
      console.log(this.list)
      try {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await delAtegor(this.list.cat_id, this.list.attr_id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } catch (error) {
        console.log(error)
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
