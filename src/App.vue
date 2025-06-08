<template>
  <div class="layout-wrapper">
    <NavbarComp class="sticky-top" />

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer>
      <FooterComp />
    </footer>
  </div>
</template>

<script setup>
import NavbarComp from './components/NavbarComp.vue'
import FooterComp from './components/FooterComp.vue'
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main.flex-grow {
  flex: 1;
}
</style>
