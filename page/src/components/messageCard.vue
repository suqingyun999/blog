<template>
  <div class="message-card" :style="{ backgroundColor: props.data.color }">
    <div class="date">{{ props.data.datetime }}</div>
    <div class="message">{{ props.data.msg }}</div>
    <div class="name">{{ props.data.name }}</div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        color: '#FEE7E3',
        msg: '',
        datetime: '',
        name: '',
      }
    },
  },
})
</script>
  
  <style scoped lang="less">
.message-card {
  width: 300px;
  height: 300px;
  border: 1px solid #efeff5;
  padding: 16px;
  &:hover {
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
      0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
  }
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