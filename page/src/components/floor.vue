<template>
  <div class="floor">
    <div class="inner">
      <div class="qr">
        <n-qr-code
          value="https://qm.qq.com/cgi-bin/qm/qr?k=SpytgyEWFnd8aMPeno8s3m4F_OiqVASg"
          background-color="#F5F5F5"
        />
      </div>
      <n-divider vertical style="height: 100%" />
      <ul>
        <li>哔哩哔哩：60712934</li>
        <li>邮箱：1971421491@qq.com</li>
        <li>qq：1971421491</li>
        <li>Steam：358476022</li>
      </ul>
    </div>
    <div class="tip">备案中……</div>
  </div>
</template>
  
<script setup>
</script>
  
  <style scoped lang="less">
.floor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 216px;
  background-color: #fafafc;
  .inner {
    width: 100%;
    height: 100%;
    padding: 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .qr {
      margin-right: 32px;
    }
    ul {
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      height: 100%;
    }
  }

  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    border-top: 1px solid #e8e8e8;
  }
}
</style>
  
  