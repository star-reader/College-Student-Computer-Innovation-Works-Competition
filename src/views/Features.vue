<template>
  <div class="features-page">
    <!-- 页面标题区 -->
    <div class="features-header">
      <div class="container">
        <h1 class="features-title">功能<span class="text-gradient">特性</span></h1>
        <p class="features-subtitle">轻量化教学智能辅助引擎的核心技术与创新点</p>
      </div>
    </div>
    
    <!-- 功能区块 -->
    <div class="container">
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card glass-card"
          :class="{ 'reversed': index % 2 !== 0 }"
        >
          <div class="feature-content">
            <div class="feature-tag" :style="{ background: feature.tagColor }">{{ feature.tag }}</div>
            <h2 class="feature-title">{{ feature.title }}</h2>
            <p class="feature-desc">{{ feature.description }}</p>
            <ul class="feature-points">
              <li v-for="(point, i) in feature.points" :key="i">
                <span class="point-icon"></span>
                {{ point }}
              </li>
            </ul>
          </div>
          <div class="feature-visual">
            <div class="feature-visual-content" :style="{ background: feature.visualBg }">
              <i :class="feature.icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 技术优势 -->
    <section class="tech-advantages">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">技术<span class="text-gradient">优势</span></h2>
          <p class="section-subtitle">我们的技术优势源于深度的算法优化与灵活的架构设计</p>
        </div>
        
        <div class="advantages-grid">
          <div class="advantage-card glass-card" v-for="(advantage, index) in advantages" :key="index">
            <div class="advantage-icon" :style="{ background: advantage.iconBg }">
              <i :class="advantage.icon"></i>
            </div>
            <h3>{{ advantage.title }}</h3>
            <p>{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 应用场景 -->
    <section class="application-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">应用<span class="text-gradient">场景</span></h2>
          <p class="section-subtitle">适用于多种教学环境，满足不同教育阶段的需求</p>
        </div>
        
        <div class="scenes-tabs">
          <button 
            v-for="(tab, index) in scenesTabs" 
            :key="index"
            class="scene-tab"
            :class="{ 'active': activeSceneTab === index }"
            @click="activeSceneTab = index"
          >
            {{ tab.name }}
          </button>
        </div>
        
        <div class="scene-content glass-card">
          <transition name="fade" mode="out-in">
            <div :key="activeSceneTab" class="scene-detail">
              <div class="scene-visual">
                <div class="scene-image" :style="{ background: scenesTabs[activeSceneTab].bgColor }">
                  <i :class="scenesTabs[activeSceneTab].icon"></i>
                </div>
              </div>
              <div class="scene-info">
                <h3>{{ scenesTabs[activeSceneTab].name }}</h3>
                <p>{{ scenesTabs[activeSceneTab].description }}</p>
                <ul class="scene-benefits">
                  <li v-for="(benefit, i) in scenesTabs[activeSceneTab].benefits" :key="i">
                    <span class="benefit-check"></span>
                    {{ benefit }}
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>
    
    <!-- CTA 区块 -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content glass-card">
          <h2>想要了解更多<span class="text-gradient">产品细节</span>？</h2>
          <p>查看我们的演示页面，体验轻量化教学智能辅助引擎的实际功能</p>
          <div class="cta-buttons">
            <router-link to="/demo" class="btn btn-primary glow">查看演示</router-link>
            <router-link to="/about" class="btn btn-outline">了解我们</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeSceneTab = ref(0)

const features = [
  {
    tag: '语音处理',
    tagColor: 'linear-gradient(135deg, #4354ff, #6b8cff)',
    title: '离线端侧语音语义解析',
    description: '采用知识蒸馏与量化压缩技术，将复杂语音处理模型轻量化，实现本地设备上的实时语音转写与关键信息提取。',
    points: [
      '实时语音转写与重点标注',
      '无需网络连接的离线处理能力',
      '智能识别教学关键词与概念',
      '支持多语言与方言识别'
    ],
    icon: 'icon-mic',
    visualBg: 'linear-gradient(135deg, rgba(67, 84, 255, 0.1), rgba(107, 140, 255, 0.1))'
  },
  {
    tag: '图像处理',
    tagColor: 'linear-gradient(135deg, #5cd7c9, #39a2db)',
    title: '板书与课件图像智能提取',
    description: '针对教学场景特点优化的计算机视觉算法，能够在低配置设备上高效处理黑板、白板、投影等教学内容。',
    points: [
      '精准提取手写文字与公式',
      '智能识别图表数据与结构',
      '低光环境下的图像增强',
      '实时内容跟踪与变化检测'
    ],
    icon: 'icon-image',
    visualBg: 'linear-gradient(135deg, rgba(92, 215, 201, 0.1), rgba(57, 162, 219, 0.1))'
  },
  {
    tag: '内容结构化',
    tagColor: 'linear-gradient(135deg, #ff6492, #ff8a65)',
    title: '教学内容结构化重构',
    description: '将语音、图像等多模态内容进行智能融合与结构化处理，生成层次清晰、重点突出的学习资料。',
    points: [
      '多模态数据的语义关联分析',
      '自动提取与组织知识点',
      '学科特定内容的结构化处理',
      '个性化知识图谱生成'
    ],
    icon: 'icon-layers',
    visualBg: 'linear-gradient(135deg, rgba(255, 100, 146, 0.1), rgba(255, 138, 101, 0.1))'
  },
  {
    tag: '跨课堂关联',
    tagColor: 'linear-gradient(135deg, #834d9b, #d04ed6)',
    title: '跨课堂数据关联处理',
    description: '打破单一课堂的时空边界，实现多课程、多场景下的知识关联，帮助构建系统化的知识体系。',
    points: [
      '跨课程知识点关联与推荐',
      '学习进度的智能追踪与分析',
      '个性化学习路径规划',
      '知识体系的可视化呈现'
    ],
    icon: 'icon-connection',
    visualBg: 'linear-gradient(135deg, rgba(131, 77, 155, 0.1), rgba(208, 78, 214, 0.1))'
  }
]

const advantages = [
  {
    title: '端侧轻量化',
    description: '通过模型压缩、知识蒸馏和计算优化，实现在低配置设备上高效运行复杂AI模型。',
    icon: 'icon-mobile',
    iconBg: 'linear-gradient(135deg, #4354ff, #6b8cff)'
  },
  {
    title: '离线处理能力',
    description: '核心功能无需网络连接，适用于网络受限场景，保障教学过程不受网络质量影响。',
    icon: 'icon-offline',
    iconBg: 'linear-gradient(135deg, #5cd7c9, #39a2db)'
  },
  {
    title: '数据安全',
    description: '本地处理教学数据，降低数据传输风险，保障师生隐私和教学内容安全。',
    icon: 'icon-shield',
    iconBg: 'linear-gradient(135deg, #ff6492, #ff8a65)'
  },
  {
    title: '适应性强',
    description: '自适应不同教学环境和学科特点，提供个性化的智能辅助服务。',
    icon: 'icon-adaptivity',
    iconBg: 'linear-gradient(135deg, #834d9b, #d04ed6)'
  },
  {
    title: '硬件集成',
    description: '与智慧校园硬件设施无缝集成，实现环境感知与智能控制。',
    icon: 'icon-hardware',
    iconBg: 'linear-gradient(135deg, #4cd964, #43a047)'
  },
  {
    title: '无障碍支持',
    description: '专为听障、视障等特殊需求群体设计的功能，促进教育公平。',
    icon: 'icon-accessibility',
    iconBg: 'linear-gradient(135deg, #ffcc00, #ff9500)'
  }
]

const scenesTabs = [
  {
    name: '常规课堂',
    description: '适用于传统面授课堂环境，实时辅助教师教学和学生学习，无需改变现有教学方式。',
    benefits: [
      '教师授课内容自动记录与结构化',
      '学生笔记智能辅助与重点标注',
      '课堂互动数据分析与反馈',
      '无感知融入现有教学流程'
    ],
    icon: 'icon-classroom',
    bgColor: 'rgba(67, 84, 255, 0.1)'
  },
  {
    name: '混合式教学',
    description: '支持线上线下混合的教学场景，保障远程学生与现场学生获得同质的教学体验。',
    benefits: [
      '远程实时内容同步与互动',
      '跨设备学习进度追踪',
      '多端协同编辑与讨论',
      '智能生成混合式教学资料'
    ],
    icon: 'icon-devices',
    bgColor: 'rgba(92, 215, 201, 0.1)'
  },
  {
    name: '低资源环境',
    description: '针对教育资源分布不均、网络稳定性不足的地区，提供适应性强的轻量化解决方案。',
    benefits: [
      '适配低配置设备的高效运行',
      '离线核心功能保障教学连续性',
      '低带宽环境的数据同步策略',
      '针对不同地区特点的本地化'
    ],
    icon: 'icon-location',
    bgColor: 'rgba(255, 100, 146, 0.1)'
  },
  {
    name: '特殊教育',
    description: '为听障、视障等特殊学生群体提供无障碍学习支持，促进教育公平与包容。',
    benefits: [
      '实时语音转文字字幕生成',
      '图像内容的语音描述转换',
      '多感官学习内容适配',
      '个性化学习辅助工具'
    ],
    icon: 'icon-heart',
    bgColor: 'rgba(131, 77, 155, 0.1)'
  },
  {
    name: '智慧校园',
    description: '与校园硬件设施结合，打造智能化、无感知的辅助教学环境。',
    benefits: [
      '智能教室环境感知与控制',
      '设备间无缝数据交互与共享',
      '校园级数据分析与应用',
      '硬件与软件协同优化体验'
    ],
    icon: 'icon-building',
    bgColor: 'rgba(76, 217, 100, 0.1)'
  }
]
</script>

<style scoped lang="less">
@import '../assets/styles/variables.less';

.features-page {
  padding-bottom: 80px;
}

.features-header {
  padding: 80px 0 60px;
  text-align: center;
  
  .features-title {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 16px;
  }
  
  .features-subtitle {
    font-size: 18px;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }
}

.features-grid {
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-bottom: 100px;
}

.feature-card {
  display: flex;
  gap: 60px;
  padding: 0;
  overflow: hidden;
  
  &.reversed {
    flex-direction: row-reverse;
    
    .feature-content {
      padding-right: 0;
      padding-left: 60px;
    }
  }
}

.feature-content {
  flex: 1;
  padding: 60px;
  padding-right: 0;
}

.feature-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
}

