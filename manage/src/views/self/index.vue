<template>
  <div class="self">
    <div class="add">
      <n-pagination
        v-model:page="page.current"
        v-model:page-size="page.pageSize"
        :page-count="page.total"
        show-size-picker
        :page-sizes="[10, 20, 30, 50]"
        @update:page="updatePage"
        @update:page-size="updatePageSize"
      />
      <n-button type="primary" @click="openAddModal">新增</n-button>
    </div>
    <n-modal
      v-model:show="showAddModal"
      :mask-closable="false"
      transform-origin="center"
    >
      <n-card
        style="width: 700px"
        class="add-card"
        title="请畅所欲言"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div class="msg-input">
          <n-form
            ref="addFormRef"
            :model="addModel"
            :rules="addRules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
          >
            <n-form-item label="提示">
              <div style="font-size: 16px">
                图片只支持.jpg, .jpeg,
                .png，视频只支持.mp4，图片和视频只能选择一种
              </div>
            </n-form-item>
            <n-form-item v-if="!addModel.video.length" label="图片">
              <n-upload
                :action="action"
                :max="9"
                :default-file-list="[]"
                list-type="image-card"
                accept=".jpg, .jpeg, .png"
                @finish="onImageFinish"
                @remove="onImageRemove"
              />
            </n-form-item>
            <n-form-item v-if="!addModel.image.length" label="视频">
              <n-upload
                :action="action"
                accept=".mp4"
                :max="1"
                @finish="onVideoFinish"
                @remove="onVideoRemove"
              >
                <n-button>上传文件</n-button>
              </n-upload>
            </n-form-item>

            <n-form-item label="内容" path="text">
              <n-input
                v-model:value="addModel.text"
                type="textarea"
                placeholder="想说什么就说什么......"
                maxlength="500"
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
          <div style="display: flex; justify-content: flex-end; gap: 24px">
            <n-button @click="cancel">取消</n-button>
            <n-button type="primary" @click="addSelfData">确定</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
    <div class="card card-s" v-for="item in selfData" :key="item.id">
      <n-card hoverable>
        <div class="card-head">
          <img
            :src="baseUrl + userInfo.avatar"
            alt=""
            class="avatar avatar-s avatar-m avatar-l"
          />
          <div class="wrap">
            <div class="name">{{ userInfo.nickname }}</div>
            <div class="text">
              {{ item.text }}
            </div>
          </div>
        </div>
        <div class="card-body">
          <video
            v-if="item.type == 3"
            :src="baseUrl + item.content[0]"
            controls
            style="width: 60%"
          ></video>
          <n-image-group v-if="item.type == 2">
            <n-image
              v-for="(image, j) in item.content"
              :class="item.content.length > 1 ? 'multi-image' : 'single-image'"
              :key="j"
              :object-fit="image.length == 1 ? 'fill' : 'cover'"
              :src="baseUrl + image"
              :img-props="{
                width: '100%',
                height: '100%',
              }"
              :previewed-img-props="{
                'object-fit': 'fill',
              }"
            />
          </n-image-group>
        </div>
        <div class="operate-wrap">
          <div class="datetime">{{ item.datetime }}</div>
          <div class="btn-group">
            <n-button
              tertiary
              type="error"
              class="del-btn"
              @click="delSelfData(item.id)"
            >
              删除
            </n-button>
            <n-button tertiary class="btn" @click="openCommentModal(item.id)">
              评论
            </n-button>
          </div>
        </div>
        <div v-if="item.allComments.length" class="comments-area">
          <div v-for="(comment, i) in item.allComments" :key="i" class="item">
            <span style="color: #7d90a9">{{ comment.name }}：</span>
            <span>{{ comment.comment }}</span>
            <n-button
              quaternary
              type="error"
              @click="delCommentData(comment.id)"
            >
              删除
            </n-button>
          </div>
        </div>
        <div v-if="showCommentModal == item.id" class="comments-input">
          <n-form
            ref="commentFormRef"
            :model="commentModel"
            :rules="commentRules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
          >
            <n-form-item path="name">
              <n-input
                v-model:value="commentModel.name"
                type="text"
                placeholder="留个名吧"
                maxlength="8"
                show-count
              />
            </n-form-item>
            <n-form-item path="comment">
              <n-input
                v-model:value="commentModel.comment"
                type="textarea"
                placeholder="我很期待你的留言"
                maxlength="200"
                show-count
                :autosize="{
                  minRows: 5,
                  maxRows: 5,
                }"
              />
            </n-form-item>
            <n-form-item style="display: flex; justify-content: flex-end">
              <n-button @click="addCommentData(item.id)">发送</n-button>
            </n-form-item>
          </n-form>
        </div>
      </n-card>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import {
  getUserInfo,
  getSelf,
  addSelf,
  commentadd,
  selfDel,
  commentDel,
} from '../../api/index.js'
import dayjs from 'dayjs'
const message = useMessage()
const baseUrl = import.meta.env.VITE_APP_BASE_API
const action = baseUrl + '/upload'

const page = ref({
  current: 1,
  pageSize: 10,
})

const userInfo = ref({})

// 打开评论表单
let showCommentModal = ref('')
// 签名、评论
const commentModel = ref({
  name: '',
  comment: '',
})
const commentFormRef = ref(null)
// 校验规则
const commentRules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '留个名吧',
  },
  comment: {
    required: true,
    trigger: ['blur', 'input'],
    message: '我很期待你的留言',
  },
}

