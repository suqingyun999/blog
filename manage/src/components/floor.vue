<template>
  <div class="floor">
    <div class="inner">
      <div class="qr">
        <n-qr-code
          value="https://www.naiveui.com/"
          background-color="#F5F5F5"
        />
      </div>
      <n-divider vertical style="height: 100%" />
      <ul>
        <li>哔哩哔哩：4792742</li>
        <li>邮箱：123456789@qq.com</li>
        <li>Github：123456789@qq.com</li>
        <li>Steam：4792742</li>
      </ul>
    </div>
    <div class="tip">备案许可：皖ICP备19433466号</div>
  </div>
</template>
  
  <script>
export default {}
</script>
  
  <style scoped lang="less">
.floor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 216px;
  background-color: #FAFAFC;
  .inner {
    width: 1240px;
    height: 168px;
    padding: 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .qr {
      margin-right: 36px;
    }
    ul {
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;
      height: 100%;
    }
  }

  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1240px;
    height: 48px;
    border-top: 1px solid #e8e8e8;
  }
}
</style>
  
  