<template>
  <div class="message">
    <div class="card card-s card-m card-l">
      <MessageCard v-for="(item, index) in list" :key="index" :data="item" />
    </div>
    <div class="page page-s page-m page-l">
      <n-button round type="primary" @click="openModal">留言</n-button>
      <n-pagination
        v-model:page="page.current"
        show-size-picker
        :page-sizes="[12, 24, 36, 48, 120]"
        :item-count="page.total"
        @update:page="changePage"
        @update:page-size="changePageSize"
      />
    </div>
  </div>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    transform-origin="center"
  >
    <n-card
      class="msg-card msg-card-s msg-card-m msg-card-l"
      title="留言"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="msg-input">
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="颜色">
            <div class="radio">
              <div
                @click="select($event, '#FEE7E3')"
                class="color"
                style="background: #fee7e3"
              >
                √
              </div>
              <div
                @click="select($event, '#E5FADC')"
                class="color"
                style="background: #e5fadc"
              ></div>
              <div
                @click="select($event, '#FFF7DF')"
                class="color"
                style="background: #fff7df"
              ></div>
              <div
                @click="select($event, '#DEF7FC')"
                class="color"
                style="background: #def7fc"
              ></div>
              <div
                @click="select($event, '#EFE4FD')"
                class="color"
                style="background: #efe4fd"
              ></div>
            </div>
          </n-form-item>
          <n-form-item label="签名">
            <n-input
              v-model:value="model.name"
              type="text"
              placeholder="签名"
              maxlength="8"
              show-count
            />
          </n-form-item>
          <n-form-item label="留言" path="msg">
            <n-input
              v-model:value="model.msg"
              type="textarea"
              placeholder="想说什么就说什么......"
              maxlength="50"
              show-count
              :autosize="{
                minRows: 5,
                maxRows: 5,
              }"
            />
          </n-form-item>
        </n-form>
      </div>
      <template #footer>
        <div class="btn">
          <n-button @click="cancel">取消</n-button>
          <n-button type="primary" @click="addMsgData">确定</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import MessageCard from '../../components/messageCard.vue'
import { getMessageList, addMessage } from '../../api/index.js'
import dayjs from 'dayjs'
import { useMessage } from 'naive-ui'
const message = useMessage()

const list = ref([])
const page = ref({
  current: 1, //当前页
  pageSize: 12, //当前页数量
})

let showModal = ref(false)

// 签名、留言、日期、背景色
const model = ref({
  name: '',
  datetime: null,
  msg: '',
  color: '#FEE7E3',
})
const formRef = ref(null)
// 规则
const rules = {
  msg: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入内容',
  },
}

// 打开留言弹框
const openModal = () => {
  showModal.value = true
}

const cancel = () => {
  showModal.value = false
  model.value = {
    name: '',
    datetime: null,
    msg: '',
    color: '#FEE7E3',
  }
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

// 新增留言
const addMsgData = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        const res = await addMessage({
          name: model.value.name ? model.value.name : '匿名',
          msg: model.value.msg,
          color: model.value.color,
          datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
        if (res.status == '1') {
          message.success('新增成功')
          showModal.value = false
          getListData()
          model.value = {
            name: '',
            datetime: null,
            msg: '',
            color: '#FEE7E3',
          }
        } else {
          message.error('新增失败')
        }
      } catch (error) {
        message.error(error.message)
      }
    }
  })
}

// 获取留言列表
const getListData = async () => {
  const res = await getMessageList({
    page: page.value,
  })
  if (res.status == '1') {
    page.value = res.data.page
    list.value = res.data.data
  }
}
getListData()

// 切换当前页
const changePage = (current) => {
  page.value.current = current
  getListData()
}
// 切换当前页数量
const changePageSize = (pageSize) => {
  page.value.pageSize = pageSize
  getListData()
}
</script>

<style scoped lang="less">
.message {
  width: 100%;
  min-height: 100vh;
  padding: 100px 0px 64px;
  .card {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 20px;
  }
  .page {
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.msg-input {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.btn {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
}

@media screen and (min-width: 768px) {
  .message {
    .card-s {
      width: 660px;
      grid-template-columns: 1fr 1fr;
    }
    .page-s {
      width: 660px;
    }
  }
  .msg-card-s {
    width: 600px;
  }
}

@media screen and (min-width: 992px) {
  .message {
    .card-m {
      width: 960px;
      grid-template-columns: 1fr 1fr 1fr;
    }
    .page-m {
      width: 960px;
    }
  }
}

@media screen and (min-width: 1280px) {
  .message {
    .card-l {
      width: 1260px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .page-l {
      width: 1260px;
    }
  }
}
</style>