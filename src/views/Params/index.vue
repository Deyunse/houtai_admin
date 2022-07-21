<template>
  <div>
    <TableCrumbs
      :manage="extentList[0].authName"
      :list="extentList[0].children[0].children[4].authName"
    ></TableCrumbs>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
      >
        <!-- 级联选择器 -->
      </el-alert>
      <div>
        选择商品分类：<el-cascader
          v-model="isID"
          :options="options"
          :props="{
            label: 'cat_name',
            children: 'children',
            expandTrigger: 'hover',
            value: 'cat_id',
          }"
          @change="handleChange"
          emitPath
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-button type="primary" size="small" @click="add">
          {{ activeName === "first" ? "添加参数" : "添加属性" }}
        </el-button>
        <el-tab-pane label="动态属性" name="first">
          <DynamicNature
            v-if="activeName === 'first'"
            :list="namicList"
            :id="isID[isEdit.length - 1]"
          ></DynamicNature>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <DynamicNature
            v-if="activeName === 'second'"
            :list="namicList"
            :id="isID[isEdit.length - 1]"
          ></DynamicNature>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      @close="form = {}"
    >
      <el-form
        label-width="80px"
        :model="form"
        :rules="rules"
        v-if="dialogVisible"
      >
        <el-form-item :label="isEdit ? '动态参数' : '静态参数'" prop="value">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAttributes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DynamicNature from './components/DynamicNature.vue' // 动态态属性
import { getCateGories, getNatureList, editAttributes } from '@/api/params'
export default {
  created () {
    this.getCateGories() // 所以分类数据列表
  },
  data () {
    return {
      isID: [], // 商品参数
      activeName: 'first', // 标签页默认
      isEdit: true,
      options: [], // 分类数据列表
      sel: 'many', // 参数分类 默认为动态属性
      namicList: [], // 动态属性列表
      dialogVisible: false, // 弹出层
      form: {
        value: ''
      },
      rules: {
        value: [{
          required: true, message: '内容不能为空', tirgger: 'bulr'
        }]
      }
    }
  },
  methods: {
    handleClick () {
      // if (this.namicList === []) return
      if (this.activeName === 'first') {
        this.sel = 'many'
        this.getNatureList()
      } else {
        this.sel = 'only'
        this.getNatureList()
      }
    },
    handleChange () {
      this.getNatureList() // 级联选择器 选择后发送ajax
    },
    async getCateGories () {
      try {
        const res = await getCateGories() // 获取所有分类数据列表
        console.log(res)
        this.options = res.data.data
      } catch (error) {
        this.$message.error('获取列表失败')
      }
    },
    async getNatureList () { //
      try {
        const res = await getNatureList({ id: this.isID[2], sel: this.sel })
        // console.log(res)
        this.namicList = res.data.data
        this.namicList.forEach(item => {
          if (item.attr_vals === '') {
            item.attr_vals = ''
          } else {
            item.attr_vals = item.attr_vals.split(' ')
          }
        })
      } catch (error) {
        this.$message.error('请选择三级分类')
      }
    },
    add () { // 点击添加按钮 区分点击的是那个页面的按钮
      if (this.activeName === 'first') {
        this.isEdit = true
        this.dialogVisible = true
      } else {
        this.isEdit = false
        this.dialogVisible = true
      }
    },
    async editAttributes (id, data) {
      try {
        await editAttributes(id, data) // 发送添加的ajax
        this.$message.success('新增属性成功')
      } catch (error) {
        this.$message.error('新增属性失败')
      }
    },
    addAttributes () {
      this.dialogVisible = false
      if (this.isEdit) { // 确定按钮 判断 是在那个页面去添加
        this.editAttributes(this.isID[this.isID.length - 1], { attr_name: this.form.value, attr_sel: 'many' })
      } else {
        this.editAttributes(this.isID[this.isID.length - 1], { attr_name: this.form.value, attr_sel: 'only' })
      }
      this.handleClick()
    }
  },
  computed: {
    ...mapGetters(['extentList']),
    title () {
      return this.isEdit ? '添加动态参数' : '添加静态属性'
    }
  },
  watch: {},
  filters: {},
  components: { DynamicNature }
}
</script>

<style scoped lang='less'>
.el-alert {
  margin-bottom: 15px;
}
</style>
