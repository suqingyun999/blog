<template>
  <div class="home">
    <n-card title="图片">
      <img class="img" alt="" :src="baseUrl + model.image" />
      <n-upload
        :action="action"
        v-model:file-list="fileList"
        :max="1"
        @finish="onFinish"
        @remove="onRemove"
      >
        <n-button>上传文件</n-button>
      </n-upload>
    </n-card>
    <n-card title="文字">
      <div class="text">
        <n-input
          v-model:value="model.text"
          type="text"
          placeholder="请输入内容"
        />
      </div>
    </n-card>
    <n-card title="提交">
      <div class="btn">
        <n-button type="primary" @click="onSubmit">提交</n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getHome, updateHome } from '../../api/index.js'
import { useMessage } from 'naive-ui'
const message = useMessage()
const fileList = ref([])
const baseUrl = import.meta.env.VITE_APP_BASE_API
const action = baseUrl + '/upload'
// const imgUrl = ref('')

const model = ref({
  id: 1,
  text: '',
  image: '',
})

// 获取详情
const getHomeDetail = async () => {
  try {
    const res = await getHome()
    console.log(res)
    if (res.data) {
      model.value.text = res.data.text
      model.value.image = res.data.image
      model.value.id = res.data.id
    }
  } catch (error) {
    message.error(error.message)
  }
}
getHomeDetail()

const onFinish = ({ file, event }) => {
  console.log(file)
  console.log(JSON.parse(event.target.response).path)
  model.value.image = JSON.parse(event.target.response).path
  // imgUrl.value = URL.createObjectURL(file.file)
}

const onRemove = () => {
  model.value.image = ''
}

const onSubmit = async () => {
  console.log(model.value)
  try {
    const res = await updateHome(model.value)
    if (res.status == '1') {
      message.success('更新成功')
    } else {
      message.error('更新失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  padding: 64px;
  .img {
    width: 400px;
    height: 300px;
  }
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>