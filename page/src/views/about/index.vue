<template>
  <div class="about">
    <div class="card card-s card-m card-l">
      <div class="info">
        <img :src="baseUrl + userInfo.avatar" alt="" />
        <div>{{ userInfo.name }}</div>
      </div>
      <n-card title="自己" embedded :bordered="false">
        {{ model.self }}
      </n-card>
      <n-card title="工作" embedded :bordered="false">
        {{ model.work }}
      </n-card>
      <n-card title="生活" embedded :bordered="false">
        {{ model.life }}
      </n-card>
      <n-card title="娱乐" embedded :bordered="false">
        {{ model.game }}
      </n-card>
    </div>
    <!-- <div class="qr">
      <n-qr-code
        value="https://www.naiveui.com/"
        color="#409eff"
        background-color="#F5F5F5"
      />
      <n-qr-code
        value="https://www.naiveui.com/"
        color="#409eff"
        background-color="#F5F5F5"
      />
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAbout, getUserInfo } from '../../api/index.js'
import { useMessage } from 'naive-ui'
const message = useMessage()
const baseUrl = import.meta.env.VITE_APP_BASE_API
// 生活、工作、娱乐、自己、头像、名称
const model = ref({
  self: '',
  work: '',
  game: '',
  life: '',
})
const userInfo = ref({})
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
// 获取详情
const getAboutDetail = async () => {
  try {
    const res = await getAbout()
    if (res.status == '1') {
      model.value = res.data
    } else {
      message.error('获取失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
getUserInfoData()
getAboutDetail()
</script>

<style scoped lang="less">
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 32px;
  width: 100%;
  min-height: 100vh;
  .card {
    margin-top: 48px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
  .qr {
    width: 100%;
    margin-top: 56px;
    display: flex;
    justify-content: center;
    gap: 64px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    font-size: 32px;
    font-weight: 600;
    > img {
      width: 240px;
      height: 240px;
      border-radius: 50%;
    }
  }
}

@media screen and (min-width: 768px) {
  .about {
    .card-s {
      width: 100%;
    }
  }
}

@media screen and (min-width: 992px) {
  .about {
    .card-m {
      width: 100%;
    }
  }
}

@media screen and (min-width: 1280px) {
  .about {
    .card-l {
      width: 1120px;
    }
  }
}
</style>