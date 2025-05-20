<template>
  <div class="image-demo">
    <div class="container">
      <!-- 教室黑板/白板场景 -->
      <div class="scene-container glass-card">
        <div class="scene-header">
          <div class="badge">数学课堂演示</div>
          <div class="scene-title">黑板/白板内容智能识别</div>
        </div>
        
        <div class="board-scene">
          <div class="board-view">
            <template v-if="!selectedImage">
              <div class="empty-board">
                <div class="example-images">
                  <div 
                    v-for="(example, index) in exampleImages" 
                    :key="index"
                    class="example-image"
                    @click="selectExampleImage(example.url)"
                  >
                    <img :src="example.url" :alt="example.alt">
                    <div class="example-label">{{ example.label }}</div>
                  </div>
                </div>
                <div class="upload-area">
                  <div class="upload-icon">
                    <i class="icon-upload"></i>
                  </div>
                  <p>点击上方示例图片或上传您自己的黑板/白板图片</p>
                  <label class="upload-btn">
                    选择图片
                    <input type="file" accept="image/*" @change="handleImageUpload" hidden>
                  </label>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="image-viewer">
                <div class="image-container">
                  <img :src="selectedImage" alt="黑板/白板图片">
                  
                  <!-- 识别标记层，显示AI识别的区域 -->
                  <div v-if="analysisDone" class="recognition-marks">
                    <div 
                      v-for="(mark, index) in recognitionMarks"
                      :key="index"
                      class="mark"
                      :style="{
                        left: `${mark.x}%`,
                        top: `${mark.y}%`,
                        width: `${mark.width}%`,
                        height: `${mark.height}%`,
                        borderColor: mark.color
                      }"
                      @mouseenter="highlightResult(mark.id)"
                      @mouseleave="clearHighlight()"
                    >
                      <div class="mark-label" :style="{ backgroundColor: mark.color }">
                        {{ mark.label }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- 加载状态层 -->
                  <div v-if="isProcessing" class="processing-overlay">
                    <div class="spinner"></div>
                    <p>正在分析图像内容...</p>
                  </div>
                </div>
                
                <div class="image-controls">
                  <button class="control-btn" @click="analyzeImage" :disabled="isProcessing || analysisDone">
                    {{ isProcessing ? '分析中...' : '分析图像' }}
                  </button>
                  <button class="control-btn outline" @click="clearImage">
                    清除图像
                  </button>
                </div>
              </div>
            </template>
          </div>
          
          <div class="recognition-results" v-if="selectedImage">
            <div class="results-header">
              <h3>识别结果</h3>
              <div class="result-tabs">
                <button 
                  v-for="(tab, index) in resultTabs" 
                  :key="index"
                  class="tab-btn"
                  :class="{ active: activeTab === index }"
                  @click="activeTab = index"
                >
                  {{ tab }}
                </button>
              </div>
            </div>
            
            <div class="results-content">
              <!-- 分析中提示 -->
              <div v-if="isProcessing" class="results-loading">
                <p>正在分析图像内容，请稍候...</p>
              </div>
              
              <!-- 未分析提示 -->
              <div v-else-if="!analysisDone && !isProcessing" class="results-placeholder">
                <p>点击"分析图像"按钮开始识别内容</p>
              </div>
              
              <!-- 分析结果 -->
              <div v-else-if="analysisDone" class="results-data">
                <!-- 文本内容 -->
                <div v-if="activeTab === 0" class="text-content">
                  <div 
                    v-for="(item, index) in results.textContent" 
                    :key="index"
                    class="text-item"
                    :class="{ highlighted: highlightedId === item.id }"
                  >
                    <div class="text-item-header">
                      <span class="item-type">{{ item.type }}</span>
                      <span class="confidence">置信度: {{ item.confidence }}%</span>
                    </div>
                    <div class="text-item-content">{{ item.content }}</div>
                  </div>
                </div>
                
                <!-- 数学公式 -->
                <div v-if="activeTab === 1" class="formula-content">
                  <div 
                    v-for="(formula, index) in results.formulas" 
                    :key="index"
                    class="formula-item"
                    :class="{ highlighted: highlightedId === formula.id }"
                  >
                    <div class="formula-display">
                      {{ formula.latex }}
                    </div>
                    <div class="formula-info">
                      <span class="confidence">置信度: {{ formula.confidence }}%</span>
                    </div>
                  </div>
                </div>
                
                <!-- 图表数据 -->
                <div v-if="activeTab === 2" class="chart-content">
                  <div 
                    v-for="(chart, index) in results.charts" 
                    :key="index"
                    class="chart-item"
                    :class="{ highlighted: highlightedId === chart.id }"
                  >
                    <div class="chart-header">
                      <span class="chart-type">{{ chart.type }}</span>
                      <span class="confidence">置信度: {{ chart.confidence }}%</span>
                    </div>
                    <div class="chart-data">
                      <table>
                        <thead>
                          <tr>
                            <th v-for="(header, i) in chart.headers" :key="i">{{ header }}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(row, i) in chart.data" :key="i">
                            <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI学习建议面板 -->
      <div class="insights-panel glass-card" v-if="analysisDone">
        <div class="panel-header">
          <div class="panel-title">
            <i class="icon-brain"></i>
            <span>教学内容分析</span>
          </div>
        </div>
        
        <div class="panel-content">
          <div class="section">
            <h3>内容主题</h3>
            <div class="topic-tags">
              <div class="tag" v-for="(tag, index) in insights.topics" :key="index">
                {{ tag }}
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>难点分析</h3>
            <div class="difficulty-points">
              <div 
                v-for="(point, index) in insights.difficulties" 
                :key="index"
                class="difficulty-item"
                :style="{ borderLeftColor: difficultyColor(point.level) }"
              >
                <div class="difficulty-header">
                  <span class="difficulty-title">{{ point.title }}</span>
                  <span 
                    class="difficulty-level" 
                    :style="{ backgroundColor: difficultyColor(point.level) }"
                  >
                    {{ difficultyLabel(point.level) }}
                  </span>
                </div>
                <p>{{ point.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>学习建议</h3>
            <ul class="suggestion-list">
              <li v-for="(suggestion, index) in insights.suggestions" :key="index">
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 示例图片
const exampleImages = [
  {
    url: 'https://via.placeholder.com/300x200/202040/FFFFFF?text=数学公式',
    alt: '数学公式黑板图片',
    label: '数学公式'
  },
  {
    url: 'https://via.placeholder.com/300x200/202040/FFFFFF?text=物理概念',
    alt: '物理概念白板图片',
    label: '物理概念'
  },
  {
    url: 'https://via.placeholder.com/300x200/202040/FFFFFF?text=几何图形',
    alt: '几何图形黑板图片',
    label: '几何图形'
  }
]

// 状态控制
const selectedImage = ref('')
const isProcessing = ref(false)
const analysisDone = ref(false)
const activeTab = ref(0)
const highlightedId = ref('')

// 结果标签页
const resultTabs = ['文本内容', '数学公式', '图表数据']

// 识别结果数据
const results = ref({
  textContent: [
    {
      id: 'text1',
      type: '标题',
      content: '二次函数及其性质',
      confidence: 98
    },
    {
      id: 'text2',
      type: '正文',
      content: '二次函数是指形如f(x) = ax² + bx + c (a≠0)的函数，其中a、b、c为常数，a≠0。',
      confidence: 95
    },
    {
      id: 'text3',
      type: '定义',
      content: '二次函数的图像是一条抛物线，当a>0时，抛物线开口向上；当a<0时，抛物线开口向下。',
      confidence: 93
    }
  ],
  formulas: [
    {
      id: 'formula1',
      latex: 'f(x) = ax^2 + bx + c (a \\neq 0)',
      confidence: 97
    },
    {
      id: 'formula2',
      latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      confidence: 95
    },
    {
      id: 'formula3',
      latex: '\\Delta = b^2 - 4ac',
      confidence: 98
    }
  ],
  charts: [
    {
      id: 'chart1',
      type: '表格',
      headers: ['x', 'f(x)'],
      data: [
        ['-2', '8'],
        ['-1', '3'],
        ['0', '0'],
        ['1', '-1'],
        ['2', '0']
      ],
      confidence: 90
    }
  ]
})

// AI分析洞见
const insights = ref({
  topics: ['二次函数', '抛物线', '函数性质', '代数方程'],
  difficulties: [
    {
      title: '判别式应用',
      level: 'medium',
      description: '理解判别式Δ = b² - 4ac与函数图像和方程根的关系是本节的关键难点。'
    },
    {
      title: '配方法',
      level: 'hard',
      description: '使用配方法将二次函数f(x) = ax² + bx + c变形为f(x) = a(x - h)² + k的标准形式需要掌握。'
    },
    {
      title: '对称轴',
      level: 'easy',
      description: '掌握抛物线的对称轴x = -b/(2a)及其几何意义。'
    }
  ],
  suggestions: [
    '重点掌握二次函数的图像与系数a、b、c的关系',
    '练习运用配方法将一般形式转化为标准形式',
    '理解判别式在函数性质分析中的应用',
    '结合几何意义理解抛物线的对称性和顶点',
    '尝试解决与二次函数相关的实际应用问题'
  ]
})

// 识别标记数据
const recognitionMarks = ref([
  {
    id: 'text1',
    x: 10,
    y: 5,
    width: 50,
    height: 10,
    label: '标题',
    color: '#4354ff'
  },
  {
    id: 'text2',
    x: 10,
    y: 20,
    width: 80,
    height: 15,
    label: '正文',
    color: '#5cd7c9'
  },
  {
    id: 'formula1',
    x: 15,
    y: 40,
    width: 40,
    height: 10,
    label: '公式',
    color: '#ff6492'
  },
  {
    id: 'formula2',
    x: 60,
    y: 40,
    width: 30,
    height: 12,
    label: '公式',
    color: '#ff6492'
  },
  {
    id: 'chart1',
    x: 15,
    y: 60,
    width: 30,
    height: 25,
    label: '表格',
    color: '#ffcc00'
  }
])

// 根据难度级别返回对应的颜色
const difficultyColor = (level: string) => {
  switch (level) {
    case 'easy': return '#4cd964';
    case 'medium': return '#ffcc00';
    case 'hard': return '#ff3b30';
    default: return '#4354ff';
  }
}

// 根据难度级别返回对应的标签文本
const difficultyLabel = (level: string) => {
  switch (level) {
    case 'easy': return '基础';
    case 'medium': return '中等';
    case 'hard': return '困难';
    default: return '未知';
  }
}

// 选择示例图片
const selectExampleImage = (url: string) => {
  selectedImage.value = url
  analysisDone.value = false
}

// 处理图片上传
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedImage.value = URL.createObjectURL(file)
    analysisDone.value = false
  }
}

// 分析图像
const analyzeImage = () => {
  if (!selectedImage.value) return
  
  isProcessing.value = true
  
  // 模拟处理延迟
  setTimeout(() => {
    isProcessing.value = false
    analysisDone.value = true
  }, 2000)
}

// 清除图像
const clearImage = () => {
  selectedImage.value = ''
  analysisDone.value = false
  activeTab.value = 0
}

// 高亮对应的识别结果
const highlightResult = (id: string) => {
  highlightedId.value = id
}

// 清除高亮
const clearHighlight = () => {
  highlightedId.value = ''
}
</script>

<style scoped lang="less">
@import '../../assets/styles/variables.less';

.image-demo {
  padding: 20px 0 40px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

// 场景容器样式
.scene-container {
  background: rgba(0, 0, 0, 0.2);
  
  .scene-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    gap: 15px;
    
    .badge {
      background: rgba(92, 215, 201, 0.2);
      color: @secondary-color;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
    }
    
    .scene-title {
      font-weight: 600;
      font-size: 18px;
    }
  }
}

// 黑板场景
.board-scene {
  display: flex;
  padding: 20px;
  gap: 25px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

// 黑板视图
.board-view {
  flex: 1;
  min-width: 0;
}

// 空黑板状态
.empty-board {
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  .example-images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
    
    .example-image {
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      height: 100px;
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .example-label {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 6px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  
  .upload-area {
    background: rgba(0, 0, 0, 0.1);
    border: 1px dashed rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    
    .upload-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    
    p {
      color: @text-secondary;
      text-align: center;
      max-width: 300px;
    }
    
    .upload-btn {
      background: @primary-color;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
      
      &:hover {
        background: lighten(@primary-color, 5%);
      }
    }
  }
}

// 图像查看器
.image-viewer {
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .image-container {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    min-height: 200px;
    background: rgba(0, 0, 0, 0.2);
    
    img {
      width: 100%;
      display: block;
    }
    
    .processing-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid transparent;
        border-top-color: @primary-color;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      p {
        color: @text-secondary;
      }
    }
  }
  
  .image-controls {
    display: flex;
    gap: 10px;
    
    .control-btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      background: @primary-color;
      color: white;
      border: none;
      flex: 1;
      
      &:hover:not(:disabled) {
        background: lighten(@primary-color, 5%);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &.outline {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: @text-secondary;
        
        &:hover {
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
        }
      }
    }
  }
}

// 识别标记层
.recognition-marks {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  .mark {
    position: absolute;
    border: 2px solid;
    border-radius: 4px;
    pointer-events: auto;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
    
    .mark-label {
      position: absolute;
      top: -20px;
      left: -2px;
      padding: 2px 6px;
      border-radius: 4px 4px 0 0;
      color: white;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }
  }
}

// 识别结果区域
.recognition-results {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  
  .results-header {
    margin-bottom: 15px;
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    
    .result-tabs {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 8px;
      
      .tab-btn {
        padding: 6px 12px;
        border-radius: 6px;
        background: transparent;
        border: none;
        color: @text-secondary;
        cursor: pointer;
        font-size: 14px;
        
        &:hover {
          color: @text-primary;
          background: rgba(255, 255, 255, 0.05);
        }
        
        &.active {
          background: rgba(92, 215, 201, 0.1);
          color: @secondary-color;
        }
      }
    }
  }
  
  .results-content {
    flex: 1;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 15px;
    height: 300px;
    
    .results-loading, .results-placeholder {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      p {
        color: @text-tertiary;
      }
    }
  }
}

// 文本内容结果
.text-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .text-item {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 12px;
    border-left: 3px solid @text-tertiary;
    transition: all 0.3s;
    
    &.highlighted {
      background: rgba(67, 84, 255, 0.1);
      border-left-color: @primary-color;
    }
    
    .text-item-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      
      .item-type {
        font-weight: 600;
        font-size: 13px;
      }
      
      .confidence {
        font-size: 12px;
        color: @text-tertiary;
      }
    }
    
    .text-item-content {
      line-height: 1.5;
    }
  }
}

// 公式内容结果
.formula-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .formula-item {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 12px;
    border-left: 3px solid @text-tertiary;
    transition: all 0.3s;
    
    &.highlighted {
      background: rgba(255, 100, 146, 0.1);
      border-left-color: @accent-color;
    }
    
    .formula-display {
      font-family: monospace;
      padding: 8px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      margin-bottom: 8px;
      overflow-x: auto;
      white-space: nowrap;
    }
    
    .formula-info {
      display: flex;
      justify-content: flex-end;
      
      .confidence {
        font-size: 12px;
        color: @text-tertiary;
      }
    }
  }
}

