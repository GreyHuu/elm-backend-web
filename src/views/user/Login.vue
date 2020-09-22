<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            message="账户或密码错误"/>
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入账号"
              v-decorator="[
                'username',
                {rules:
                  [
                    { required: true, message: '请输入手机号' }
                  ]
                }
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入密码"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>



      <a-form-item style="margin-top:48px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定
        </a-button>
      </a-form-item>

    </a-form>


  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {isSuccess, timeFix} from '@/utils/util'
  import {getSmsCaptcha} from '@/api/login'
  import {compareCode} from "@/api/userApi";
  import Vue from "vue";
  import {SESSION_ID} from "@/store/mutation-types";

  export default {
    data() {
      return {
        customActiveKey: 'tab1',
        loginBtn: false,
        // user type: 0 email, 1 username, 2 telephone
        loginType: 0,
        isLoginError: false,
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: this.$form.createForm(this),
        state: {
          time: 60,
          loginBtn: false,
          // user type: 0 email, 1 username, 2 telephone
          loginType: 0,
          smsSendBtn: false
        }
      }
    },
    methods: {
      // 使用对象展开运算符将此对象混入到外部对象中
      // 从而可以简单的调用vuex 的actions
      ...mapActions(['Login', 'Logout', 'LoginByPhone']),

      handleTabClick(key) {
        this.customActiveKey = key
        // this.form.resetFields()
      },
      // 处理登录表单
      handleSubmit(e) {
        e.preventDefault()
        const {
          form: {validateFields},
          state,
          customActiveKey,
          Login,
          LoginByPhone
        } = this
        // 设置登录loading为true
        state.loginBtn = true

        // 判断登录方式
        const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'code']

        // 对于数据进行验证
        validateFields(validateFieldsKey, {force: true}, (err, values) => {
          //无错误进行请求
          if (!err) {
            const loginParams = {};
            // 账号密码登录
            if (customActiveKey === 'tab1') {
              loginParams.phone = values.username;
              loginParams.password = values.password;
              Login(loginParams)
                .then(res => {
                  if (isSuccess(res.code)) {
                    this.loginSuccess(res)
                  } else {
                    this.requestFailed(res)
                  }
                })
                .catch(err => this.requestFailed(err))
                .finally(() => {
                  state.loginBtn = false;
                })
            } else {   //手机验证码登录
              // 先比较验证码
              compareCode({code: values.code}).then(res => {
                if (isSuccess(res.code)) {
                  loginParams.phone = values.mobile;
                  LoginByPhone(loginParams)
                    .then(res => {
                      if (isSuccess(res.code)) {
                        this.loginSuccess(res)
                      } else {
                        this.requestFailed(res)
                      }
                    })
                    .catch(err => this.requestFailed(err))
                    .finally(() => {
                      state.loginBtn = false;
                    })
                }
              })
            }
          } else {
            // 将登录loading设置为false
            setTimeout(() => {
              state.loginBtn = false
            }, 600)
          }

        })
      },
      // 获取验证码
      getCaptcha(e) {
        e.preventDefault()
        const {form: {validateFields}, state} = this

        validateFields(['mobile'], {force: true}, (err, values) => {
          if (!err) {
            state.smsSendBtn = true

            const interval = window.setInterval(() => {
              if (state.time-- <= 0) {
                state.time = 60
                state.smsSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)

            const hide = this.$message.loading('验证码发送中..', 0)
            getSmsCaptcha({phone: values.mobile}).then(res => {
              Vue.ls.set(SESSION_ID, res.data.session, 7 * 24 * 60 * 60 * 1000)
              if (isSuccess(res.code)) {
                setTimeout(() => {
                  this.$message.success(
                    '验证码发送成功'
                  )
                  hide();
                }, 2500)
              } else {
                this.$message.error(
                  '验证码发送失败'
                );
              }
            }).catch(err => {
              setTimeout(hide, 1)
              this.$message.error(
                '验证码发送失败'
              );
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
          }
        })
      },
      // 登录成功
      loginSuccess(res) {
        this.$router.push({path: '/'})
        // 延迟 1 秒显示欢迎信息
        setTimeout(() => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        }, 1000)
        this.isLoginError = false
      },
      requestFailed(err) {
        this.isLoginError = true
        console.log(err);
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
