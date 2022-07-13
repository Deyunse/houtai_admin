<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度必须在3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度必须在3到8之间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      try {
        await this.$refs.loginFormRef.validate()
        // this.$message.success('验证通过')
        // console.log(this.$store.state.user)
        try {
          const res = await login(this.loginForm)

          // console.log(res)
          this.$store.commit('user/setUser', res.data.data.token)
          this.$message.success('登录成功')

          // todo 持续化
          this.$router.push({ name: 'welcome' })
        } catch (err) {
          // console.log(err)
          this.$message.error('账户或密码错误')
        }
      } catch (err) {
        this.$message.error('登录表单检验失败')
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
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/bg.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
