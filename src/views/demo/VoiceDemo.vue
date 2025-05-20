<template>
  <div class="voice-demo">
    <div class="container">
      <!-- 实时课堂场景模拟 -->
      <div class="scene-container glass-card">
        <div class="scene-header">
          <div class="badge">物理课堂演示</div>
          <div class="scene-title">课堂实时语音识别与分析</div>
        </div>
        
        <div class="classroom-scene">
          <div class="teacher-area">
            <div class="teacher-avatar">
              <div class="avatar-img"></div>
              <div class="speaking-indicator" :class="{ active: isRecording }"></div>
            </div>
            <div class="teacher-info">
              <h3>张老师<span class="label">物理教师</span></h3>
              <div class="waveform" :class="{ active: isRecording }">
                <div class="bar" v-for="i in 20" :key="i"></div>
              </div>
            </div>
          </div>
          
          <div class="lecture-content">
            <div class="content-header">
              <div class="title">实时转写与分析</div>
              <div class="controls">
                <button class="control-btn" :class="{ recording: isRecording }" @click="toggleRecording">
                  {{ isRecording ? '停止录制' : '开始录制' }}
                </button>
                <button class="control-btn outline" @click="clearContent">清除内容</button>
              </div>
            </div>
            
            <div class="transcription-area" ref="transcriptionArea">
              <div v-if="transcription" class="transcription-content">
                <p v-for="(segment, index) in processedTranscription" 
                   :key="index" 
                   :class="{ 
                     highlight: segment.type === 'highlight', 
                     concept: segment.type === 'concept',
                     example: segment.type === 'example'
                   }">
                  <span v-if="segment.type !== 'normal'" class="tag">{{ getTypeLabel(segment.type) }}</span>
                  {{ segment.text }}
                </p>
              </div>
              <div v-else class="empty-state">
                <div class="empty-icon">
                  <i class="icon-mic"></i>
                </div>
                <p>点击"开始录制"按钮，模拟课堂语音实时转写</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI智能分析面板 -->
      <div class="analysis-panel glass-card" v-if="showAnalysis">
        <div class="panel-header">
          <div class="panel-title">
            <i class="icon-ai"></i>
            <span>AI 助教分析</span>
          </div>
          <div class="refresh-btn" @click="refreshAnalysis">
            <i class="icon-refresh"></i>
          </div>
        </div>
        
        <div class="panel-content">
          <div class="section">
            <h3>关键概念</h3>
            <div class="concept-chips">
              <div class="chip" v-for="(concept, index) in analysis.concepts" :key="index">
                {{ concept }}
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>知识点总结</h3>
            <ul class="summary-list">
              <li v-for="(point, index) in analysis.summary" :key="index">{{ point }}</li>
            </ul>
          </div>
          
          <div class="section">
            <h3>推荐资源</h3>
            <div class="resource-list">
              <div class="resource-item" v-for="(resource, index) in analysis.resources" :key="index">
                <div class="resource-icon" :style="{ backgroundColor: resource.color }">
                  <i :class="resource.icon"></i>
                </div>
                <div class="resource-info">
                  <div class="resource-title">{{ resource.title }}</div>
                  <div class="resource-desc">{{ resource.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const isRecording = ref(false)
const transcription = ref('')
const showAnalysis = ref(false)
const transcriptionArea = ref<HTMLElement | null>(null)

// 智能分析结果
const analysis = ref({
  concepts: ['电磁感应', '法拉第定律', '楞次定律', '电动势', '磁通量'],
  summary: [
    '电磁感应现象是由法拉第于1831年发现的',
    '导体切割磁感线或磁通量变化时会产生感应电动势',
    '感应电动势的大小与磁通量变化率成正比',
    '楞次定律表明感应电流的方向总是阻碍引起感应的原因',
    '电磁感应是发电机工作的基本原理'
  ],
  resources: [
    {
      title: '电磁感应实验演示',
      description: '包含线圈、磁铁和检流计的交互式模拟实验',
      icon: 'icon-experiment',
      color: '#4354ff'
    },
    {
      title: '电磁感应习题集',
      description: '针对本节内容的20道练习题及详细解析',
      icon: 'icon-book',
      color: '#5cd7c9'
    },
    {
      title: '发电机工作原理视频',
      description: '通过3D动画展示发电机的内部结构和工作过程',
      icon: 'icon-video',
      color: '#ff6492'
    }
  ]
})

// 处理后的转写内容，添加标记和高亮
const processedTranscription = computed(() => {
  if (!transcription.value) return []
  
  // 将文本分割成段落
  const segments = transcription.value.split('\n').map(text => {
    // 判断文本类型并添加标记
    if (text.includes('【重点】')) {
      return { 
        type: 'highlight', 
        text: text.replace('【重点】', '') 
      }
    } else if (text.includes('【概念】')) {
      return { 
        type: 'concept', 
        text: text.replace('【概念】', '') 
      }
    } else if (text.includes('【例子】')) {
      return { 
        type: 'example', 
        text: text.replace('【例子】', '') 
      }
    }
    return { type: 'normal', text }
  })
  
  return segments
})

// 获取标记类型的显示文本
const getTypeLabel = (type: string) => {
  switch (type) {
    case 'highlight': return '重点';
    case 'concept': return '概念';
    case 'example': return '例子';
    default: return '';
  }
}

// 模拟录音和转写过程
const toggleRecording = () => {
  isRecording.value = !isRecording.value
  
  if (isRecording.value) {
    // 模拟实时转写，分多次添加内容
    setTimeout(() => {
      addTranscription('今天我们要学习的是电磁感应现象。')
    }, 1000)
    
    setTimeout(() => {
      addTranscription('\n\n【概念】电磁感应是指导体在磁场中运动或者导体周围的磁场发生变化时，导体中会产生感应电动势的现象。')
    }, 3000)
    
    setTimeout(() => {
      addTranscription('\n\n这一现象是由法拉第于1831年发现的，是电磁学中的重要现象。')
    }, 5000)
    
    setTimeout(() => {
      addTranscription('\n\n【重点】法拉第电磁感应定律指出，感应电动势的大小等于穿过闭合回路的磁通量的变化率。可以用公式表示为：ε = -dΦ/dt')
    }, 7000)
    
    setTimeout(() => {
      addTranscription('\n\n负号表示感应电动势的方向，这与楞次定律相关。')
    }, 9000)
    
    setTimeout(() => {
      addTranscription('\n\n【概念】楞次定律：感应电流的方向总是使其产生的磁场阻碍引起感应的磁通量变化。')
    }, 11000)
    
    setTimeout(() => {
      addTranscription('\n\n【例子】比如，当我们把一个磁铁靠近线圈时，线圈中会产生感应电流，这个电流产生的磁场方向会排斥磁铁的靠近。')
    }, 13000)
    
    setTimeout(() => {
      addTranscription('\n\n电磁感应现象是发电机工作的基本原理，也是许多电气设备工作的基础。')
    }, 15000)
    
    // 显示分析面板
    setTimeout(() => {
      showAnalysis.value = true
    }, 16000)
  }
}

// 添加转写内容
const addTranscription = (text: string) => {
  transcription.value += text
  
  // 自动滚动到底部
  setTimeout(() => {
    if (transcriptionArea.value) {
      transcriptionArea.value.scrollTop = transcriptionArea.value.scrollHeight
    }
  }, 50)
}

// 清除内容
const clearContent = () => {
  transcription.value = ''
  isRecording.value = false
  showAnalysis.value = false
}

// 刷新分析
const refreshAnalysis = () => {
  // 模拟刷新分析的过程
  showAnalysis.value = false
  setTimeout(() => {
    showAnalysis.value = true
  }, 500)
}

// 监听转写内容变化，调整滚动位置
watch(transcription, () => {
  setTimeout(() => {
    if (transcriptionArea.value) {
      transcriptionArea.value.scrollTop = transcriptionArea.value.scrollHeight
    }
  }, 50)
})
</script>

<style scoped lang="less">
@import '../../assets/styles/variables.less';

.voice-demo {
  padding: 20px 0 40px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

// 课堂场景容器
.scene-container {
  background: @glass-background;
  position: relative;
  box-shadow: @glass-shadow;
  backdrop-filter: @glass-backdrop-filter;
  -webkit-backdrop-filter: @glass-backdrop-filter;
  border: @glass-border;
  border-radius: @border-radius-base;
  
  .scene-header {
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 15px;
    
    .badge {
      background: rgba(0, 132, 255, 0.12);
      color: @primary-color;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
    }
    
    .scene-title {
      font-weight: 600;
      font-size: 18px;
      color: @text-primary;
      letter-spacing: -0.3px;
    }
  }
}

// 课堂场景
.classroom-scene {
  display: flex;
  padding: 20px;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  .teacher-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    flex: 0 0 180px;
    
    @media (max-width: 768px) {
      flex-direction: row;
      flex: auto;
    }
    
    .teacher-avatar {
      position: relative;
      
      .avatar-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4354ff, #39a2db);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: white;
        
        &::after {
          content: '👨‍🏫';
          font-size: 50px;
        }
        
        @media (max-width: 768px) {
          width: 60px;
          height: 60px;
          font-size: 30px;
          
          &::after {
            font-size: 30px;
          }
        }
      }
      
      .speaking-indicator {
        position: absolute;
        bottom: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: @text-tertiary;
        border: 3px solid rgba(0, 0, 0, 0.3);
        
        &.active {
          background: #4cd964;
        }
      }
    }
    
    .teacher-info {
      text-align: center;
      width: 100%;
      
      @media (max-width: 768px) {
        text-align: left;
      }
      
      h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 5px;
        
        .label {
          margin-left: 5px;
          font-size: 12px;
          color: @text-tertiary;
          font-weight: normal;
        }
      }
    }
  }
  
  .lecture-content {
    flex: 1;
    
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      
      @media (max-width: 576px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      
      .title {
        font-weight: 600;
        color: @text-primary;
        letter-spacing: -0.3px;
      }
      
      .controls {
        display: flex;
        gap: 10px;
        
        .control-btn {
          padding: 8px 12px;
          border-radius: @border-radius-base;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
          background: @primary-color;
          color: white;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 132, 255, 0.25);
          
          &.outline {
            background: rgba(255, 255, 255, 0.5);
            border: 1px solid rgba(0, 0, 0, 0.05);
            color: @text-secondary;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
            
            &:hover {
              background: rgba(255, 255, 255, 0.8);
              color: @text-primary;
              transform: translateY(-1px);
            }
          }
          
          &.recording {
            background: @error-color;
            position: relative;
            box-shadow: 0 2px 8px rgba(244, 67, 54, 0.25);
            
            &:hover {
              background: lighten(@error-color, 5%);
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
            }
            
            &::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 10px;
              width: 6px;
              height: 6px;
              background: white;
              border-radius: 50%;
              transform: translateY(-50%);
              animation: blink 1s infinite;
            }
            
            padding-left: 22px;
          }
          
          &:hover:not(.recording) {
            background: lighten(@primary-color, 5%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 132, 255, 0.3);
          }
        }
      }
    }
  }
}

