<template>
  <div class="message-card" :style="{ backgroundColor: props.backgroundColor }">
    <div class="date">2024.01.18</div>
    <div class="message">只有你才能带领我们走向胜利</div>
    <div class="name">匿名</div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  backgroundColor: {
    type: String,
    default: '#FEE7E3',
  },
})
</script>
  
  <style scoped lang="less">
.message-card {
  width: 300px;
  height: 300px;
  border: 1px solid #efeff5;
  padding: 16px;
  .date {
    height: 20px;
    font-size: 12px;
    color: #949494;
  }
  .message {
    height: 228px;
    padding: 12px 0;
    font-size: 16px;
  }
  .name {
    height: 20px;
    font-size: 14px;
    color: #b2b2b2;
    text-align: end;
  }
}
</style>