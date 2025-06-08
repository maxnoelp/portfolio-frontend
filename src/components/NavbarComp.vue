<script setup>
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { Collapse } from 'bootstrap'

const auth = useAuthStore()
const isOpen = ref(false)

function toggleNav() {
  isOpen.value = !isOpen.value
  const navBorder = document.getElementById('navbarPortfolio')
  navBorder.classList.toggle('custom-border')
}
function logout() {
  auth.logout()
  closeNav()
}

function closeNav() {
  const collapseEl = document.getElementById('collapseExample')
  const bsCollapse = Collapse.getInstance(collapseEl) || new Collapse(collapseEl)
  bsCollapse.hide()
  isOpen.value = false // falls du auch das Icon ändern willst
}
</script>

<template>
  <div class="bg-black nav-wrap custom-border" id="navbarPortfolio">
    <div class="d-flex justify-content-between align-items-center h-100 px-3 px-lg-5 mx-0 mx-lg-5">
      <h1 class="text-white m-0">Portfolio</h1>
      <button
        class="burger"
        :class="{ open: isOpen }"
        @click="toggleNav"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
    </div>
  </div>
  <div class="collapse" id="collapseExample">
    <div class="bg-black custom-border">
      <div class="d-flex flex-column flex-lg-row gap-3 h-100 px-3 py-3 px-lg-5 mx-0 mx-lg-5">
        <RouterLink to="/" class="animated-link" @click="closeNav">Home</RouterLink>
        <RouterLink to="{ name: 'projects' }" class="animated-link" @click="closeNav"
          >Projects</RouterLink
        >
        <RouterLink to="/contact" class="animated-link" @click="closeNav">Contact</RouterLink>
        <RouterLink v-if="!auth.user" to="{ name: 'login' }" class="animated-link" @click="closeNav"
          >Admin Login</RouterLink
        >
        <RouterLink v-if="auth.user" to="{name: 'admin'}" class="animated-link" @click="closeNav"
          >Admin</RouterLink
        >
        <button v-if="auth.user" @click="logout" class="animated-link">Logout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-wrap {
  height: 80px;
}

.custom-border {
  border-bottom: 4px solid;
  border-image: linear-gradient(to right, #e81cff, #40c9ff, #e81cff);
  border-image-slice: 1;
}
/* burger menu */
.burger {
  width: 40px; /* größer! */
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  overflow: visible; /* Verhindert Abschneiden */
  position: relative;
  z-index: 1001;
}

.line {
  width: 30px;
  height: 3px;
  background-image: linear-gradient(to right, #e81cff, #40c9ff);
  border-radius: 2px;
  transition: all 0.4s ease;
  transform-origin: center;
}

/* Animation für das X */
.burger.open .line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 7px);
}

.burger.open .line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.burger.open .line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -7px);
}

/* Ausgangszustand (ausgeblendet) */
.slide-out {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 2s ease;
  overflow: hidden;
}

/* Zielzustand (eingeblendet) */
.slide-in {
  height: 100px;
  transition: all 2s ease-in-out;
  overflow: hidden;
}

.animated-link {
  position: relative;
  display: inline-block;
  font-size: 20px;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.animated-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #e81cff, #40c9ff);
  transition: width 0.4s ease;
}

.animated-link:hover {
  color: transparent;
  background: linear-gradient(to right, #e81cff, #40c9ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.animated-link:hover::after {
  width: 100%;
}
</style>
<!--background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);-->
