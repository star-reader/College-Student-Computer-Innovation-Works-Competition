// 格式化日期
export const formatDate = (date: Date | string, format = 'YYYY-MM-DD'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  
  const year = d.getFullYear()
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const seconds = d.getSeconds().toString().padStart(2, '0')
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

// 防抖函数
export const debounce = <F extends (...args: any[]) => any>(func: F, wait = 300) => {
  let timeout: number | null = null
  
  return function(...args: Parameters<F>) {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    
    timeout = window.setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// 节流函数
export const throttle = <F extends (...args: any[]) => any>(func: F, wait = 300) => {
  let lastTime = 0
  
  return function(...args: Parameters<F>) {
    const now = Date.now()
    
    if (now - lastTime >= wait) {
      func(...args)
      lastTime = now
    }
  }
}

// 随机ID生成
export const generateId = (length = 8): string => {
  return Math.random().toString(36).substring(2, 2 + length)
}

// 深拷贝函数
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as any
  }
  
  if (obj instanceof Object) {
    const copy = {} as Record<string, any>
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepClone((obj as Record<string, any>)[key])
      }
    }
    return copy as T
  }
  
  return obj
} 