// 新增表单
let showAddModal = ref(false)
const addModel = ref({
  image: [],
  video: [],
  text: '',
})
// 校验规则
const addRules = {
  text: {
    required: true,
    trigger: ['blur'],
    message: '不说点什么吗',
  },
}
const addFormRef = ref(null)

const selfData = ref([])

// 打开评论
const openCommentModal = (i) => {
  showCommentModal.value = showCommentModal.value ? '' : i
}
// 打开新增弹框
const openAddModal = () => {
  showAddModal.value = true
}

// 添加评论
const addCommentData = (id) => {
  commentFormRef.value[0]?.validate(async (errors) => {
    if (!errors) {
      try {
        const res = await commentadd({
          name: commentModel.value.name,
          comment_data: commentModel.value.comment,
          self_id: id,
        })
        if (res.status == '1') {
          message.success('新增成功')
          getSelfData()
          showCommentModal.value = ''
          commentModel.value = {
            name: '',
            comment: '',
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

// 删除评论
const delCommentData = async (id) => {
  try {
    const res = await commentDel(id)
    if (res.status == '1') {
      message.success('删除成功')
      getSelfData()
    } else {
      message.error('删除失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}

// 删除朋友圈
const delSelfData = async (id) => {
  try {
    const res = await selfDel(id)
    if (res.status == '1') {
      message.success('删除成功')
      getSelfData()
    } else {
      message.error('删除失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}

// 添加朋友圈
const addSelfData = async () => {
  console.log(addFormRef.value)

  addFormRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        let type = 1
        let content = ''
        if (
          addModel.value.image.length > 0 &&
          addModel.value.video.length == 0
        ) {
          type = 2
          content = addModel.value.image.join()
        } else if (
          addModel.value.image.length == 0 &&
          addModel.value.video.length == 1
        ) {
          type = 3
          content = addModel.value.video.join()
        }
        const res = await addSelf({
          type,
          text: addModel.value.text,
          content,
        })
        if (res.status == '1') {
          message.success('新增成功')
          getSelfData()
          showAddModal.value = false
          addModel.value = {
            image: [],
            video: [],
            text: '',
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

const onVideoFinish = ({ file, event }) => {
  console.log(file)
  console.log(JSON.parse(event.target.response).path)
  addModel.value.video.push(JSON.parse(event.target.response).path)
  // imgUrl.value = URL.createObjectURL(file.file)
}

const onVideoRemove = ({ file, fileList, index }) => {
  addModel.value.video.splice(index, 1)
}

const onImageFinish = ({ file, event }) => {
  console.log(file)
  console.log(JSON.parse(event.target.response).path)
  addModel.value.image.push(JSON.parse(event.target.response).path)
  // imgUrl.value = URL.createObjectURL(file.file)
}

const onImageRemove = ({ file, fileList, index }) => {
  console.log(file)
  console.log(fileList)
  console.log(index)
  addModel.value.image.splice(index, 1)
}

// 关闭新增弹框
const cancel = () => {
  showAddModal.value = false
  addModel.value = {
    image: [],
    video: [],
    text: '',
  }
}
// 切换当前页
const updatePage = (current) => {
  page.value.current = current
  getSelfData()
}
// 切换当前页数量
const updatePageSize = (pageSize) => {
  page.value.pageSize = pageSize
  getSelfData()
}
// 获取朋友圈信息
const getSelfData = async () => {
  try {
    const res = await getSelf({
      page: page.value,
    })
    if (res.status == '1') {
      selfData.value = res.data.data.map((item) => {
        return {
          ...item,
          content: item.content ? item.content.split(',') : [],
        }
      })
    } else {
      message.error('获取失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
// 获取用户信息
const getUserInfoData = async () => {
  try {
    const res = await getUserInfo()
    if (res.status == '1') {
      userInfo.value = res.data
    } else {
      message.error('获取失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
getUserInfoData()
getSelfData()
</script>
  
<style scoped lang="less">
.self {
  padding-bottom: 32px;
  background-color: #f2f2f2;
  .add {
    width: 800px;
    height: 64px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;

  .card-head {
    display: flex;
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background-color: #888;
      margin-right: 8px;
    }
    .name {
      color: #7d90a9;
      font-weight: 600;
    }
  }

  .card-body {
    margin-top: 4px;
    padding-left: 40px;
    width: 380px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    .multi-image {
      width: 110px;
      height: 110px;
    }
    .single-image {
      width: 220px;
    }
  }

  .operate-wrap {
    margin: 8px 0;
    height: 32px;
    padding-left: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .del-btn {
      height: 28px;
      margin-right: 8px;
    }
    .btn {
      height: 28px;
      color: #7d90a9;
    }
  }
  .comments-area {
    margin-left: 40px;
    padding: 8px;
    background-color: #f8f8f8;
    .del {
      margin-left: 8px;
      color: red;
      cursor: pointer;
    }
  }
  .comments-input {
    margin-left: 40px;
    padding: 8px 8px 16px;
    background-color: #f8f8f8;
  }
}

@media screen and (min-width: 768px) {
  .card-s {
    width: 800px;
    margin: 0 auto;
    .card-head {
      font-size: 20px;
      .avatar-s {
        width: 64px;
        height: 64px;
        border-radius: 12px;
      }
    }
    .card-body {
      margin-top: 4px;
      padding-left: 72px;
      width: 100%;
      .multi-image {
        width: 222px;
        height: 222px;
      }
    }
    .operate-wrap {
      padding-left: 72px;
    }
    .comments-area {
      margin-left: 72px;
      font-size: 18px;
    }
    .comments-input {
      margin-left: 72px;
    }
  }
}
</style>