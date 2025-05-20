<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section about">
          <div class="logo">
            <span class="text-gradient">EduAI</span>
            <span class="subtitle">智能教学助手</span>
          </div>
          <p class="description">
            轻量化教学智能辅助引擎，提升教学效率，优化学习体验。基于离线端侧轻量化的多模态技术框架，让教育更加智能化。
          </p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="icon-github"></i></a>
            <a href="#" class="social-link"><i class="icon-twitter"></i></a>
            <a href="#" class="social-link"><i class="icon-linkedin"></i></a>
          </div>
        </div>
        
        <div class="footer-section links">
          <h3>快速链接</h3>
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/features">功能特性</router-link></li>
            <li><router-link to="/demo">演示</router-link></li>
            <li><router-link to="/about">关于我们</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section contact">
          <h3>联系我们</h3>
          <ul>
            <li><i class="icon-mail"></i> contact@eduai.com</li>
            <li><i class="icon-phone"></i> +86 123 4567 8901</li>
            <li><i class="icon-map"></i> 北京市海淀区, 中国</li>
          </ul>
        </div>
        
        <div class="footer-section newsletter">
          <h3>订阅通讯</h3>
          <p>获取最新的教育科技资讯和产品更新</p>
          <form @submit.prevent="subscribeNewsletter">
            <input type="email" v-model="email" placeholder="您的邮箱地址" required />
            <button type="submit" class="btn-primary">订阅</button>
          </form>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} EduAI 智能教学助手. 版权所有.</p>
        <p class="links">
          <a href="#">隐私政策</a>
          <span>|</span>
          <a href="#">使用条款</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const currentYear = computed(() => new Date().getFullYear())

const subscribeNewsletter = () => {
  // 此处添加订阅逻辑
  console.log('订阅邮箱:', email.value)
  alert('感谢您的订阅！')
  email.value = ''
}
</script>

<style scoped lang="less">
@import '../../assets/styles/variables.less';

.footer {
  padding: 60px 0 20px;
  background: linear-gradient(to bottom, rgba(8, 12, 40, 0), @background-color);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, 
      transparent, 
      rgba(255, 255, 255, 0.05), 
      rgba(255, 255, 255, 0.1), 
      rgba(255, 255, 255, 0.05), 
      transparent);
  }
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.footer-section {
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, @secondary-color);
    }
  }
  
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    li {
      color: @text-secondary;
      transition: color @transition-fast;
      display: flex;
      align-items: center;
      gap: 8px;
      
      &:hover {
        color: @text-primary;
      }
      
      i {
        color: @primary-color;
      }
    }
  }
}

.about {
  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    
    span {
      font-size: 24px;
      font-weight: 800;
    }
    
    .subtitle {
      font-size: 14px;
      margin-left: 8px;
      color: @text-secondary;
    }
  }
  
  .description {
    color: @text-secondary;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .social-links {
    display: flex;
    gap: 12px;
    
    .social-link {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all @transition-base;
      
      &:hover {
        background: @primary-color;
        transform: translateY(-3px);
      }
    }
  }
}

.newsletter {
  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    
    input {
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: @text-primary;
      
      &:focus {
        border-color: rgba(255, 255, 255, 0.2);
      }
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }
    
    button {
      padding: 12px;
      background: @primary-color;
      border-radius: 8px;
      font-weight: 600;
      transition: all @transition-base;
      
      &:hover {
        background: lighten(@primary-color, 5%);
        transform: translateY(-2px);
      }
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: @text-tertiary;
  font-size: 14px;
  
  .links {
    display: flex;
    gap: 12px;
    
    a {
      transition: color @transition-fast;
      
      &:hover {
        color: @text-secondary;
      }
    }
  }
}

@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style> 