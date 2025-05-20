<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content glass-card">
        <h1 class="title text-gradient">404</h1>
        <h2 class="subtitle">页面未找到</h2>
        <p class="message">您访问的页面不存在或已被移除</p>
        <router-link to="/" class="btn btn-primary">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../assets/styles/variables.less';

.not-found {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  
  &-content {
    text-align: center;
    padding: 60px;
    max-width: 600px;
  }
  
  .title {
    font-size: 120px;
    font-weight: 900;
    margin-bottom: 0;
    line-height: 1;
  }
  
  .subtitle {
    font-size: 36px;
    margin-bottom: 16px;
  }
  
  .message {
    color: @text-secondary;
    margin-bottom: 30px;
    font-size: 18px;
  }
  
  .btn {
    display: inline-flex;
    padding: 14px 32px;
    font-size: 16px;
    border-radius: 12px;
  }
}
</style> 