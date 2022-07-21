<template>
  <div>
    <TableCrumbs
      :manage="extentList[2].authName"
      :list="extentList[2].children[0].authName"
    ></TableCrumbs>
    <div class="roles">
      <el-button type="primary" class="add" style="margin: 20px 0"
        >添加角色</el-button
      >
      <el-table border :data="roleForm" stripe>
        <el-table-column label="#" width="47px" type="expand">
          <template v-slot="scope">
            <el-row
              v-for="(item, index) in scope.row.children"
              :key="item.id"
              :class="['roles_data', 'bom', index === 0 ? 'top' : '']"
            >
              <el-col :span="5">
                <el-tag>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>

              <el-col :span="19">
                <el-row
                  v-for="(val, ind) in item.children"
                  :key="val.id"
                  :class="['roles_data', ind === 0 ? '' : 'top']"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{ val.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item1 in val.children"
                      :key="item1.id"
                      closable
                      @close="open(scope.row, item1.id)"
                      >{{ item1.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="index" label="#" width="47px"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
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
                @click="powerBtn(scope.row)"
                >分配权限</el-button
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="50%"
      @close="clearFn"
    >
      <el-tree
        :data="extentList"
        show-checkbox
        node-key="id"
        :props="{ label: 'authName', children: 'children' }"
        default-expand-all
        :default-checked-keys="cheacked"
        ref="tree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { delRole, roleAuthorization } from '@/api/roles'
export default {
  created () {
    this.$store.dispatch('user/getRole')
  },
  data () {
    return {
      dialogVisible: false,
      cheacked: [],
      roleId: ''
    }
  },
  methods: {
    powerBtn (rowObj) {
      this.roleId = rowObj.id
      this.$store.dispatch('user/getExtent', 'tree')
      // console.log(this.roleFormz)
      // function fn (list) {
      // console.log(list)
      this.filterFn(rowObj)
      // this.$store.dispatch('user/getRole')
      this.dialogVisible = true
    },

    async open (rightId, roleId) {
      // console.log(rightId)
      // this.cheacked = [
      try {
        await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await delRole(rightId.id, roleId)
        // console.log(res)
        // console.log(roleId)
        if (res.request.status === 200) {
          // console.log(res)
          rightId.children = res.data.data
        } else {
          this.$message.error('取消权限失败')
        }
        // console.log(123)
        // console.log(this.cheacked)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (err) {
        this.$notify({
          message: '取消删除成功！'
        })
      }
    },
    filterFn (rowObj) {
      // console.log(rowObj)
      if (!rowObj.children) {
        return this.cheacked.push(rowObj.id)
      }
      rowObj.children.forEach(item => this.filterFn(item))
      // console.log(this.cheacked)
    },
    async addRoles () {
      this.dialogVisible = false

      let arr = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      // console.log(arr)
      try {
        await roleAuthorization({ rids: arr.join(',') }, this.roleId)
        this.$store.dispatch('user/getRole')
      } catch (error) {
        console.log(error)
      }
    },
    clearFn () {
      this.cheacked = []
    }

  },
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
.el-tag {
  margin: 15px;
}
.el-icon-close {
  border-radius: 50%;
  background-color: #fff;
}
.roles_data {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top {
  border-top: 1px solid #eee;
}
.bom {
  border-bottom: 1px solid #eee;
}
</style>
