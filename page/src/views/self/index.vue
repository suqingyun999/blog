<template>
  <div class="self">
    <n-infinite-scroll style="height: 100vh" :distance="100" @load="handleLoad">
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
                :class="
                  item.content.length > 1 ? 'multi-image' : 'single-image'
                "
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
              <n-button tertiary class="btn" @click="openCommentModal(item.id)">
                评论
              </n-button>
            </div>
          </div>
          <div v-if="item.allComments.length" class="comments-area">
            <div v-for="(comment, i) in item.allComments" :key="i" class="item">
              <span style="color: #7d90a9">{{ comment.name }}：</span>
              <span>{{ comment.comment }}</span>
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
      <div v-if="noMore" class="no-more">没有更多了</div>
    </n-infinite-scroll>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import {
  getUserInfo,
  getSelf,
  commentadd,
  getCommentById,
} from '../../api/index.js'
const message = useMessage()
const baseUrl = import.meta.env.VITE_APP_BASE_API

const page = ref({
  current: 1,
  pageSize: 10,
  total: 0,
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

const selfData = ref([])
const loading = ref(false)
const noMore = computed(() => selfData.value.length >= page.value.total)
// 打开评论
const openCommentModal = (i) => {
  showCommentModal.value = showCommentModal.value ? '' : i
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

          console.log('id', id)

          const r = await getCommentById(id)
          const index = selfData.value.findIndex((item) => item.id == r.data.id)
          selfData.value[index].allComments = r.data.allComments

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

const handleLoad = async () => {
  if (loading.value || noMore.value) return
  loading.value = true
  page.value.current += 1
  await getSelfData(page.value)
  loading.value = false
}
// 获取朋友圈信息
const getSelfData = async (pageData) => {
  try {
    const res = await getSelf({
      page: pageData,
    })
    if (res.status == '1') {
      page.value = res.data.page
      const arr = res.data.data.map((item) => {
        return {
          ...item,
          content: item.content ? item.content.split(',') : [],
        }
      })
      selfData.value.push(...arr)
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
getSelfData(page.value)
</script>
  
<style scoped lang="less">
.self {
  width: 100%;
  padding-top: 56px;
  background-color: #f2f2f2;
  .no-more {
    margin: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
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
    .wrap {
      width: 100%;
    }
    .name {
      color: #7d90a9;
      font-weight: 600;
      font-size: 16px;
    }
    .text {
      font-size: 16px;
      white-space: pre-wrap;
    }
  }

  .card-body {
    margin-top: 4px;
    padding-left: 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    .multi-image {
      width: 90px;
      height: 90px;
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
    .datetime {
      font-size: 12px;
    }
    .btn {
      height: 20px;
      font-size: 12px;
      color: #7d90a9;
    }
  }
  .comments-area {
    margin-left: 40px;
    padding: 8px;
    background-color: #f8f8f8;
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
      .avatar-s {
        width: 64px;
        height: 64px;
        border-radius: 12px;
      }
      .name {
        font-size: 20px;
      }
      .text {
        font-size: 20px;
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
      .datetime {
        font-size: 16px;
      }
      .btn {
        height: 28px;
        font-size: 16px;
        color: #7d90a9;
      }
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