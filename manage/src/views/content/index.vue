<template>
  <div class="content">
    <n-button type="primary" style="margin-bottom: 12px" @click="onCreate">
      新增
    </n-button>
    <n-data-table :columns="columns" :data="data" :bordered="false" />
    <div class="pagination">
      <n-pagination
        v-model:page="page.current"
        show-size-picker
        :page-sizes="[10, 20, 50, 100]"
        :item-count="page.total"
        @update:page="changePage"
        @update:page-size="changePageSize"
      />
    </div>
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { NButton, NPopconfirm, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { getContentList, delContentList } from '../../api/index.js'

const message = useMessage()
const $router = useRouter()
function createColumns({ update }) {
  return [
    {
      title: '编号',
      key: 'no',
      width: 160,
      render(row, index) {
        return h('span', null, { default: () => index + 1 })
      },
    },
    {
      title: '标题',
      key: 'title',
    },
    {
      title: '时间',
      key: 'datetime',
    },
    {
      title: '操作',
      key: 'actions',
      width: 160,
      render(row) {
        return h('div', { style: 'display: flex; gap: 12px;' }, [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              type: 'primary',
              onClick: () => update(row),
            },
            { default: () => '编辑' },
          ),
          h(
            NPopconfirm,
            {
              onPositiveClick: () => delContetListData(row),
            },
            {
              default: () => '确定要删除吗？',
              trigger: () =>
                h(
                  NButton,
                  {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    type: 'error',
                  },
                  { default: () => '删除' },
                ),
            },
          ),
        ])
      },
    },
  ]
}
const columns = createColumns({
  update(row) {
    $router.push('/content/update?id=' + row.id)
  },
})

const page = ref({
  current: 1,
  pageSize: 10,
  total: 0,
})

const data = ref([])

const onCreate = () => {
  $router.push('/content/create')
}

// 获取列表
const getContentListData = async () => {
  try {
    const res = await getContentList({
      page: page.value,
    })
    if (res.status == '1') {
      data.value = res.data.data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          datetime: item.datetime,
        }
      })
      page.value = res.data.page
    } else {
      message.error('获取失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
getContentListData()

// 删除内容
const delContetListData = async (row) => {
  console.log(row.id)
  try {
    const res = await delContentList(row.id)
    if (res.status == '1') {
      message.success('删除成功')
      getContentListData()
    } else {
      message.error('删除失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}

// 切换当前页
const changePage = (current) => {
  page.value.current = current
  getContentListData()
}
// 切换当前页数量
const changePageSize = (pageSize) => {
  page.value.pageSize = pageSize
  getContentListData()
}
</script>

<style scoped lang="less">
.content {
  width: 100%;
  min-height: calc(100vh - 56px);
  padding: 24px;

  .pagination {
    padding: 16px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>