// 图表内容结果
.chart-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .chart-item {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 12px;
    border-left: 3px solid @text-tertiary;
    transition: all 0.3s;
    
    &.highlighted {
      background: rgba(255, 204, 0, 0.1);
      border-left-color: @warning-color;
    }
    
    .chart-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      
      .chart-type {
        font-weight: 600;
        font-size: 13px;
      }
      
      .confidence {
        font-size: 12px;
        color: @text-tertiary;
      }
    }
    
    .chart-data {
      overflow-x: auto;
      
      table {
        width: 100%;
        border-collapse: collapse;
        
        th, td {
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px;
          text-align: center;
        }
        
        th {
          background: rgba(0, 0, 0, 0.2);
          font-weight: 600;
        }
      }
    }
  }
}

// AI 洞见面板
.insights-panel {
  background: rgba(0, 0, 0, 0.2);
  animation: slide-up 0.5s;
  
  .panel-header {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    .panel-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      
      i {
        color: @accent-color;
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

// 主题标签
.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .tag {
    background: rgba(92, 215, 201, 0.15);
    color: @secondary-color;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
  }
}

// 难点分析
.difficulty-points {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .difficulty-item {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 12px;
    border-left: 3px solid;
    
    .difficulty-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      
      .difficulty-title {
        font-weight: 600;
      }
      
      .difficulty-level {
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 4px;
        color: white;
      }
    }
    
    p {
      color: @text-secondary;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

// 建议列表
.suggestion-list {
  li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    line-height: 1.5;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: @accent-color;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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