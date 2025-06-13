<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <nav class="position-fixed w-100 custom-index bg-nav-color custom-border py-1 px-4 rounded">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <img src="@/assets/images/logo.png" alt="" width="100" />
      </div>
      <div class="d-none d-lg-flex flex-row gap-3">
        <RouterLink class="custom-link-dark" to="/">Home</RouterLink>
        <RouterLink class="custom-link-dark" to="/projects">Projekte</RouterLink>
        <RouterLink v-if="!auth.user" class="custom-link-dark" to="/login">Login</RouterLink>
        <a v-if="auth.user" class="custom-link-dark" to="/admin">Admin</a>
        <a v-if="auth.user" class="custom-link-dark" to="/logout">Logout</a>
      </div>
      <div class="d-block d-lg-none">
        <button class="no-btn fs-3" @click="showMenu">
          <i class="bi bi-three-dots-vertical"></i>
        </button>
      </div>
    </div>
    <transition name="slide">
      <div v-show="isOpen" class="text-center d-lg-none overflow-hidden" id="collapseMenu">
        <hr />
        <RouterLink class="custom-link-dark d-block my-2" to="/" @click="showMenu">Home</RouterLink>
        <RouterLink class="custom-link-dark d-block my-2" to="/projects" @click="showMenu"
          >Projekte</RouterLink
        >
        <RouterLink class="custom-link-dark d-block my-2" to="/contact" @click="showMenu"
          >Kontakt</RouterLink
        >
        <RouterLink
          v-if="auth.user"
          class="custom-link-dark d-block my-2"
          to="/admin"
          @click="showMenu"
          >Admin</RouterLink
        >
        <hr />
        <button v-if="!auth.user" class="btn-tertiary-me w-100 d-block my-2" @click="login">
          Login
        </button>
        <button v-if="auth.user" class="btn btn-dark w-100 d-block my-2" @click="logout">
          Logout
        </button>
      </div>
    </transition>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
export default {
  name: 'NavbarComp',
  data() {
    return {
      isOpen: false,
      btnContent: '<i class="bi bi-arrow-down"></i>',
      auth: useAuthStore(),
    }
  },
  methods: {
    showMenu() {
      this.isOpen = !this.isOpen
    },
    logout() {
      this.auth.logout()
    },
    login() {
      this.$router.push({ name: 'login' })
      this.showMenu()
    },
  },
}
</script>

<style scoped>
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition:
    max-height 0.5s ease,
    opacity 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 300px; /* großzügig genug für Inhalte */
  opacity: 1;
}
.no-btn {
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
}

.custom-border {
  border: 2px solid;
  border-radius: 5px;
  border-color: var(--color-primary);
}

.bg-nav-color {
  background-color: rgba(255, 255, 255, 0.75);
}

.custom-index {
  z-index: 1000;
}
</style>
<!--background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);-->
