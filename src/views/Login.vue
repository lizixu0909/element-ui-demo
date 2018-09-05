<template>
  <div class="login">
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span>欢迎使用</span>
      </div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off">
            <template slot="prepend">
              <i class="iconfont icon-yonghu"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" @keyup.enter.native="submit" auto-complete="off">
            <template slot="prepend">
              <i class="iconfont icon-mima"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="submit" :loading="$store.state.loading">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {login} from '@/api'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    sessionStorage.removeItem('user')
  },
  methods: {
    submit () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            sessionStorage.setItem('user', res)
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    background-image: url("../assets/login_bg.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .card {
      position: absolute;
      width: 350px;
      height: 300px;
      right: 180px;
      top: 50%;
      transform: translateY(-60%);
    }

    .card-body {
      margin-top: 20px;
    }

    .btn-login {
      width: 100%;
    }
  }
</style>
