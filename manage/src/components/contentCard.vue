<template>
  <div class="content-card">
    <div class="title">
      <img src="" alt="" />
      <div class="card-title">
        <h2>学习的意义学习的意义</h2>
        <div class="date">2025.01.18</div>
      </div>
    </div>
    <div class="card-subtitle">
      学习不仅可以提升自己让自己的生活更加有趣也可以获得成功的满足感...
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.content-card {
  width: 400px;
  height: 216px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #efeff5;
  padding: 16px;
  background-color: #fafafc;
  border-radius: 12px;
  .title {
    width: 100%;
    display: flex;
    gap: 32px;
    img {
      width: 160px;
      height: 120px;
      border: 1px solid #ccc;
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