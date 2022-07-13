<template>
  <div>
    <TableCrumbs
      :manage="extentList[0].authName"
      :list="extentList[0].children[0].authName"
    ></TableCrumbs>
    <el-card class="box-card">
      <div class="search-header">
        <div style="margin-top: 15px">
          <el-input
            placeholder="请输入内容"
            v-model="obj.query"
            class="input-with-select"
            :clearable="true"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="fn"
            ></el-button>
          </el-input>
        </div>
        <el-button type="primary" class="add" @click="dialogVisible = true"
          >添加用户</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table :data="UsersList.users" border style="width: 100%" stripe>
        <el-table-column prop="index" label="#" width="60"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.mg_state"
              @change="updateState(scoped.row.id, scoped.row.mg_state)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="196">
          <template v-slot="scoped">
            <el-row>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="modify(scoped.row.id)"
              ></el-button>

              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="open(scoped.row.id)"
              ></el-button>
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="onRole(scoped.row.id)"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="UsersList.total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <el-form label-width="80px" :model="addUser" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户资料 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form label-width="80px" :rules="rules" :model="updataUser">
        <el-form-item label="用户名称">
          <el-input v-model="updataUser.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updataUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="updataUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataFn">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="roleShow">
      <p>当前的用户:{{ updataUser.username }}</p>
      <p>当前的角色:{{ updataUser.role_name }}</p>

      <el-form>
        <el-form-item label="分配新角色">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item, index) in roleForm"
              :key="index"
              :label="item.roleName"
              :value="item.id"
              @change="onChange(values)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleShow = false">取 消</el-button>
        <el-button type="primary" @click="roleShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updatedState, addUsers, updatedUser } from '@/api/user'
import { validateEmail, validateMobile } from '@/utils/validate'
export default {
  name: 'User',
  created () {
    this.$store.dispatch('user/getUsers', this.obj)
    this.$store.dispatch('user/getRole')
  },
  data () {
    // 验证邮箱 方法
    const validateEmailFn = (rule, value, callback) => {
      if (validateEmail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    const validateMobileFn = (rule, value, callback) => {
      if (validateMobile(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确'))
      }
    }
    return {
      search: '',
      obj: {
        query: '',
        pagenum: 1, // 当前页码
        pagesize: 5 // 每页页显示条数
      },
      dialogVisible: false,
      dialogFormVisible: false,
      roleShow: false,
      // 输入框 值
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        role_name: ''
      }, // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trygger: 'blur' },
          { min: 2, max: 7, message: '长度在2到7位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trygger: 'blur' },
          { min: 2, max: 7, message: '长度在2到7位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱格式不正确', trygger: 'blur' },

          {
            validator: validateEmailFn, trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '手机格式不正确', trygger: 'blur' },
          { validator: validateMobileFn, trigger: 'blur' }
        ]
      },
      updataUser: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      value: ''

    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.obj.pagesize = val
      this.$store.dispatch('user/getUsers', this.obj)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.obj.pagenum = val
      this.$store.dispatch('user/getUsers', this.obj)
    },
    // 修改用户的状态
    async updateState (uId, type) {
      try {
        await updatedState(uId, type)
        this.$message.success('更新用户状态成功！')
      } catch (err) {
        console.log(err)
        this.$message.error('更新用户状态失败！')
      }
    },
    fn () {
      this.$store.dispatch('user/getUsers', this.obj)
    },
    // 添加用户
    async add () {
      this.dialogVisible = false
      try {
        await addUsers(this.addUser)
        // 添加成功后 重新或列表
        this.$store.dispatch('user/getUsers', this.obj)
      } catch (err) {
        console.log(err)
      }
    },
    modify (id) {
      this.updataUser.id = id
      const index = this.UsersList.users.findIndex(item => item.id === id)
      console.log(this.UsersList.users[index].username)
      this.updataUser.username = this.UsersList.users[index].username
      this.updataUser.email = this.UsersList.users[index].email
      this.updataUser.mobile = this.UsersList.users[index].mobile
      this.updataUser.role_name = this.UsersList.users[index].role_name
      this.dialogFormVisible = true
    },
    // 更改用户资料
    async updataFn () {
      const data = { id: this.updataUser.id, email: this.updataUser.email, mobile: this.updataUser.mobile }
      try {
        await updatedUser(data)
        this.$store.dispatch('user/getUsers', this.obj)
        this.$message.success('修改成功')
      } catch (err) {
        console.log(err)
      }
      this.dialogFormVisible = false
    },
    open (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/delUser', id)
        this.$store.dispatch('user/getUsers', this.obj)
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
    },
    onRole (id) {
      console.log(id)
      console.log(this.value)
      this.roleShow = true
    }
  },
  computed: {
    ...mapGetters(['UsersList', 'roleForm', 'extentList'])
  },
  watch: {
    'obj.query' () {
      if (this.obj.query === '') {
        this.$store.dispatch('user/getUsers', this.obj)
      }
    }
  },
  filters: {},
  components: {}
}
</script>
<style scoped lang='less'>
.search-header {
  background-color: #fff;
  padding: 5px 20px 20px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  .add {
    margin-left: 20px;
    height: 40px;
    margin-top: 12px;
  }
}
.block {
  margin-top: 20px;
}
</style>
