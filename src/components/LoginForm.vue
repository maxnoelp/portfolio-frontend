<template>
  <div class="d-flex flex-column justify-content-center align-items-center h-100">
    <div class="login-form">
      <h1 class="text-white mb-3">Admin Login</h1>
      <div class="form-custom mb-3">
        <input v-model="username" type="text" placeholder="Username" class="w-100" id="username" />
        <label for="username">Username</label>
      </div>
      <div class="form-custom mb-3">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="w-100"
          id="password"
        />
        <label for="password">Password</label>
        <button type="button" class="show-btn" @click="togglePassword" style="z-index: 5">
          <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
        </button>
      </div>
      <button @click="submit" class="btn-primary-me w-100">Login</button>
      <div v-if="error" class="alert alert-danger mt-3" role="alert">Login fehlgeschlagen!</div>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
const apiUrl = import.meta.env.VITE_API
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showPassword: false,
    }
  },
  methods: {
    async submit() {
      const auth = useAuthStore()
      try {
        const res = await fetch(apiUrl + '/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.non_field_errors?.[0] || data?.detail || 'Login fehlgeschlagen')
        }

        auth.login({ user: data.user, token: data.key })
        localStorage.setItem('token', data.key)
        this.error = ''
        this.username = ''
        this.password = ''
        router.push({ name: 'admin' })
        console.log('Login erfolgreich:', data)
      } catch (err) {
        this.error = err.message
        console.error('Fehler beim Login:', err)
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>
<style scoped>
.login-form {
  display: flex;
  flex-direction: column;

  min-width: 320px;

  padding: 65px;

  background-color: var(--color-dark);

  border-radius: 10px;
}

.show-btn {
  background-color: transparent;
  border: none;
  color: var(--color-white);
  :hover {
    color: var(--color-tertiary);
  }
}

.btn-primary-me {
  font-size: 20px;
}
</style>
