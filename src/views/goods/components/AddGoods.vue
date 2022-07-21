<template>
  <div>
    <TableCrumbs
      :manage="extentList[0].authName"
      :list="extentList[0].children[0].children[0].authName"
    ></TableCrumbs>
    <div class="add-container">
      <p><i class="el-icon-info"> </i>&nbsp;&nbsp;添加商品信息</p>

      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs
        :tab-position="tabPosition"
        style="min-height: 200px"
        v-model="activeIndex"
        @tab-click="handleChange"
      >
        <!-- 基本信息 -->
        <el-tab-pane name="0" label="基本信息">
          <el-form :model="goodsObj" :rules="rules">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="goodsObj.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input
                type="number"
                v-model.number="goodsObj.goods_price"
                controls-position="right"
                :controls="false"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input
                type="number"
                v-model.number="goodsObj.goods_weight"
                controls-position="right"
                :controls="false"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input
                type="number"
                v-model.number="goodsObj.goods_number"
                controls-position="right"
                :controls="false"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <template label>
                <div>商品分类</div>
              </template>
              <el-cascader
                v-model="goodsObj.goods_cat"
                :options="options"
                :props="{
                  label: 'cat_name',
                  children: 'children',
                  expandTrigger: 'hover',
                  value: 'cat_id',
                }"
                ref="mycascader"
                emitPath
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 商品参数 -->
        <el-tab-pane name="1" label="商品参数">
          <el-form>
            <el-form-item v-for="(item, index) in parameters" :key="index">
              <template label
                ><div>{{ item.attr_vals }}</div></template
              >
              <el-checkbox-group v-model="ischecked">
                <el-checkbox border :label="item.attr_id"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 商品属性 -->
        <el-tab-pane name="2" label="商品属性">
          <el-form>
            <el-form-item
              :label="item.attr_name"
              v-for="(item, index) in property"
              :key="index"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 商品图片 -->
        <el-tab-pane name="3" label="商品图片">
          <el-upload
            action="http://liufusong.top:8899/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button type="primary" size="small">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品内容">
          <template>
            <RichText @addgoods="addgoods"></RichText>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
// import BasicMsg from './BasicMsg' // 商品信息
import { getCateGories, getSort, getProperty, addGoods } from '@/api/goods'
import RichText from './RichText'
export default {
  created () {
    this.getCateGories()
  },
  data () {
    return {
      tabPosition: 'left',
      activeIndex: 0,
      goodsObj: {
        goods_name: '',
        goods_cat: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [{ required: true, message: '亲输入商品名称', trigger: 'blur' }]
      },
      options: [],
      value: [],
      parameters: [],
      property: [],
      ischecked: []

    }
  },
  methods: {
    handleClick () {
    },
    handleChange (tab, event) {
      // console.log(tab)
      if (this.activeIndex === '0') {
        this.getCateGories()
      } else if (this.activeIndex === '1') {
        this.getSort()
      } else if (this.activeIndex === '2') {
        this.getProperty()
      }
      // console.log(123)
    },
    async getCateGories () {
      try {
        const res = await getCateGories()
        console.log(res.data.data)
        this.options = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getSort () {
      try {
        const res = await getSort(this.goodsObj.goods_cat[this.goodsObj.goods_cat.length - 1])
        res.data.data.forEach(item => this.ischecked.push(item.attr_id))
        res.data.data.forEach(item => this.goodsObj.attrs.push({ attr_id: item.attr_id, attr_value: item.attr_vals }))
        this.parameters = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getProperty () {
      try {
        const res = await getProperty(this.goodsObj.goods_introduce.length)
        // console.log(res)
        this.property = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    handleRemove (file, fileList) {
      this.handlePreview()
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
      let files = []
      files.push(file)
      files.forEach(item => {
        this.goodsObj.pics.push(item.url)
      })
    },
    async addgoods (value) {
      // 处理 数据属性

      this.goodsObj.attrs.forEach(val => {
        if (this.ischecked.includes(val.attr_id)) {
          return val
        } else {
          delete this.goodsObj.val
        }
      })
      this.goodsObj.goods_cat = this.goodsObj.goods_cat.join(',')
      this.goodsObj.goods_introduce = value
      // console.log(this.goodsObj)
      try {
        await addGoods(this.goodsObj)
        this.$router.push({ name: 'goods' })
      } catch (error) {
        this.$message.error(error)
      }
    }

  },
  computed: {
    ...mapGetters(['extentList'])
  },
  watch: {},
  filters: {},
  components: { RichText }
}
</script>

<style scoped lang='less'>
.add-container {
  padding: 20px;
  background-color: #fff;
  margin-top: 15px;
  p {
    width: 100%;
    height: 37px;
    background-color: #f4f4f5;
    border-radius: 5px;
    font-size: 13px;
    text-align: center;
    line-height: 37px;
    color: #909399;
    margin-bottom: 15px;
    i {
      font-size: 16px;
    }
  }
  .el-steps {
    margin-bottom: 20px;
  }
}
</style>