// 转写区域
.transcription-area {
  background: rgba(255, 255, 255, 0.5);
  border-radius: @border-radius-base;
  padding: 15px;
  height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.02);
  
  .transcription-content {
    p {
      margin-bottom: 10px;
      line-height: 1.6;
      padding: 8px;
      border-radius: 6px;
      color: @text-primary;
      
      &.highlight {
        background: rgba(244, 67, 54, 0.08);
        border-left: 3px solid @error-color;
      }
      
      &.concept {
        background: rgba(30, 144, 255, 0.08);
        border-left: 3px solid @primary-color;
      }
      
      &.example {
        background: rgba(0, 200, 83, 0.08);
        border-left: 3px solid @success-color;
      }
      
      .tag {
        display: inline-block;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 6px;
        font-weight: 600;
        
        .highlight & {
          background: @error-color;
          color: white;
        }
        
        .concept & {
          background: @primary-color;
          color: white;
        }
        
        .example & {
          background: @success-color;
          color: white;
        }
      }
    }
  }
  
  .empty-state {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: @text-tertiary;
    
    .empty-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      font-size: 24px;
      color: @text-secondary;
    }
  }
}

// 波形动画
.waveform {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 30px;
  
  .bar {
    width: 3px;
    height: 5px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 1px;
  }
  
  &.active .bar {
    animation: wave 1s infinite;
    
    .loop-delay(@i) when (@i <= 20) {
      &:nth-child(@{i}) {
        animation-delay: @i * 0.05s;
      }
      .loop-delay(@i + 1);
    }
    .loop-delay(1);
  }
}

