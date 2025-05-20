<template>
  <div class="home-page">
    <!-- 主视图区 - 星空背景 -->
    <div class="hero-section">
      <div class="stars-background"></div>
      <div class="container hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="text-gradient">智能教学</span>
            <span>辅助引擎</span>
          </h1>
          <p class="hero-subtitle">
            以<span class="highlight">轻量化</span>为核心，融合<span class="highlight">多模态技术</span>的
            <br>智能教育创新解决方案
          </p>
          <div class="hero-buttons">
            <router-link to="/demo/voice" class="btn btn-primary glow">立即体验演示</router-link>
          </div>
        </div>
        <div class="hero-image">
          <div class="floating-element el-1"></div>
          <div class="floating-element el-2"></div>
          <div class="floating-element el-3"></div>
          <div class="orbit">
            <div class="orbit-circle"></div>
          </div>
          <div class="central-sphere"></div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>向下滚动</span>
        <div class="scroll-arrow"></div>
      </div>
    </div>
    
    <!-- 功能入口 -->
    <section class="demo-entries">
      <div class="container">
        <div class="entries-grid">
          <router-link to="/demo/voice" class="entry-card glass-card">
            <div class="entry-icon" style="background: linear-gradient(135deg, #4354ff, #6b8cff)">
              <i class="icon-mic"></i>
            </div>
            <h3>语音转写与分析</h3>
            <p>实时语音识别与关键内容提取，无需网络连接的离线处理能力</p>
          </router-link>
          
          <router-link to="/demo/image" class="entry-card glass-card">
            <div class="entry-icon" style="background: linear-gradient(135deg, #5cd7c9, #39a2db)">
              <i class="icon-image"></i>
            </div>
            <h3>黑板内容识别</h3>
            <p>精准识别黑板/白板内容，包括手写文字、公式与图表</p>
          </router-link>
          
          <router-link to="/demo/structure" class="entry-card glass-card">
            <div class="entry-icon" style="background: linear-gradient(135deg, #ff6492, #ff8a65)">
              <i class="icon-layers"></i>
            </div>
            <h3>内容智能结构化</h3>
            <p>将教学内容智能转化为结构化知识图谱，提炼关键概念</p>
          </router-link>
          
          <router-link to="/demo/cross" class="entry-card glass-card">
            <div class="entry-icon" style="background: linear-gradient(135deg, #834d9b, #d04ed6)">
              <i class="icon-connection"></i>
            </div>
            <h3>跨课堂知识关联</h3>
            <p>打通不同学科知识点连接，构建系统化学习路径</p>
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- 技术说明 -->
    <section class="tech-highlight">
      <div class="container">
        <div class="tech-content glass-card">
          <h2>轻量化教学辅助引擎<span class="text-gradient">核心技术</span></h2>
          
          <div class="tech-chips">
            <div class="chip">端侧部署</div>
            <div class="chip">离线运行</div>
            <div class="chip">实时处理</div>
            <div class="chip">低资源消耗</div>
            <div class="chip">多模态融合</div>
          </div>
          
          <p>通过知识蒸馏与量化压缩技术，实现复杂AI能力在低配置设备上的高效运行，无需依赖网络连接和云端服务器，保障数据安全与使用体验。</p>
          
          <div class="direct-link">
            <router-link to="/demo/voice" class="btn btn-primary">开始体验演示</router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 简化底部 -->
    <footer class="simple-footer">
      <div class="container">
        <p>© 2023 轻量化教学智能辅助引擎 | 大学生计算机设计大赛参赛作品</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 无需特殊逻辑
</script>

<style scoped lang="less">
@import '../assets/styles/variables.less';

.home-page {
  padding-bottom: 0;
}

.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  .stars-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: @background-color url('../assets/images/stars-bg.svg') repeat;
    opacity: 0.3;
  }
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
}

.hero-content {
  flex: 1;
  
  .hero-title {
    font-size: 64px;
    font-weight: 900;
    margin-bottom: 24px;
    line-height: 1.1;
    
    @media (max-width: 768px) {
      font-size: 48px;
    }
    
    @media (max-width: 576px) {
      font-size: 36px;
    }
  }
  
  .hero-subtitle {
    font-size: 20px;
    color: @text-secondary;
    margin-bottom: 40px;
    line-height: 1.5;
    
    .highlight {
      color: @text-primary;
      font-weight: 700;
    }
  }
  
  .hero-buttons {
    display: flex;
    gap: 20px;
    
    @media (max-width: 992px) {
      justify-content: center;
    }
    
    .btn {
      padding: 14px 32px;
      font-size: 18px;
      font-weight: 600;
      border-radius: @border-radius-base;
    }
  }
}

.hero-image {
  flex: 1;
  height: 500px;
  position: relative;
  
  .central-sphere {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: radial-gradient(circle at 30% 30%, @primary-color, darken(@primary-color, 20%));
    border-radius: 50%;
    box-shadow: 0 0 60px rgba(67, 84, 255, 0.5);
  }
  
  .orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: rotate 30s linear infinite;
    
    .orbit-circle {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 40px;
      background: radial-gradient(circle at 30% 30%, @secondary-color, darken(@secondary-color, 20%));
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(92, 215, 201, 0.5);
    }
  }
  
  .floating-element {
    position: absolute;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    opacity: 0.8;
    
    &.el-1 {
      width: 80px;
      height: 80px;
      background: radial-gradient(circle at 30% 30%, @accent-color, darken(@accent-color, 20%));
      top: 30%;
      left: 20%;
      animation: float 8s ease-in-out infinite;
    }
    
    &.el-2 {
      width: 60px;
      height: 60px;
      background: radial-gradient(circle at 30% 30%, @success-color, darken(@success-color, 20%));
      bottom: 25%;
      left: 30%;
      animation: float 6s ease-in-out infinite 1s;
    }
    
    &.el-3 {
      width: 70px;
      height: 70px;
      background: radial-gradient(circle at 30% 30%, @warning-color, darken(@warning-color, 20%));
      top: 20%;
      right: 25%;
      animation: float 10s ease-in-out infinite 2s;
    }
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: @text-tertiary;
  font-size: 14px;
  
  span {
    margin-bottom: 10px;
  }
  
  .scroll-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid @text-tertiary;
    border-bottom: 2px solid @text-tertiary;
    transform: rotate(45deg);
    animation: scrollDown 2s infinite;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes scrollDown {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-10px, -10px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(10px, 10px);
  }
}

.demo-entries {
  padding: 80px 0;
  
  .entries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }
  
  .entry-card {
    padding: 30px;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: @text-primary;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .entry-icon {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 32px;
      color: white;
    }
    
    h3 {
      font-size: 20px;
      margin-bottom: 15px;
    }
    
    p {
      color: @text-secondary;
      font-size: 15px;
      line-height: 1.5;
    }
  }
}

.tech-highlight {
  padding: 0 0 80px;
  
  .tech-content {
    padding: 40px;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 25px;
    }
    
    p {
      color: @text-secondary;
      line-height: 1.6;
      margin-bottom: 30px;
      font-size: 16px;
    }
    
    .tech-chips {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-bottom: 25px;
      
      .chip {
        background: rgba(67, 84, 255, 0.1);
        color: @primary-color;
        padding: 8px 16px;
        border-radius: 30px;
        font-weight: 600;
      }
    }
    
    .direct-link {
      .btn {
        padding: 12px 30px;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}

.simple-footer {
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  text-align: center;
  
  p {
    color: @text-tertiary;
    font-size: 14px;
  }
}
</style> 