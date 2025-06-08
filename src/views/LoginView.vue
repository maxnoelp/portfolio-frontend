<template>
  <div class="full-height">
    <div class="container full-height">
      <LoginForm />
    </div>
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  components: {
    LoginForm,
  },
}
</script>
<style scoped>
.full-height {
  height: 100%;
}
</style>