@keyframes wave {
  0%, 100% {
    height: 5px;
  }
  50% {
    height: 20px;
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

// AI分析面板
.analysis-panel {
  background: @glass-background;
  animation: slide-up 0.5s;
  box-shadow: @glass-shadow;
  backdrop-filter: @glass-backdrop-filter;
  -webkit-backdrop-filter: @glass-backdrop-filter;
  border: @glass-border;
  border-radius: @border-radius-base;
  
  .panel-header {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .panel-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      color: @text-primary;
      letter-spacing: -0.3px;
      
      i {
        color: @secondary-color;
      }
    }
    
    .refresh-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      border: 1px solid rgba(0, 0, 0, 0.03);
      
      &:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: rotate(45deg);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
    }
  }
  
  .panel-content {
    padding: 20px;
    
    .section {
      margin-bottom: 25px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      h3 {
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: 600;
        color: @text-secondary;
      }
    }
  }
}

// 概念标签
.concept-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .chip {
    background: rgba(0, 132, 255, 0.1);
    color: @primary-color;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 14px;
    border: 1px solid rgba(0, 132, 255, 0.15);
  }
}

// 总结列表
.summary-list {
  li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    color: @text-primary;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: @secondary-color;
    }
  }
}

// 资源列表
.resource-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  .resource-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.05);
    padding: 10px;
    border-radius: 8px;
    
    .resource-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
    .resource-info {
      flex: 1;
      
      .resource-title {
        font-weight: 600;
        margin-bottom: 2px;
      }
      
      .resource-desc {
        font-size: 12px;
        color: @text-secondary;
      }
    }
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 