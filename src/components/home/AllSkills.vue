<template lang="">
  <div class="container my-5">
    <h2 class="mb-4">Tech Stack</h2>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="d-flex flex-column justify-content-center align-items-center" id="card">
          <div>
            <h5 class="mb-3">Frontend</h5>
            <ul class="check-list">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>Vue</li>
              <li>Bootstrap</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center">
        <div class="d-flex flex-column justify-content-center align-items-center" id="card">
          <div>
            <h5 class="mb-3">Backend</h5>
            <ul class="check-list">
              <li>Django</li>
              <li>DjangoCMS</li>
              <li>Django Rest Framework</li>
              <li>FastAPI</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center">
        <div class="d-flex flex-column justify-content-center align-items-center" id="card">
          <div>
            <h5 class="mb-3">Tools</h5>
            <ul class="check-list">
              <li>Git</li>
              <li>Figma</li>
              <li>Docker</li>
              <li>Jira</li>
              <li>AI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-border {
  border-color: var(--color-primary);
  border-width: 2px;
}

.check-list {
  list-style: none;
  padding-left: 0;
}

.check-list li {
  margin-bottom: 0.5em;
}

.check-list li::before {
  content: '✔';
  color: var(--color-primary);
  margin-right: 0.5em;
}

#card {
  width: 330px;
}
</style>
