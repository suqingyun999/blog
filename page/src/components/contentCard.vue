<template>
  <div class="content-card">
    <div class="title">
      <img :src="baseUrl + content.image" alt="" />
      <div class="card-title">
        <h2>{{ content.title }}</h2>
        <div class="date">{{ content.datetime }}</div>
      </div>
    </div>
    <div class="card-subtitle">{{ content.subtitle }}</div>
  </div>
</template>

<script setup>
const baseUrl = import.meta.env.VITE_APP_BASE_API
defineProps({
  content: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
</script>

<style scoped lang="less">
.content-card {
  width: 360px;
  height: 216px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #efeff5;
  padding: 16px;
  background-color: #fafafc;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
      0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
  }
  .title {
    width: 100%;
    display: flex;
    gap: 32px;
    img {
      width: 160px;
      height: 120px;
      object-fit: cover;
    }

    .card-title {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .date {
        color: #0b19267a;
      }
    }
  }
}
</style>