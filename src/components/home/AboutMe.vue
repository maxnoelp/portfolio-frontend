<template>
  <div class="bg-dark">
    <div class="container">
      <div class="row row-cols-1 row-cols-lg-2 py-5">
        <div class="col text-prime mb-4 md-lg-0 d-flex flex-column justify-content-center">
          <div>
            <h1 clas="mb-3">Fullstack Entwickler und Problemlöser.</h1>
            <p class="mb-3">
              Ich entwickle sauberen, wartbaren Code mit modernen Technologien – für nachhaltige
              Softwarelösungen.
            </p>
            <div class="d-flex gap-3">
              <button class="btn-primary-me w-100"><span>Projekte</span></button>
              <button class="btn-primary-me w-100"><span>Kontakt</span></button>
            </div>
          </div>
        </div>
        <div class="col text-white text-end">
          <img src="@/assets/images/me.jpg" class="img-fluid rounded-3" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
h1 {
  font-size: 4.2rem;
}

img {
  max-height: 600px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
}
</style>
