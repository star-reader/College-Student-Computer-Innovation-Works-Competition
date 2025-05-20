import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isDarkMode: true,
    isLoading: false,
    showSidebar: true,
    currentModule: 'dashboard',
    notifications: [] as { id: string; type: string; message: string; read: boolean }[],
  }),
  
  getters: {
    unreadNotifications: (state) => state.notifications.filter(n => !n.read).length,
  },
  
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    
    setLoading(status: boolean) {
      this.isLoading = status
    },
    
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
    
    setCurrentModule(module: string) {
      this.currentModule = module
    },
    
    addNotification(notification: { type: string; message: string }) {
      this.notifications.push({
        id: Date.now().toString(),
        type: notification.type,
        message: notification.message,
        read: false
      })
    },
    
    markNotificationAsRead(id: string) {
      const notification = this.notifications.find(n => n.id === id)
      if (notification) {
        notification.read = true
      }
    },
    
    clearAllNotifications() {
      this.notifications = []
    }
  }
}) 