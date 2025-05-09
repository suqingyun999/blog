<template>
  <div class="detail">
    <v-md-editor
      v-model="content"
      mode="preview"
      ref="preview"
      class="preview"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getContentDetail } from '../../api/index.js'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
const message = useMessage()
const $router = useRouter()
const content = ref('')
// 获取详情
const getContentDetailData = async () => {
  try {
    const res = await getContentDetail($router.currentRoute.value.query.id)
    if (res.status == '1') {
      console.log(res.data)
      content.value = res.data.article
    } else {
      message.error('获取失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
getContentDetailData()
</script>

<style scoped lang="less">
.detail {
  padding: 64px 0;
  min-height: 100vh;
  background-color: #fff;
  .v-md-editor {
    width: 100%;
    margin: 0 auto;
  }
}
</style>