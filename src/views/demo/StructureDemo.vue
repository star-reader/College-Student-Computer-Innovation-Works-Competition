<template>
  <div class="structure-demo">
    <div class="container">
      <div class="demo-card glass-card">
        <div class="card-header">
          <div class="badge">内容结构化演示</div>
          <h2>教学内容智能结构化</h2>
        </div>
        
        <div class="card-body">
          <div class="input-section">
            <h3>输入教学内容</h3>
            <textarea 
              v-model="contentInput" 
              placeholder="请输入或粘贴教学内容..."
              :disabled="isProcessing"
            ></textarea>
            
            <div class="actions">
              <button 
                class="btn primary" 
                @click="processContent"
                :disabled="!contentInput || isProcessing"
              >
                {{ isProcessing ? '处理中...' : '生成结构' }}
              </button>
              <button 
                class="btn outline" 
                @click="loadSample"
                :disabled="isProcessing"
              >
                加载示例
              </button>
              <button 
                class="btn outline" 
                @click="clearContent"
                :disabled="isProcessing"
              >
                清空内容
              </button>
            </div>
          </div>
          
          <div class="output-section">
            <h3>智能结构化结果</h3>
            
            <div class="output-content">
              <!-- 结构化内容 -->
              <div v-if="structuredContent" class="knowledge-graph">
                <div class="main-topic">
                  <span>{{ structuredContent.topic }}</span>
                </div>
                
                <div class="knowledge-branches">
                  <div 
                    v-for="(branch, index) in structuredContent.branches" 
                    :key="index"
                    class="branch"
                  >
                    <div class="branch-title">{{ branch.title }}</div>
                    <div class="branch-content">
                      <ul>
                        <li v-for="(point, i) in branch.points" :key="i">
                          {{ point }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 占位提示 -->
              <div v-else-if="!isProcessing" class="placeholder">
                <div class="placeholder-icon">
                  <i class="icon-layers"></i>
                </div>
                <p>请输入教学内容并点击"生成结构"按钮</p>
              </div>
              
              <!-- 加载中状态 -->
              <div v-else class="processing">
                <div class="spinner"></div>
                <p>正在分析内容并生成结构...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI 建议面板 -->
      <div v-if="structuredContent" class="ai-panel glass-card">
        <div class="panel-header">
          <div class="panel-title">
            <i class="icon-bulb"></i>
            <span>教学与学习建议</span>
          </div>
        </div>
        
        <div class="panel-body">
          <div class="suggestion-section">
            <h3>教学建议</h3>
            <ul>
              <li v-for="(suggestion, index) in teachingSuggestions" :key="index">
                {{ suggestion }}
              </li>
            </ul>
          </div>
          
          <div class="suggestion-section">
            <h3>学习建议</h3>
            <ul>
              <li v-for="(suggestion, index) in learningSuggestions" :key="index">
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

const contentInput = ref('')
const isProcessing = ref(false)
const structuredContent = ref<{
  topic: string;
  branches: { title: string; points: string[] }[]
} | null>(null)

// 模拟的示例内容
const sampleContent = `化学平衡是指在一定条件下，正反应和逆反应速率相等，宏观上反应物和生成物的浓度不再变化的状态。

化学平衡的特征：
1. 化学平衡是动态平衡，正反应和逆反应仍在进行，但速率相等。
2. 化学平衡可以从正反应或逆反应方向达到。
3. 在一定条件下，平衡混合物中各组分的浓度保持恒定。

化学平衡常数K表示平衡时生成物浓度与反应物浓度的比值，对于反应aA + bB ⇌ cC + dD，平衡常数K = [C]^c[D]^d / [A]^a[B]^b。

影响化学平衡的因素（勒夏特列原理）：
1. 浓度变化：增加某一物质的浓度，平衡向消耗该物质的方向移动。
2. 温度变化：升高温度，平衡向吸热方向移动；降低温度，平衡向放热方向移动。
3. 压力变化：对于气体反应，增加压力，平衡向气体分子数减少的方向移动。
4. 催化剂：催化剂只能加快反应速率，不影响平衡位置。`

// 教学建议
const teachingSuggestions = [
  '使用实验演示正反应与逆反应的动态平衡过程',
  '通过颜色变化的实验直观展示平衡移动',
  '引导学生理解平衡常数K的物理意义',
  '设计不同条件下的对比实验，展示勒夏特列原理',
  '结合实际工业生产案例讲解平衡移动的应用'
]

// 学习建议
const learningSuggestions = [
  '理解化学平衡的动态性质，正反应和逆反应同时进行',
  '掌握书写平衡常数表达式的方法',
  '记忆并理解勒夏特列原理，预测平衡移动方向',
  '理解催化剂对平衡的影响与局限性',
  '通过习题练习巩固对平衡移动的理解'
]

// 处理内容结构化
const processContent = () => {
  if (!contentInput.value) return
  
  isProcessing.value = true
  
  // 模拟处理延迟
  setTimeout(() => {
    structuredContent.value = {
      topic: '化学平衡',
      branches: [
        {
          title: '基本概念',
          points: [
            '化学平衡是正反应和逆反应速率相等的状态',
            '宏观表现为反应物和生成物浓度不再变化',
            '化学平衡是动态平衡'
          ]
        },
        {
          title: '平衡特征',
          points: [
            '可以从正反应或逆反应方向达到',
            '平衡混合物中各组分的浓度保持恒定',
            '在封闭体系中才能达到化学平衡'
          ]
        },
        {
          title: '平衡常数',
          points: [
            'K = [C]^c[D]^d / [A]^a[B]^b',
            'K值大小反映反应的进行程度',
            'K仅与温度有关，与初始浓度无关'
          ]
        },
        {
          title: '影响因素',
          points: [
            '浓度变化：增加某物质浓度，平衡向消耗该物质方向移动',
            '温度变化：升高温度，平衡向吸热方向移动',
            '压力变化：增加压力，平衡向气体分子数减少方向移动',
            '催化剂：只能加快反应速率，不影响平衡位置'
          ]
        }
      ]
    }
    
    isProcessing.value = false
  }, 2000)
}

// 加载示例内容
const loadSample = () => {
  contentInput.value = sampleContent
  structuredContent.value = null
}

// 清空内容
const clearContent = () => {
  contentInput.value = ''
  structuredContent.value = null
}
</script>

<style scoped lang="less">
@import '../../assets/styles/variables.less';

.structure-demo {
  padding: 20px 0 40px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

// 演示卡片
.demo-card {
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  
  .card-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    .badge {
      display: inline-block;
      background: rgba(255, 100, 146, 0.2);
      color: @accent-color;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 10px;
    }
    
    h2 {
      font-size: 22px;
      font-weight: 600;
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

// 输入区域
.input-section {
  flex: 1;
  
  h3 {
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  textarea {
    width: 100%;
    height: 400px;
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 15px;
    color: @text-primary;
    line-height: 1.6;
    resize: none;
    
    &:focus {
      outline: none;
      border-color: rgba(255, 100, 146, 0.3);
    }
    
    &::placeholder {
      color: @text-tertiary;
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
  
  .actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    
    @media (max-width: 576px) {
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      
      &.primary {
        background: @accent-color;
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background: lighten(@accent-color, 5%);
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

// 输出区域
.output-section {
  flex: 1;
  
  h3 {
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  .output-content {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    height: 400px;
    overflow-y: auto;
  }
}

// 知识图谱
.knowledge-graph {
  padding: 20px;
  
  .main-topic {
    background: rgba(255, 100, 146, 0.2);
    border: 1px solid rgba(255, 100, 146, 0.3);
    color: @accent-color;
    font-weight: 600;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 30px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      width: 2px;
      height: 15px;
      background: rgba(255, 100, 146, 0.3);
    }
  }
  
  .knowledge-branches {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 25px;
    
    .branch {
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: -15px;
        left: 50%;
        width: 2px;
        height: 15px;
        background: rgba(255, 255, 255, 0.1);
      }
      
      .branch-title {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 10px;
        border-radius: 6px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 15px;
      }
      
      .branch-content {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 12px;
        
        ul {
          margin: 0;
          padding-left: 20px;
          
          li {
            margin-bottom: 8px;
            color: @text-secondary;
            line-height: 1.5;
            font-size: 14px;
            
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}

// 占位和处理中状态
.placeholder, .processing {
  height: 100%;
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
    border-top-color: @accent-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
  }
}

// AI 建议面板
.ai-panel {
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
  
  .panel-body {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .suggestion-section {
    h3 {
      font-size: 16px;
      margin-bottom: 15px;
      font-weight: 600;
      color: @text-secondary;
    }
    
    ul {
      padding-left: 20px;
      
      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 5px;
        line-height: 1.5;
        
        &::marker {
          color: @accent-color;
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