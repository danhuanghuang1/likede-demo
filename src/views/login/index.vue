<template>
  <div class="login-container">
    <div class="whiteBox">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <img src="../../assets/common/logo.png" alt="">
        </div>
        <!-- 用户 -->
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username" v-model="loginForm.username" type="text" />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="pwd"
            v-model="loginForm.password"
            :type="passwordType"
            tabindex="2"
          />
          <span class="show-pwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              @click="isOpen"
            />
          </span>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="verify">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.verify"
            placeholder="请输入验证码"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
          <img :src="imgData" alt="" class="safe" @click="changeCode">
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px; height: 50px"
          @click="loginApi"
        >登录</el-button>

        <div class="tips">
          <span style="margin-right: 20px">username: admin</span>
          <span> password: any</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validPhone } from '@/utils/validate'
import { changeCodeNum } from '@/api'
export default {
  name: 'Login',
  data() {
    const validUsername = (rules, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('用户名格式错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        verify: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' },
          { validator: validUsername }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' },
          { min: -5, max: 16, message: '密码格式不对', trigger: 'blur' }
        ],
        verify: [{ required: true, message: '验证码必填', trigger: 'blur' }]
      },
      passwordType: 'password',
      randomNum: '',
      imgData: '',
      loading: false
    }
  },
  created() {
    this.changeCode()
    this.$store.dispatch('user/getUserInfo')
  },

  methods: {
    // 生成随机验证码
    // 图片验证码请求
    async changeCode() {
      this.randomNum = Math.random()
      try {
        const res = await changeCodeNum(this.randomNum)
        const url = window.URL.createObjectURL(res.data)
        // 将图片转换成img标签可以识别的url
        // console.log(url)
        this.imgData = url
      } catch (error) {
        this.$message({
          type: 'warning',
          message: '系统错误，请联系管理员!'
        })
      }
    },
    // 控制密码框睁眼闭眼
    isOpen() {
      this.passwordType === 'password'
        ? (this.passwordType = 'text')
        : (this.passwordType = 'password')
      this.$nextTick(() => {
        // 光标聚焦
        this.$refs.pwd.focus()
      })
    },
    // 用户登录
    async loginApi() {
      try {
        await this.$refs.loginForm.validate()

        const res = await this.$store.dispatch('user/loginAction', {
          loginName: this.loginForm.username,
          password: this.loginForm.password,
          code: this.loginForm.verify,
          clientToken: this.randomNum,
          loginType: 0
        })
        if (res.data.msg === '登录成功') {
          this.$router.push('/dashboard')
        } else if (res.data.msg === '验证码错误') {
          this.$message({
            type: 'error',
            message: '验证码错误!'
          })
        } else if (res.data.msg === '账户名或密码错误') {
          this.$message({
            type: 'error',
            message: '账户名或密码错误!'
          })
        }
        this.loading = true
      } catch (error) {
        console.log(error)
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

$bg: #fff;
$light_gray: #889aa4;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
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
    border: 1px solid #e2e2e2;
    background: rgba(0, 0, 0, 0);
    border-radius: 5px;
    color: #454545;
  }
  .el-button {
    background-color: #6377ec;
  }

  .safe {
    position: absolute;
    top: 0;
    right: 0px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #889aa4;

.login-container {
  background: url('../../assets/common/background.png') no-repeat 0 0 / cover;
  // min-height: 100%;
  width: 100%;
  height: 100%;
  background-color: $bg;
  // overflow: hidden;
  // padding: 0 auto;
  // background-size: 100%;

  .whiteBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-300px, -400px);
    margin: 220px auto 0;
    width: 600px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 90px 10px 0;
    margin: 0 auto;
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
    img {
      position: absolute;
      top: -150px;
      left: 190px;
      width: 110px;
      z-index: 1;
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