.feature-desc {
  color: @text-secondary;
  line-height: 1.6;
  margin-bottom: 24px;
}

.feature-points {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  li {
    position: relative;
    padding-left: 24px;
    color: @text-secondary;
    
    .point-icon {
      position: absolute;
      left: 0;
      top: 6px;
      width: 8px;
      height: 8px;
      background: @secondary-color;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(92, 215, 201, 0.6);
    }
  }
}

.feature-visual {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  .feature-visual-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    i {
      font-size: 120px;
      opacity: 0.7;
      color: white;
    }
  }
}

/* 技术优势区块 */
.tech-advantages {
  padding: 80px 0;
  position: relative;
  
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

.section-header {
  text-align: center;
  margin-bottom: 60px;
  
  .section-title {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 16px;
  }
  
  .section-subtitle {
    font-size: 18px;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.advantage-card {
  padding: 30px;
  position: relative;
  overflow: hidden;
  transition: transform @transition-base, box-shadow @transition-base;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  .advantage-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: white;
  }
  
  h3 {
    font-size: 22px;
    margin-bottom: 16px;
  }
  
  p {
    color: @text-secondary;
    line-height: 1.6;
  }
}

/* 应用场景区块 */
.application-section {
  padding: 80px 0;
  position: relative;
  
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

.scenes-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  
  .scene-tab {
    padding: 12px 24px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    color: @text-secondary;
    transition: all @transition-base;
    font-size: 16px;
    
    &:hover {
      background: rgba(67, 84, 255, 0.1);
      color: @text-primary;
    }
    
    &.active {
      background: rgba(67, 84, 255, 0.15);
      color: @primary-color;
      font-weight: 600;
      border-color: rgba(67, 84, 255, 0.3);
    }
  }
}

.scene-content {
  padding: 0;
  overflow: hidden;
}

.scene-detail {
  display: flex;
  min-height: 400px;
}

.scene-visual {
  width: 40%;
  position: relative;
  overflow: hidden;
  
  .scene-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    i {
      font-size: 120px;
      opacity: 0.7;
      color: white;
    }
  }
}

.scene-info {
  flex: 1;
  padding: 60px;
  
  h3 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, @primary-color, @secondary-color);
      border-radius: 3px;
    }
  }
  
  p {
    color: @text-secondary;
    line-height: 1.6;
    margin-bottom: 30px;
  }
}

