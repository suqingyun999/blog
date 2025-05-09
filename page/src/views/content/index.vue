<template>
  <div class="content">
    <div class="card card-s card-m card-l">
      <ContentCard
        @click="toDetail(item.id)"
        v-for="(item, index) in list"
        :key="index"
        :content="item"
      />
    </div>
    <div class="page page-s page-m page-l">
      <n-pagination
        v-if="list.length"
        v-model:page="page.current"
        show-size-picker
        :page-sizes="[12, 24, 36, 48, 120]"
        @update:page="changePage"
        @update:page-size="changePageSize"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ContentCard from '../../components/contentCard.vue'
import { useRouter } from 'vue-router'
import { getContentList } from '../../api/index.js'
const $router = useRouter()

const page = ref({
  current: 1, //当前页
  pageSize: 12, //当前页数量
})
const list = ref([])

// 获取文章内容列表
const getListData = async () => {
  const res = await getContentList({
    page: {
      current: 1,
      pageSize: 10,
    },
  })
  if (res.status == '1') {
    console.log(res.data.data)

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
// 跳转文章详情
const toDetail = (id) => {
  $router.push('/content/detail?id=' + id)
}
</script>

<style scoped lang="less">
.content {
  width: 100vw;
  min-height: 100vh;
  padding: 100px 0px 64px;
  .card {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 30px;
  }
  .page {
    width: 100%;
    margin: 32px auto 0;
    padding: 0 24px;
    display: flex;
    justify-content: flex-end;
  }
}

@media screen and (min-width: 768px) {
  .content {
    .card-s {
      width: 750px;
      grid-template-columns: 1fr 1fr;
    }
    .page-s {
      width: 660px;
    }
  }
}

@media screen and (min-width: 992px) {
  .content {
    .card-m {
      width: 750px;
      grid-template-columns: 1fr 1fr;
    }
    .page-m {
      width: 960px;
    }
  }
}

@media screen and (min-width: 1280px) {
  .content {
    .card-l {
      width: 1260px;
      grid-template-columns: 1fr 1fr 1fr;
    }
    .page-l {
      width: 1260px;
    }
  }
}
</style>