<template>
  <div class="update">
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
      <n-form-item label="签名" path="name">
        <n-input
          v-model:value="model.name"
          placeholder="签名..."
          maxlength="16"
          show-count
        />
      </n-form-item>
      <n-form-item label="时间">
        <n-date-picker
          v-model:value="model.datetime"
          type="datetime"
          style="width: 100%"
        />
      </n-form-item>
      <n-form-item label="留言" path="msg">
        <n-input
          v-model:value="model.msg"
          type="textarea"
          placeholder="留言..."
          maxlength="50"
          show-count
          clearable
          :autosize="{
            minRows: 4,
            maxRows: 6,
          }"
        />
      </n-form-item>
      <n-form-item label="颜色">
        <div class="radio">
          <div
            @click="select($event, '#FEE7E3')"
            class="color"
            style="background: #fee7e3"
          >
            {{ model.color == '#FEE7E3' ? '√' : '' }}
          </div>
          <div
            @click="select($event, '#E5FADC')"
            class="color"
            style="background: #e5fadc"
          >
            {{ model.color == '#E5FADC' ? '√' : '' }}
          </div>
          <div
            @click="select($event, '#FFF7DF')"
            class="color"
            style="background: #fff7df"
          >
            {{ model.color == '#FFF7DF' ? '√' : '' }}
          </div>
          <div
            @click="select($event, '#DEF7FC')"
            class="color"
            style="background: #def7fc"
          >
            {{ model.color == '#DEF7FC' ? '√' : '' }}
          </div>
          <div
            @click="select($event, '#EFE4FD')"
            class="color"
            style="background: #efe4fd"
          >
            {{ model.color == '#EFE4FD' ? '√' : '' }}
          </div>
        </div>
      </n-form-item>
      <n-form-item>
        <div class="btn">
          <n-button @click="onBack">返回</n-button>
          <n-button type="primary" @click="updateMessageData">提交</n-button>
        </div>
      </n-form-item>
    </n-form>
  </div>
</template>
  
  <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { getMessageDetail, updateMessage } from '../../api/index.js'
import dayjs from 'dayjs'
const $router = useRouter()
const message = useMessage()
// 签名、留言、日期
const model = ref({
  name: '',
  datetime: null,
  msg: '',
  color: '',
})
// 规则
const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
  msg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
}

const formRef = ref(null)
// 返回
const onBack = () => {
  $router.push('/message/index')
}
// 选择背景色
const select = (e, color) => {
  console.log(e, color)
  model.value.color = color
  e.target.parentNode.childNodes.forEach((node) => {
    node.textContent = ''
  })
  e.target.textContent = '√'
}

// 获取详情
const getMessageDetailData = async () => {
  try {
    const res = await getMessageDetail($router.currentRoute.value.query.id)
    if (res.status == '1') {
      if (res.data) {
        model.value = {
          ...res.data,
        }
      }
    } else {
      message.error('获取失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
getMessageDetailData()

// 更新详情
const updateMessageData = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        const res = await updateMessage({
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
</script>
  
<style scoped lang="less">
.update {
  padding: 64px;
  width: 100%;
  min-height: calc(100vh - 56px);
  .btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
  }
  .radio {
    display: flex;
    gap: 12px;
    .color {
      width: 24px;
      height: 24px;
      background: #f00;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }
  }
}
</style>