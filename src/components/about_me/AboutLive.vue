<template>
  <div class="bg-dark m-0 py-5">
    <div class="container text-white">
      <h2 class="mb-3">About Me</h2>
      <blockquote class="blockquote blockquote--classic">
        <p>
          Nach meiner Ausbildung zum Maler und Lackierer war ich 13 Jahre in diesem Beruf tätig.
          2024 habe ich meine Leidenschaft für das Programmieren zum Beruf gemacht. Nach einem
          dreimonatigen Webentwicklungs-Bootcamp mit Fokus auf modernen Technologien habe ich im
          Oktober 2024 als Junior Webentwickler gestartet. Seitdem arbeite ich mit Vue.js, Django,
          Django CMS und Django REST Framework an Webprojekten und erweitere kontinuierlich mein
          technisches Wissen. Besonders wichtig ist mir dabei sauberer, wartbarer Code und ein
          durchdachtes Zusammenspiel von Frontend und Backend. Lernen gehört für mich zum Alltag –
          ob durch eigene Projekte, neue Frameworks oder den Blick in den Quellcode.
        </p>
      </blockquote>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.blockquote {
  padding-left: 2rem;
  position: relative;
  overflow: hidden;
}

.blockquote::before,
.blockquote::after {
  position: absolute;
  color: var(--color-primary);
}

.blockquote p {
  margin: 0;
}

.blockquote p + p {
  margin-top: 1rem;
}

.blockquote--slashes::before {
  content: '//';
  transform: rotate(90deg);
  left: 0;
}

.blockquote--slashes::after {
  content: '';
  left: 5px;
  top: 25px;
  width: 1px;
  height: 100%;
  background-color: var(--color-primary);
}

.blockquote--classic::before {
  content: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='%239ac6c5'><path d='M9.983 3v7.391C9.983 16.095 6.252 19.961 1 21l-.995-2.151C2.437 17.932 4 15.211 4 13H0V3h9.983zM24 3v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151C16.437 17.932 18 15.211 18 13h-3.983V3H24z'/></svg>");
  left: 0;
}

.blockquote--classic::after {
  content: '';
  left: 5px;
  top: 25px;
  width: 1px;
  height: 100%;
  background-color: var(--color-primary);
}

blockquote + blockquote {
  margin-top: 5rem;
}
</style>
