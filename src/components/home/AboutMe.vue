<template>
  <div class="bg-img-hero">
    <div class="container h-100">
      <div class="d-flex flex-column justify-content-end h-100">
        <h1 class="text-prime">Fullstack Entwickler und Problemlöser.</h1>
        <p class="d-flex flex-row mb-3 mb-lg-5 text-prime" v-html="randomText"></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listText: [
        "Refactor now. Ride for ruin and the world's ending!",
        'For Gondor we deploy!',
        'Speak, friend, and npm install.',
        'The logs are lit! Rohan will debug!',
        'Sam didn’t leave Frodo — and I won’t squash your commit.',
      ],
    }
  },
  computed: {
    randomText() {
      return this.listText[Math.floor(Math.random() * this.listText.length)]
    },
  },
}
</script>
<style scoped>
.bg-img-hero {
  background-image: url('@/assets/images/backgorund-hero.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
}
h1 {
  font-size: 2.75rem;
}

@media (min-width: 768px) {
  .bg-img-hero {
    height: 600px;
  }
}
</style>
