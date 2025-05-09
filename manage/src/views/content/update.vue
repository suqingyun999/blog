<template>
  <div class="content">
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <n-grid x-gap="12" :collapsed-rows="2" :cols="2">
        <n-gi :offset="1">
          <n-form-item>
            <div class="btn">
              <n-button @click="onBack">返回</n-button>
              <n-button type="primary" @click="updateContentData">
                提交
              </n-button>
            </div>
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="标题" path="title">
            <n-input
              v-model:value="model.title"
              placeholder="标题..."
              maxlength="12"
              show-count
            />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="时间">
            <n-date-picker
              v-model:value="model.datetime"
              type="datetime"
              style="width: 100%"
            />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="子标题" path="subtitle">
            <n-input
              v-model:value="model.subtitle"
              type="textarea"
              placeholder="子标题..."
              maxlength="50"
              show-count
              clearable
              :autosize="{
                minRows: 7,
                maxRows: 8,
              }"
            />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="封面" path="message">
            <div class="upload-box">
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
            </div>
          </n-form-item>
        </n-gi>
      </n-grid>
    </n-form>
    <div class="editor">
      <v-md-editor
        v-model="model.article"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
        height="800px"
      ></v-md-editor>
    </div>
  </div>
</template>
    
    <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import {
  getContentDetail,
  updateContent,
  uploadImage,
} from '../../api/index.js'
import dayjs from 'dayjs'
const $router = useRouter()
const message = useMessage()
const fileList = ref([])
const baseUrl = import.meta.env.VITE_APP_BASE_API
const action = baseUrl + '/upload'
// 标题、子标题、日期、封面、内筒
const model = ref({
  title: '',
  datetime: null,
  subtitle: '',
  image: '',
  article: '',
})
// 规则
const rules = {
  title: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
  subtitle: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
}

const formRef = ref(null)

// 返回
const onBack = () => {
  $router.push('/content/index')
}

const onFinish = ({ file, event }) => {
  console.log(file)
  console.log(JSON.parse(event.target.response).path)
  model.value.image = JSON.parse(event.target.response).path
  // imgUrl.value = URL.createObjectURL(file.file)
}

const onRemove = () => {
  model.value.image = ''
}

// 获取详情
const getContentDetailData = async () => {
  try {
    const res = await getContentDetail($router.currentRoute.value.query.id)
    if (res.status == '1') {
      console.log(res.data)
      model.value = {
        ...res.data,
        datetime: dayjs(res.data.datetime).valueOf(),
      }
    } else {
      message.error('获取失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
getContentDetailData()

// 更新详情
const updateContentData = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        const res = await updateContent({
          ...model.value,
          datetime: model.value.datetime
            ? dayjs(model.value.datetime).format('YYYY-MM-DD HH:mm:ss')
            : dayjs().format('YYYY-MM-DD HH:mm:ss'),
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

// 图片处理
const handleUploadImage = async (event, insertImage, files) => {
  console.log(event)
  console.log(insertImage)
  console.log(files)
  const formData = new FormData()
  formData.append('file', files[0])
  const res = await uploadImage(formData)
  console.log(res)
  insertImage({
    url: baseUrl + res.path,
    desc: res.name,
    // width: 'auto',
    // height: 'auto',
  })
}
</script>
    
    <style scoped lang="less">
.content {
  width: 100%;
  min-height: calc(100vh - 56px);
  padding: 64px;
  .btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 24px;
  }
  .editor {
    margin-top: 32px;
  }
  .upload-box {
    img {
      width: 200px;
      height: 150px;
    }
  }
}
</style>