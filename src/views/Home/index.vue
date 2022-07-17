<template>
  <el-container class="container" v-loading="loading">
    <el-header type="flex"
      ><div><span>德云社后台管理系统</span></div>
      <el-button @click="open">退出</el-button></el-header
    >
    <el-container>
      <el-aside
        :width="isCollapse ? 'width:65px' : 'width:200px'"
        :collapse="isCollapse"
      >
        <el-button
          class="btn"
          style="width: 65px; backgroundcolor: pink"
          @click="foo"
          v-if="isCollapse"
          >| | |</el-button
        >
        <el-button
          class="btn"
          @click="foo"
          v-else
          style="width: 200px; backgroundcolor: pink"
          >| | |</el-button
        >
        <el-menu
          :collapse-transition="false"
          background-color="#3b393b"
          text-color="#fff"
          unique-opened
          router
          :default-active="$route.path"
          :collapse="isCollapse"
        >
          <el-submenu
            :index="index + ''"
            v-for="(item, index) in meanusList"
            :key="index"
          >
            <template #title>
              <i class="el-icon-location" style="color: #fff"></i>
              <span slot="title">{{ item.authName }}</span></template
            >
            <el-menu-item
              :index="`/home/${val.path}`"
              v-for="(val, ind) in item.children"
              :key="ind"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ val.authName }}</span></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMeanus } from '@/api/user'
export default {
  created () {
    this.getMeanus()
    this.$store.dispatch('user/getExtent', 'tree')
  },
  data () {
    return {
      meanusList: [],
      isCollapse: false,
      activeIndex: 0,
      loading: true

    }
  },
  methods: {
    async getMeanus () {
      try {
        const res = await getMeanus()
        console.log(res)
        // console.log(res.data.meta.status)

        this.meanusList = res.data.data
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    open () {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('user/setUser', null)
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {

      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    foo () {
      this.isCollapse = !this.isCollapse
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {

  }
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;

  .el-header {
    height: 200px;
    background-color: #3b393b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      font-size: 22px;
      color: #fff;
    }
  }
  .el-aside {
    background-color: #3b393b;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu {
  border-right: none;
}
.el-radio-group {
  width: 200px;
  height: 50px;
  background-color: pink;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
}
.btn {
  background-color: skyblue;
  border-radius: 0;
}
</style>
