
<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>



<script setup>
import { ref } from 'vue'
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'
const theme = ref(null)
// const zhCN = ref(null)
// const dateZhCN = ref(null)
</script>
