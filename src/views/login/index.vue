<template>
  <a-row class="login-box" type="flex" justify="space-around" align="middle">
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1>saas 平台</h1>
      <a-form-item name="username" :rules="[{ required: true, message: `请输入你的用户名` }]">
        <a-input size="large" v-model:value="formState.username" placeholder="请输入你的用户名">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password" :rules="[{ required: true, message: `请输入你的密码` }]">
        <a-input-password
          size="large"
          v-model:value="formState.password"
          placeholder="请输入你的密码"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button
          :disabled="disabled"
          type="primary"
          html-type="submit"
          size="large"
          class="login-form-button"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </a-row>
</template>
<script setup>
import { LockOutlined,UserOutlined } from '@ant-design/icons-vue'
// import { storeToRefs } from 'pinia'
import { login } from 'service/api'
import useStore from 'store'
import { computed,reactive } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'LoginIndex'
})
const { user } = useStore()
const router = useRouter()
const formState = reactive({
  username: 'admin',
  password: '111111'
})
const onFinish = async (values) => {
  console.log('Success:', values, values.username)
  console.log('document.referrer', document.referrer)
  // 模拟登录
  // const res = await login(values)
  // setTimeout(() => {
  //   user.login({
  //     userName: values.username,
  //     id: '111',
  //     token: 'token',
  //     avatar: 'https://oss.jinxy.com.cn/prod/website/static/miniApp/images/my/jxy_default_logo.png'
  //   })
  //   if (
  //     !document.referrer ||
  //     !document.referrer.includes(location.host) ||
  //     document.referrer === location.href ||
  //     location.href.includes('login')
  //   ) {
  //     console.log('更改')
  //     router.push({ path: '/' })
  //   } else {
  //     router.back()
  //   }
  // }, 1000)
  try {
    const res = await login({
      email: values.username,
      password: values.password,
      provider: 'local'
    })
    console.log('res', res)
    if (res && res.code === 1) {
      // 更新用户信息
      user.login(res.data)
      const isLogin = await user.getUserInfo()
      if (!isLogin) return
      if (
        !document.referrer ||
        !document.referrer.includes(location.host) ||
        document.referrer === location.href
      ) {
        router.push({ path: '/' })
      } else {
        router.back()
      }
    } else {
      user.logout()
    }
  } catch (error) {
    user.logout()
    console.log('error', error)
  }
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>
<style>
.login-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-image: url(https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr);
  background-size: 100% 100%;
}
.login-form {
  width: 300px;
}
.login-form-button {
  width: 100%;
}
</style>
