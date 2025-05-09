<template>
  <div class="bg bg-s bg-m bg-l" ref="bg">
    <div class="img img-s img-m img-l">
      <img :src="baseUrl + model.image" alt="" />
    </div>
    <div class="text text-s text-m text-l">
      {{ model.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHome } from '../../api/index.js'
import { useMessage } from 'naive-ui'
import { load } from 'jinrishici'
const message = useMessage()
const baseUrl = import.meta.env.VITE_APP_BASE_API
const model = ref({
  image: '',
  text: '',
})

// 获取详情
const getHomeDetail = async () => {
  try {
    const res = await getHome()
    model.value.image = res.data.image
    if (res.data.text) {
      model.value.text = res.data.text
    } else {
      load(
        (result) => {
          model.value.text = result.data.content
          console.log(result)
        },
        (errData) => {
          model.value = '风与雪之歌'
          console.log(err)
        },
      )
    }
  } catch (error) {
    message.error(error.message)
  }
}

onMounted(() => {
  getHomeDetail()
})
</script>
<style scoped lang="less">
.bg {
  position: relative;
  width: 100%;
  height: 100vh;
  .img {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    user-select: none;
    overflow: hidden;
    > img {
      height: 100%;
    }
  }
  .text {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    user-select: none;
    text-shadow: 5px 5px 5px #000;
  }
}

@media screen and (min-width: 768px) {
  .bg-s {
    .text-s {
      font-size: 56px;
    }
  }
}

@media screen and (min-width: 992px) {
  .bg-m {
    .text-m {
      font-size: 60px;
    }
  }
}

@media screen and (min-width: 1280px) {
  .bg-l {
    .img-l {
      > img {
        width: 100%;
      }
    }
    .text-l {
      font-size: 80px;
    }
  }
}
</style>