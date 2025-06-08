<script setup>
import { QuillEditor } from '@vueup/vue-quill'

import '@vueup/vue-quill/dist/vue-quill.snow.css'
</script>
<template>
  <div>
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col">
        <div class="form-custom mb-3">
          <input v-model="form.title" type="text" placeholder="Titel" id="title" />
          <label for="title">Titel</label>
        </div>
        <div class="form-custom mb-3">
          <input type="text" v-model="form.gh" placeholder="Github" id="gh" class="w-100" />
          <label for="gh">Github</label>
        </div>
        <div class="form-custom mb-3">
          <input
            type="text"
            v-model="form.live"
            placeholder="Live Url"
            id="liveUrl"
            class="w-100"
          />
          <label for="liveUrl">Live Url</label>
        </div>
      </div>
      <div class="col">
        <div class="form-custom mb-3">
          <input type="file" @change="(e) => handleFile(e, 'image')" />
        </div>
        <div class="form-custom mb-3">
          <input type="file" @change="(e) => handleFile(e, 'image2')" />
        </div>
      </div>
    </div>

    <QuillEditor v-model:content="form.description" content-type="html" />
    <button class="btn btn-success" @click="save">Speichern</button>
    <button class="btn btn-secondary" @click="$emit('cancel')">Abbrechen</button>
  </div>
</template>

<script>
export default {
  props: ['project'],
  data() {
    return {
      form: {
        title: this.project.title,
        gh: this.project.gh,
        live: this.project.live,
        description: this.project.description,
        image: null,
        image2: null,
      },
    }
  },
  methods: {
    handleFile(e, field) {
      this.form[field] = e.target.files[0]
    },

    async save() {
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('gh', this.form.gh)
      formData.append('live', this.form.live)
      formData.append('description', this.form.description)

      // Nur hinzufügen, wenn neue Datei gewählt wurde:
      if (this.form.image) formData.append('image', this.form.image)
      if (this.form.image2) formData.append('image2', this.form.image2)

      const res = await fetch(`${import.meta.env.VITE_API}/api/projects/${this.project.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        console.error('Fehler beim Speichern:', data)
        return
      }

      this.$emit('saved')
    },
  },
}
</script>
