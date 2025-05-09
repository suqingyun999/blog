<template>
  <div class="message">
    <n-button type="primary" style="margin-bottom: 12px" @click="onCreate">
      新增
    </n-button>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
       @update:page="changePage"
      @update:page-size="changePageSize"
    />
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { NButton, NPopconfirm, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { getMessageList, delMessageList } from '../../api/index.js'
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
      title: '留言',
      key: 'message',
    },
    {
      title: '时间',
      key: 'datetime',
    },
    {
      title: '签名',
      key: 'name',
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
              onPositiveClick: () => delMessageListData(row),
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
    $router.push('/message/update?id=' + row.id)
  },
})

const page = ref({
  current: 1,
  pageSize: 10,
})

const pagination = ref({
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
})

const data = ref([])

const onCreate = () => {
  $router.push('/message/create')
}

// 获取列表
const getMessageListData = async () => {
  try {
    const res = await getMessageList({
      page: { current: 1, pageSize: 10 },
    })
    if (res.status == '1') {
      data.value = res.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          datetime: item.datetime,
          message: item.msg,
        }
      })
      console.log(data.value)
    } else {
      message.error('获取失败')
    }
  } catch (error) {
    message.error(error.message)
  }
}
getMessageListData()

// 删除内容
const delMessageListData = async (row) => {
  console.log(row.id)

  try {
    const res = await delMessageList(row.id)
    if (res.status == '1') {
      message.success('删除成功')
      getMessageListData()
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
  getMessageListData()
}
// 切换当前页数量
const changePageSize = (pageSize) => {
  page.value.pageSize = pageSize
  getMessageListData()
}
</script>

<style scoped lang="less">
.message {
  width: 100%;
  min-height: calc(100vh - 56px);
  padding: 24px;
}
</style>