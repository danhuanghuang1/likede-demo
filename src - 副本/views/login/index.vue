<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- title -->
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>
      <!-- 用户和密码框 -->
      <el-form-item prop="mobile">
        <span class="svg-container el-icon-user-solid" />
        <el-input v-model="loginForm.mobile" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="pwd" v-model="loginForm.password" :type="passWordType" />
        <span class="svg-container" @click="showPew">
          <svg-icon
            :icon-class="passWordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        class="loginBtn"
        :loading="loading"
        @click="loginPage"
      >登录</el-button>

      <div class="tips">
        <span style="margin-right: 20px">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 环境变量的作用
// 1,正常公司中有几个环境 4 开发dev 测试test 预发uat 线上pro
// 在项目里如何配置这个环境通过，env配置base api
// 这个文档中
// 开发环境的接口前缀/api
// 线上环境的接口前缀/prod-api
import { validPhone } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const phoneVaild = (rule, value, callback) => {
      // 验证没有通过
      if (!validPhone(value)) {
        // 提示错误文本
        callback(new Error('手机号码格式错误'))
      } else {
        // 验证通过，放行
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '',
        password: ''
      },
      passWordType: 'password',
      // 表单校验规则
      rules: {
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          // validator固定写法
          {
            validator: phoneVaild,
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' },
          { max: 16, min: 6, message: '密码格式不对', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  watch: {},
  methods: {
    showPew() {
      this.passWordType === 'password'
        ? (this.passWordType = 'text')
        : (this.passWordType = 'password')
      this.$nextTick(() => {
        // 光标聚焦
        this.$refs.pwd.focus()
      })
    },
    async loginPage() {
      try {
        await this.$refs.loginForm.validate()
        // 发起登录接口,将请求成功返回的token存到vuex中，this.$store返回的是promise所以可以await
        await this.$store.dispatch('user/loginAction', this.loginForm)
        // console.log(this.loginForm)
        this.loading = true
        this.$router.push('/dashboard')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #d3e4ff;
$light_gray: #68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background: rgba(255, 255, 255, 0.7);
  }
  .el-form-item__error {
    color: #fff;
  }
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
    width: 100%;
    margin-bottom: 30px;
    border: none;
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
