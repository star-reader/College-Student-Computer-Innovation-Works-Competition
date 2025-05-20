<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container flex-between">
      <div class="logo-container flex-center">
        <router-link to="/" class="logo flex-center">
          <span class="logo-text text-gradient">EduAI</span>
          <span class="logo-subtitle">智能教学助手</span>
        </router-link>
      </div>
      
      <nav class="nav" :class="{ 'nav-open': menuOpen }">
        <router-link 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path" 
          class="nav-item"
          :class="{ 'active': route.path === item.path }"
          @click="closeMenu"
        >
          {{ item.name }}
        </router-link>
      </nav>
      
      <div class="header-right flex-center">
        <button class="btn btn-outline demo-btn">演示系统</button>
        <div class="theme-switch" @click="toggleDarkMode">
          <div class="switch-inner" :class="{ 'switched': !isDarkMode }">
            <i class="icon-sun"></i>
            <i class="icon-moon"></i>
          </div>
        </div>
        <button class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../../store/appStore'

const appStore = useAppStore()
const route = useRoute()

const isDarkMode = computed(() => appStore.isDarkMode)
const menuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '功能特性', path: '/features' },
  { name: '演示', path: '/demo' },
  { name: '关于我们', path: '/about' }
]

const toggleDarkMode = () => {
  appStore.toggleDarkMode()
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始检查
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="less">
@import '../../assets/styles/variables.less';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
  transition: all @transition-base;
  background: rgba(8, 12, 40, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &-scrolled {
    height: 70px;
    background: rgba(8, 12, 40, 0.9);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
  
  .container {
    height: 100%;
  }
}

.logo {
  display: flex;
  align-items: center;
  
  &-text {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 0.5px;
  }
  
  &-subtitle {
    font-size: 14px;
    opacity: 0.8;
    margin-left: 8px;
    color: @text-secondary;
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
  
  &-item {
    position: relative;
    font-size: 16px;
    font-weight: 500;
    color: @text-secondary;
    transition: all @transition-base;
    padding: 6px 0;
    
    &:hover, &.active {
      color: @text-primary;
      
      &::after {
        width: 100%;
        opacity: 1;
      }
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, @secondary-color);
      transition: all @transition-base;
      opacity: 0;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.theme-switch {
  width: 52px;
  height: 26px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 4px;
  
  .switch-inner {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 3px;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    
    &.switched {
      left: calc(100% - 23px);
    }
  }
  
  .icon-sun, .icon-moon {
    font-size: 12px;
    color: @background-color;
  }
}

.demo-btn {
  border-radius: 8px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  cursor: pointer;
  
  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: white;
    transition: all 0.3s;
  }
}

@media (max-width: 768px) {
  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: @background-color;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
    z-index: 99;
    
    &-open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    
    &-item {
      font-size: 20px;
    }
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .demo-btn {
    display: none;
  }
}
</style> 