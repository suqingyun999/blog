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
      <n-form-item label="自己" path="self">
        <n-input
          v-model:value="model.self"
          type="textarea"
          placeholder="自己..."
          maxlength="400"
          show-count
          clearable
          :autosize="{
            minRows: 6,
            maxRows: 10,
          }"
        />
      </n-form-item>
      <n-form-item label="工作" path="work">
        <n-input
          v-model:value="model.work"
          type="textarea"
          placeholder="工作..."
          maxlength="400"
          show-count
          clearable
          :autosize="{
            minRows: 6,
            maxRows: 10,
          }"
        />
      </n-form-item>
      <n-form-item label="生活" path="life">
        <n-input
          v-model:value="model.life"
          type="textarea"
          placeholder="生活..."
          maxlength="400"
          show-count
          clearable
          :autosize="{
            minRows: 6,
            maxRows: 10,
          }"
        />
      </n-form-item>
      <n-form-item label="娱乐" path="game">
        <n-input
          v-model:value="model.game"
          type="textarea"
          placeholder="娱乐..."
          maxlength="400"
          show-count
          clearable
          :autosize="{
            minRows: 6,
            maxRows: 10,
          }"
        />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end; gap: 24px">
        <n-button type="primary" @click="updateAboutDetail">提交</n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAbout, updateAbout } from '../../api/index.js'
import { useMessage } from 'naive-ui'
const message = useMessage()
const baseUrl = import.meta.env.VITE_APP_BASE_API
const formRef = ref(null)

// 生活、工作、娱乐、自己
const model = ref({
  id: 1,
  self: '',
  work: '',
  game: '',
  life: '',
})

// 规则
const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
  image: {
    key: 'image',
    required: true,
    trigger: ['change'],
    message: '请选择头像',
  },
  self: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
  work: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
  game: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
  life: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
}

// 获取详情
const getAboutDetail = async () => {
  try {
    const res = await getAbout()
    console.log(res)
    if (res.data) {
      model.value = res.data
    }
  } catch (error) {
    message.error(error.message)
  }
}
getAboutDetail()

// 更新详情
const updateAboutDetail = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        const res = await updateAbout({
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
    display: flex;
    flex-direction: column;
    gap: 24px;
    .img {
      width: 240px;
      height: 240px;
      border-radius: 50%;
    }
  }
}
</style>