<template>
  <div class="head">
    <ul>
      <li>
        <n-button text tag="a" href="#/home" type="default">首页</n-button>
      </li>
      <li>
        <n-button text tag="a" href="#/content" type="default">
          内容分享
        </n-button>
      </li>
      <li>
        <n-button text tag="a" href="#/message" type="default">
          留言墙
        </n-button>
      </li>
      <li>
        <n-button text tag="a" href="#/about" type="default">关于</n-button>
      </li>
    </ul>
    <div class="head-bg"></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #e8e8e8;
  ul {
    display: flex;
    gap: 48px;
  }
  .head-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0.01;
  }
}
</style>