.scene-benefits {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  li {
    position: relative;
    padding-left: 28px;
    
    .benefit-check {
      position: absolute;
      left: 0;
      top: 2px;
      width: 18px;
      height: 18px;
      background: rgba(67, 84, 255, 0.2);
      border-radius: 50%;
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 4px;
        border-left: 2px solid @primary-color;
        border-bottom: 2px solid @primary-color;
        transform: translate(-50%, -70%) rotate(-45deg);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* CTA区块 */
.cta-section {
  padding: 40px 0 80px;
}

.cta-content {
  text-align: center;
  padding: 60px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(135deg, rgba(67, 84, 255, 0.1), rgba(92, 215, 201, 0.1));
    border-radius: 20px;
    z-index: -1;
    filter: blur(30px);
    opacity: 0.6;
  }
  
  h2 {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  
  p {
    color: @text-secondary;
    font-size: 18px;
    max-width: 600px;
    margin: 0 auto 30px;
  }
  
  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    
    .btn {
      padding: 14px 32px;
      font-size: 16px;
      border-radius: 12px;
    }
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .feature-card, .feature-card.reversed {
    flex-direction: column;
    
    .feature-content {
      padding: 40px;
    }
    
    .feature-visual {
      width: 100%;
      height: 300px;
      order: -1;
    }
  }
  
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .scene-detail {
    flex-direction: column;
  }
  
  .scene-visual {
    width: 100%;
    height: 250px;
  }
  
  .scene-benefits {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .features-header {
    padding: 60px 0 40px;
  }
  
  .features-title {
    font-size: 36px;
  }
  
  .feature-points {
    grid-template-columns: 1fr;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
  }
  
  .scene-tab {
    flex: 1;
  }
  
  .scene-info {
    padding: 30px;
  }
  
  .cta-content {
    padding: 40px 20px;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
}
</style> 