<template>
  <div class="about">
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :style="{
        width: '840px',
      }"
    >
      <n-form-item label="头像" path="avatar">
        <div class="avatar">
          <img
            v-if="model.avatar"
            class="img"
            alt=""
            :src="baseUrl + model.avatar"
          />
          <n-upload
            :action="action"
            v-model:file-list="fileList"
            :max="1"
            @finish="onFinish"
            @remove="onRemove"
          >
            <n-button>上传文件</n-button>
          </n-upload>
        </div>
      </n-form-item>
      <n-form-item label="昵称" path="nickname">
        <n-input
          v-model:value="model.nickname"
          type="text"
          placeholder="请输入昵称"
        />
      </n-form-item>
      <n-form-item label="年龄">
        <n-input-number
          v-model:value="model.age"
          placeholder="请输入年龄"
          style="width: 100%"
        />
      </n-form-item>
      <n-form-item label="性别">
        <n-input
          v-model:value="model.sex"
          type="text"
          placeholder="请输入性别"
        />
      </n-form-item>
      <n-form-item label="地址">
        <n-input
          v-model:value="model.address"
          type="text"
          placeholder="请输入地址"
        />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end; gap: 24px">
        <n-button type="primary" @click="updateInfoDetail">提交</n-button>
      </div>
    </n-form>
  </div>
</template>
  
  <script setup>
import { ref } from 'vue'
import { getUserInfo, updateUserInfo } from '../../api/index.js'
import { useMessage } from 'naive-ui'
const message = useMessage()
const fileList = ref([])
const baseUrl = import.meta.env.VITE_APP_BASE_API
const action = baseUrl + '/upload'
const formRef = ref(null)

// 生活、工作、娱乐、自己
const model = ref({
  id: 1,
  nickname: '',
  avatar: '',
  age: 0,
  sex: '',
  address: '',
})

// 规则
const rules = {
  nickname: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
  avatar: {
    key: 'avatar',
    required: true,
    trigger: ['change'],
    message: '请选择头像',
  },
}

const onFinish = ({ file, event }) => {
  console.log(file)
  console.log(JSON.parse(event.target.response).path)
  model.value.avatar = JSON.parse(event.target.response).path
  formRef.value?.validate(
    (errors) => {},
    (rule) => {
      return rule?.key === 'avatar'
    },
  )
}

const onRemove = () => {
  model.value.avatar = ''
}

// 获取详情
const getInfoDetail = async () => {
  try {
    const res = await getUserInfo()
    console.log(res)
    if (res.data) {
      model.value = res.data
    }
  } catch (error) {
    message.error(error.message)
  }
}
getInfoDetail()

// 更新详情
const updateInfoDetail = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        const res = await updateUserInfo({
          ...model.value,
        })
        if (res.status == '1') {
          message.success('更新成功')
        } else {
          message.error('更新失败')
        }
      } catch (error) {
        message.error(error.message)
      }
    }
  })
}
</script>
  
  <style scoped lang="less">
.about {
  padding: 64px;
  width: 100%;
  min-height: calc(100vh - 96px);
  display: flex;
  justify-content: center;
  .avatar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    .img {
      width: 240px;
      height: 240px;
      border-radius: 50%;
    }
    .n-upload {
      text-align: center;
    }
  }
}
</style>