<template>
  <div class="demo-container">
    <!-- 简洁的导航栏 -->
    <div class="demo-nav">
      <div class="container">
        <div class="nav-logo" @click="router.push('/')">
          <div class="logo-icon"></div>
          <span>轻量化教学智能辅助引擎</span>
        </div>
        <div class="nav-tabs">
          <router-link 
            v-for="module in demoModules" 
            :key="module.path"
            :to="`/demo/${module.path}`"
            class="nav-tab"
            active-class="active"
          >
            <i :class="module.icon"></i>
            <span>{{ module.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="demo-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    
    <!-- 简洁底部信息 -->
    <div class="demo-footer">
      <div class="container">
        <p>© 2023 轻量化教学智能辅助引擎 | 大学生计算机设计大赛参赛作品</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 演示模块配置
const demoModules = [
  {
    name: '实时语音分析',
    path: 'voice',
    icon: 'icon-mic'
  },
  {
    name: '教学图像识别',
    path: 'image',
    icon: 'icon-image'
  },
  {
    name: '内容智能结构化',
    path: 'structure',
    icon: 'icon-layers'
  },
  {
    name: '跨课堂知识关联',
    path: 'cross',
    icon: 'icon-connection'
  }
]
</script>

<style scoped lang="less">
@import '../assets/styles/variables.less';

.demo-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: @background-color;
}

// 导航栏样式
.demo-nav {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 15px 0;
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    
    .logo-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
    }
    
    span {
      font-weight: 600;
      font-size: 16px;
    }
  }
  
  .nav-tabs {
    display: flex;
    gap: 5px;
    
    .nav-tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      color: @text-secondary;
      text-decoration: none;
      transition: all @transition-base;
      
      i {
        font-size: 18px;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: @text-primary;
      }
      
      &.active {
        background: rgba(67, 84, 255, 0.15);
        color: @primary-color;
      }
    }
  }
}

// 主内容区样式
.demo-content {
  flex: 1;
  margin-top: 62px;
  padding: 20px 0 40px;
}

// 底部样式
.demo-footer {
  background: rgba(0, 0, 0, 0.2);
  padding: 15px 0;
  text-align: center;
  
  p {
    font-size: 14px;
    color: @text-tertiary;
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

// 响应式适配
@media (max-width: 768px) {
  .demo-nav {
    .container {
      flex-direction: column;
      gap: 15px;
    }
    
    .nav-tabs {
      width: 100%;
      overflow-x: auto;
      padding-bottom: 5px;
      
      &::-webkit-scrollbar {
        height: 3px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }
      
      .nav-tab {
        white-space: nowrap;
      }
    }
  }
  
  .demo-content {
    margin-top: 110px;
  }
}
</style> 