// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    login(userData, token) {
      this.isAuthenticated = true
      this.user = userData
      this.token = token
      localStorage.setItem('token', token)
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      this.token = null
      console.log(this.token)
      localStorage.removeItem('token')
      router.push({ name: 'home' })
    },
    async restoreUser() {
      const apiUrl = import.meta.env.VITE_API
      if (this.token) {
        try {
          const res = await axios.get(apiUrl + '/api/auth/user/', {
            headers: {
              Authorization: `Token ${this.token}`,
            },
          })
          this.user = res.data
          this.isAuthenticated = true
        } catch (err) {
          console.warn('Token ungültig – Logout')
          this.logout()
        }
      }
    },
  },
})
