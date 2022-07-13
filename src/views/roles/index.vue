<template>
  <div>
    <TableCrumbs
      :manage="extentList[2].authName"
      :list="extentList[2].children[0].authName"
    ></TableCrumbs>
    <div class="roles">
      <el-button
        type="primary"
        class="add"
        @click="dialogVisible = true"
        style="margin: 20px 0"
        >添加角色</el-button
      >
      <el-table border :data="roleForm" stripe>
        <el-table-column label="#" width="47px" type="expand">
          <template slot-scope="props">
            <el-form>
              <el-form-item>
                <div class="content">
                  <el-row
                    v-for="(item, index) in props.row.children"
                    :key="index"
                  >
                    <!-- 第一行 -->
                    <el-col :span="5">
                      <div class="box1">
                        <el-tag>23123{{ item.authName }} </el-tag>
                        <i class="el-icon-caret-right"></i>
                      </div>
                    </el-col>
                    <el-row>
                      <el-col
                        :span="5"
                        v-for="(item1, ind) in item.children"
                        :key="ind"
                      >
                        <el-tag type="success">123{{ item1.authName }} </el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="19">123 </el-col>
                    </el-row>
                  </el-row>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="index" label="#" width="47px"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-row>
              <el-button size="mini" type="primary" icon="el-icon-edit"
                >编辑</el-button
              >

              <el-button size="mini" type="danger" icon="el-icon-delete"
                >删除</el-button
              >
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                class="btn"
                >分配权限</el-button
              >
            </el-row>
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
    this.$store.dispatch('user/getRole')
  },
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters(['roleForm', 'extentList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.roles {
  background-color: #fff;
  margin-top: 20px;
  padding: 15px;
  .el-table {
    .el-button {
      width: 85px;
    }
  }
}
.content {
  margin: 20px 50px;
  padding: 10px;
}
.box1 {
  width: 100%;
  height: 100%;
  padding-left: 20px;
}
.box2 {
  display: flex;
  flex-wrap: wrap;
}
.el-row {
  .el-col {
    display: flex;
    justify-self: center;
    align-items: center;
  }
}
</style>
