<template>
  <div class="cross-demo">
    <div class="container">
      <div class="demo-card glass-card">
        <div class="card-header">
          <div class="badge">知识关联</div>
          <h2>跨课堂知识点关联分析</h2>
        </div>
        
        <div class="card-body">
          <div class="course-selection">
            <h3>选择要关联的课程</h3>
            <div class="courses-grid">
              <div 
                v-for="(course, index) in availableCourses" 
                :key="index"
                class="course-card"
                :class="{ selected: selectedCourses.includes(course.id) }"
                @click="toggleCourseSelection(course.id)"
              >
                <div class="course-icon" :style="{ backgroundColor: course.color }">
                  <i :class="course.icon"></i>
                </div>
                <div class="course-info">
                  <h4>{{ course.name }}</h4>
                  <p>{{ course.description }}</p>
                </div>
                <div class="select-indicator"></div>
              </div>
            </div>
            
            <div class="selection-controls">
              <button 
                class="btn primary" 
                @click="analyzeRelations"
                :disabled="selectedCourses.length < 2 || isProcessing"
              >
                {{ isProcessing ? '分析中...' : '分析关联' }}
              </button>
              <button 
                class="btn outline" 
                @click="clearSelection"
                :disabled="isProcessing"
              >
                清除选择
              </button>
            </div>
          </div>
          
          <div class="relation-visualization">
            <h3>知识关联可视化</h3>
            <div class="visualization-area">
              <!-- 分析结果 -->
              <div v-if="analyzedData && !isProcessing" class="graph-container">
                <div class="relation-graph">
                  <!-- 中心节点 -->
                  <div class="center-node">共同知识点</div>
                  
                  <!-- 辐射课程节点 -->
                  <div class="course-nodes">
                    <div 
                      v-for="(id, index) in selectedCourses" 
                      :key="id"
                      class="course-node"
                      :style="{ 
                        '--rotation': (index * 360 / selectedCourses.length) + 'deg',
                        '--color': getCourseById(id).color
                      }"
                    >
                      <div class="node-content">
                        <div class="node-icon">
                          <i :class="getCourseById(id).icon"></i>
                        </div>
                        <div class="node-label">{{ getCourseById(id).name }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 连接线 -->
                  <div class="connections">
                    <svg width="100%" height="100%" viewBox="0 0 600 600">
                      <!-- 通过JS动态生成的SVG连接线 -->
                      <path 
                        v-for="(connection, index) in analyzedData.connections" 
                        :key="index"
                        :d="connection.path"
                        :stroke="connection.color"
                        stroke-width="2"
                        fill="none"
                        stroke-dasharray="5,5"
                      />
                    </svg>
                  </div>
                </div>
                
                <!-- 知识点列表 -->
                <div class="knowledge-points">
                  <h4>共同知识点 ({{ analyzedData.commonConcepts.length }})</h4>
                  <div class="concept-list">
                    <div 
                      v-for="(concept, index) in analyzedData.commonConcepts" 
                      :key="index"
                      class="concept-item"
                    >
                      <div class="concept-name">{{ concept.name }}</div>
                      <div class="concept-courses">
                        <span 
                          v-for="courseId in concept.courseIds" 
                          :key="courseId" 
                          class="course-tag"
                          :style="{ backgroundColor: getCourseById(courseId).color + '33' }"
                        >
                          {{ getCourseById(courseId).shortName }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 未分析状态 -->
              <div v-else-if="!isProcessing" class="placeholder-content">
                <div class="placeholder-icon">
                  <i class="icon-connection"></i>
                </div>
                <p>请选择至少两门课程，然后点击"分析关联"按钮</p>
              </div>
              
              <!-- 加载状态 -->
              <div v-else class="loading-content">
                <div class="spinner"></div>
                <p>正在分析选中课程的知识点关联...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 教学路径建议面板 -->
      <div v-if="analyzedData && !isProcessing" class="path-panel glass-card">
        <div class="panel-header">
          <div class="panel-title">
            <i class="icon-map"></i>
            <span>跨学科教学路径建议</span>
          </div>
        </div>
        
        <div class="panel-body">
          <div class="path-suggestions">
            <div 
              v-for="(path, index) in analyzedData.pathSuggestions" 
              :key="index"
              class="path-item"
            >
              <div class="path-header">
                <div class="path-title">{{ path.title }}</div>
                <div class="path-rating">
                  <span class="star" v-for="i in 5" :key="i">
                    <i :class="i <= path.rating ? 'icon-star-filled' : 'icon-star-outline'"></i>
                  </span>
                </div>
              </div>
              <div class="path-description">{{ path.description }}</div>
              <div class="path-steps">
                <div 
                  v-for="(step, stepIndex) in path.steps" 
                  :key="stepIndex"
                  class="path-step"
                >
                  <div class="step-number">{{ stepIndex + 1 }}</div>
                  <div class="step-content">
                    <div class="step-title">{{ step.title }}</div>
                    <div class="step-detail">{{ step.detail }}</div>
                  </div>
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
import { ref } from 'vue'

// 可供选择的课程
const availableCourses = [
  { 
    id: 1, 
    name: '高中物理', 
    shortName: '物理',
    description: '力学、电学、热学、光学等基础物理概念', 
    icon: 'icon-atom',
    color: '#4354ff'
  },
  { 
    id: 2, 
    name: '高中数学', 
    shortName: '数学',
    description: '函数、几何、代数、概率统计等数学知识', 
    icon: 'icon-function',
    color: '#5cd7c9'
  },
  { 
    id: 3, 
    name: '高中化学', 
    shortName: '化学',
    description: '元素、化学反应、有机物、化学平衡等', 
    icon: 'icon-beaker',
    color: '#ff6492'
  },
  { 
    id: 4, 
    name: '高中生物', 
    shortName: '生物',
    description: '细胞、代谢、生态、遗传进化等生命科学', 
    icon: 'icon-leaf',
    color: '#4cd964'
  },
  { 
    id: 5, 
    name: '高中地理', 
    shortName: '地理',
    description: '自然地理、人文地理、环境与资源', 
    icon: 'icon-globe',
    color: '#ffcc00'
  },
  { 
    id: 6, 
    name: '信息技术', 
    shortName: '信息',
    description: '计算机系统、编程、数据与算法', 
    icon: 'icon-chip',
    color: '#834d9b'
  }
]

// 状态与数据
const selectedCourses = ref<number[]>([])
const isProcessing = ref(false)
const analyzedData = ref<{
  connections: { path: string; color: string }[];
  commonConcepts: { name: string; courseIds: number[] }[];
  pathSuggestions: {
    title: string;
    description: string;
    rating: number;
    steps: { title: string; detail: string }[];
  }[];
} | null>(null)

// 根据ID获取课程信息
const getCourseById = (id: number) => {
  return availableCourses.find(course => course.id === id) || availableCourses[0]
}

// 切换课程选择
const toggleCourseSelection = (courseId: number) => {
  const index = selectedCourses.value.indexOf(courseId)
  if (index === -1) {
    selectedCourses.value.push(courseId)
  } else {
    selectedCourses.value.splice(index, 1)
  }
  
  analyzedData.value = null
}

// 清除选择
const clearSelection = () => {
  selectedCourses.value = []
  analyzedData.value = null
}

// 分析课程关联
const analyzeRelations = () => {
  if (selectedCourses.value.length < 2) return
  
  isProcessing.value = true
  
  // 模拟数据分析过程
  setTimeout(() => {
    // 生成SVG路径
    const connections = generateConnectionPaths()
    
    // 生成模拟的共同知识点
    const commonConcepts = generateCommonConcepts()
    
    // 生成路径建议
    const pathSuggestions = generatePathSuggestions()
    
    analyzedData.value = {
      connections,
      commonConcepts,
      pathSuggestions
    }
    
    isProcessing.value = false
  }, 2000)
}

// 生成SVG连接路径
const generateConnectionPaths = () => {
  const connections: { path: string; color: string }[] = []
  
  // 中心坐标
  const centerX = 300
  const centerY = 300
  const radius = 150
  
  // 为每个选中的课程生成连接线
  selectedCourses.value.forEach((courseId, index) => {
    const angle = (index * 360 / selectedCourses.value.length) * (Math.PI / 180)
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    
    // 创建SVG路径
    const path = `M${centerX},${centerY} Q${(centerX + x) / 2 + 50},${(centerY + y) / 2} ${x},${y}`
    const color = getCourseById(courseId).color
    
    connections.push({ path, color })
  })
  
  return connections
}

// 生成共同知识点
const generateCommonConcepts = () => {
  // 模拟数据 - 实际应用中应从后端获取
  const concepts = [
    { 
      name: '能量转换原理', 
      courseIds: [1, 2, 3, 4] // 物理、数学、化学、生物
    },
    { 
      name: '微分方程应用', 
      courseIds: [1, 2, 6] // 物理、数学、信息
    },
    { 
      name: '熵增原理', 
      courseIds: [1, 3, 5] // 物理、化学、地理
    },
    { 
      name: '周期性变化', 
      courseIds: [1, 2, 3, 5] // 物理、数学、化学、地理
    },
    { 
      name: '守恒定律', 
      courseIds: [1, 3, 4] // 物理、化学、生物
    },
    { 
      name: '数据分析方法', 
      courseIds: [2, 4, 5, 6] // 数学、生物、地理、信息
    },
    { 
      name: '系统思维', 
      courseIds: [3, 4, 5, 6] // 化学、生物、地理、信息
    }
  ]
  
  // 过滤出与选中课程相关的概念
  return concepts.filter(concept => {
    // 检查概念是否至少与两门选中的课程相关
    const matchingCourses = concept.courseIds.filter(id => selectedCourses.value.includes(id))
    return matchingCourses.length >= 2
  })
}

// 生成教学路径建议
const generatePathSuggestions = () => {
  // 模拟数据
  const allSuggestions = [
    {
      title: '能量与转换的跨学科教学路径',
      description: '从物理能量概念出发，关联化学能、生物能及环境能量转换的综合教学路径',
      rating: 5,
      relevantCourses: [1, 3, 4, 5], // 物理、化学、生物、地理
      steps: [
        {
          title: '物理基础: 能量形式与转换',
          detail: '介绍机械能、热能、电能等基本能量形式及其转换规律'
        },
        {
          title: '化学视角: 化学反应中的能量变化',
          detail: '探讨化学能的本质，以及化学反应中的能量守恒与转换'
        },
        {
          title: '生物系统: 生命活动的能量代谢',
          detail: '讲解光合作用、呼吸作用等生物过程中的能量流动与转换'
        },
        {
          title: '地理环境: 自然系统的能量循环',
          detail: '分析全球能量平衡、气候系统和生态系统中的能量流动'
        }
      ]
    },
    {
      title: '数学模型在自然科学中的应用',
      description: '以数学建模为核心，连接物理、化学和生物学中的定量分析方法',
      rating: 4,
      relevantCourses: [1, 2, 3, 4], // 物理、数学、化学、生物
      steps: [
        {
          title: '数学基础: 函数与微积分',
          detail: '建立函数关系、微分方程的基本概念和解法'
        },
        {
          title: '物理应用: 运动方程与场论',
          detail: '利用微分方程描述物体运动和场的分布变化'
        },
        {
          title: '化学动力学: 反应速率与平衡',
          detail: '用数学模型描述化学反应速率和平衡常数的计算'
        },
        {
          title: '生物过程: 种群增长与生化反应',
          detail: '应用数学模型研究种群动态变化和生化反应过程'
        }
      ]
    },
    {
      title: '信息处理与科学分析',
      description: '结合信息技术与各学科的数据分析方法，培养科学计算与数据思维',
      rating: 3,
      relevantCourses: [2, 4, 5, 6], // 数学、生物、地理、信息
      steps: [
        {
          title: '数据基础: 统计与概率',
          detail: '介绍数据分析的数学基础和统计学原理'
        },
        {
          title: '编程实践: 科学计算基础',
          detail: '学习使用编程语言处理和分析科学数据'
        },
        {
          title: '生物信息: 生物数据的采集与分析',
          detail: '运用信息技术分析生物学数据，如基因序列分析'
        },
        {
          title: '地理信息: 空间数据处理',
          detail: '学习GIS技术在地理环境监测和分析中的应用'
        }
      ]
    }
  ]
  
  // 过滤出与选中课程相关的建议
  return allSuggestions.filter(suggestion => {
    // 检查建议是否与选中的课程集合有足够的重叠
    const matchingCourses = suggestion.relevantCourses.filter(id => 
      selectedCourses.value.includes(id)
    )
    // 至少有两门课程匹配才返回建议
    return matchingCourses.length >= 2
  })
}
</script>

<style scoped lang="less">
@import '../../assets/styles/variables.less';

.cross-demo {
  padding: 20px 0 40px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

// 演示卡片
.demo-card {
  background: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  .card-header {
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    
    .badge {
      display: inline-block;
      background: rgba(0, 120, 215, 0.15);
      color: #0078d7;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 10px;
    }
    
    h2 {
      font-size: 22px;
      font-weight: 600;
      color: @text-primary;
    }
  }
  
  .card-body {
    padding: 20px;
    display: flex;
    gap: 30px;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
}

// 课程选择区域
.course-selection {
  flex: 1;
  
  h3 {
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
    color: @text-primary;
  }
  
  .courses-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .course-card {
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }
    
    &.selected {
      background: rgba(0, 120, 215, 0.08);
      border-color: rgba(0, 120, 215, 0.2);
      
      .select-indicator {
        position: absolute;
        right: 15px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #0078d7;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &::after {
          content: '✓';
          color: white;
          font-size: 12px;
        }
      }
    }
    
    .course-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
    }
    
    .course-info {
      flex: 1;
      
      h4 {
        font-size: 16px;
        margin-bottom: 4px;
        font-weight: 600;
      }
      
      p {
        font-size: 13px;
        color: @text-secondary;
        line-height: 1.4;
      }
    }
  }
  
  .selection-controls {
    display: flex;
    gap: 10px;
    
    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      
      &.primary {
        background: #834d9b;
        color: white;
        
        &:hover:not(:disabled) {
          background: lighten(#834d9b, 5%);
        }
      }
      
      &.outline {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: @text-secondary;
        
        &:hover:not(:disabled) {
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
        }
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

// 关联可视化区域
.relation-visualization {
  flex: 1;
  
  h3 {
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
    color: @text-primary;
  }
  
  .visualization-area {
    background: rgba(0, 0, 0, 0.03);
    border-radius: 8px;
    min-height: 400px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.05);
    
    .placeholder-content, .loading-content {
      height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: @text-tertiary;
      padding: 20px;
      
      .placeholder-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-bottom: 15px;
      }
      
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid transparent;
        border-top-color: #834d9b;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 15px;
      }
      
      p {
        text-align: center;
        max-width: 250px;
      }
    }
  }
}

// 关系图
.graph-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  
  .relation-graph {
    position: relative;
    height: 300px;
    
    .center-node {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      background: rgba(131, 77, 155, 0.2);
      border: 2px solid rgba(131, 77, 155, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      text-align: center;
      color: #834d9b;
      z-index: 10;
    }
    
    .course-nodes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      
      .course-node {
        --rotation: 0deg;
        --color: #4354ff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: rotate(var(--rotation)) translateX(150px) rotate(calc(-1 * var(--rotation)));
        
        .node-content {
          width: 80px;
          height: 80px;
          margin-left: -40px;
          margin-top: -40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          
          .node-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--color);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            margin-bottom: 5px;
          }
          
          .node-label {
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
          }
        }
      }
    }
    
    .connections {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  
  .knowledge-points {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 15px;
    
    h4 {
      font-size: 14px;
      margin-bottom: 12px;
      font-weight: 600;
      color: @text-secondary;
    }
    
    .concept-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 10px;
      
      .concept-item {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 10px;
        
        .concept-name {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .concept-courses {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          
          .course-tag {
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}

// 路径建议面板
.path-panel {
  background: rgba(255, 255, 255, 0.9);
  animation: slide-up 0.5s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  .panel-header {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    
    .panel-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      color: @text-primary;
      
      i {
        color: #0078d7;
      }
    }
  }
  
  .panel-body {
    padding: 20px;
  }
  
  .path-suggestions {
    display: flex;
    flex-direction: column;
    gap: 30px;
    
    .path-item {
      background: rgba(131, 77, 155, 0.05);
      border-radius: 8px;
      padding: 20px;
      
      .path-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;
        
        @media (max-width: 576px) {
          flex-direction: column;
          gap: 5px;
        }
        
        .path-title {
          font-size: 18px;
          font-weight: 600;
        }
        
        .path-rating {
          color: #ffcc00;
          
          .icon-star-filled {
            color: #ffcc00;
          }
          
          .icon-star-outline {
            color: rgba(255, 204, 0, 0.3);
          }
        }
      }
      
      .path-description {
        color: @text-secondary;
        margin-bottom: 15px;
        line-height: 1.5;
      }
      
      .path-steps {
        display: flex;
        flex-direction: column;
        gap: 15px;
        
        .path-step {
          display: flex;
          gap: 15px;
          
          .step-number {
            width: 24px;
            height: 24px;
            background: #834d9b;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;
            margin-top: 3px;
          }
          
          .step-content {
            flex: 1;
            
            .step-title {
              font-weight: 600;
              margin-bottom: 5px;
            }
            
            .step-detail {
              font-size: 14px;
              color: @text-secondary;
              line-height: 1.5;
            }
          }
        }
      }
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