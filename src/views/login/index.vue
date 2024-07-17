<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col flex="3">
      <img src="../../assets/deer.svg" width="800" />
    </a-col>
    <a-col flex="400px">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: t(`login.message`) + t(`login.userName`) }]"
        >
          <a-input
            v-model:value="formState.username"
            :placeholder="t(`login.message`) + ' ' + t(`login.userName`)"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: t(`login.message`) + t(`login.password`) }]"
        >
          <a-input-password
            v-model:value="formState.password"
            :placeholder="t(`login.message`) + ' ' + t(`login.password`)"
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
            class="login-form-button"
          >
            {{ t('login.btn') }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script setup>
import { reactive, computed } from 'vue'
import useStore from 'store'
// import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
// import { login } from 'service/api'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
const { user } = useStore()
const router = useRouter()
const { t } = useI18n()
const formState = reactive({
  username: '',
  password: ''
})
const onFinish = async (values) => {
  console.log('Success:', values, values.username)
  console.log('document.referrer', document.referrer)
  // try {
  //   const res = await login({
  //     email: values.username,
  //     password: values.password,
  //     provider: 'local'
  //   })
  //   console.log('res', res)
  //   if (res && res.code === 0) {
  //     // 更新用户信息
  //     user.login(res.data)
  //     if (
  //       !document.referrer ||
  //       !document.referrer.includes(location.host) ||
  //       document.referrer === location.href
  //     ) {
  //       router.push({ path: '/' })
  //     } else {
  //       router.back()
  //     }
  //   } else {
  //     user.logout()
  //   }
  // } catch (error) {
  //   user.logout()
  //   console.log('error', error)
  // }
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>
<style>
.login-form {
  margin-right: 40px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>
