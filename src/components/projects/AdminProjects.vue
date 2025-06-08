<script setup>
import { QuillEditor } from '@vueup/vue-quill'

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import AdminAllProjects from './AdminAllProjects.vue'
</script>
<template>
  <div class="mt-5">
    <h2 class="mb-3">Project Anlegen</h2>
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col">
        <div class="form-custom mb-3">
          <input v-model="title" type="text" placeholder="Titel" id="title" />
          <label for="title">Titel</label>
        </div>
        <div class="form-custom mb-3">
          <input type="text" v-model="gh" placeholder="Github" id="gh" class="w-100" />
          <label for="gh">Github</label>
        </div>
        <div class="form-custom mb-3">
          <input type="text" v-model="liveUrl" placeholder="Live Url" id="liveUrl" class="w-100" />
          <label for="liveUrl">Live Url</label>
        </div>
      </div>
      <div class="col">
        <div class="file-upload mb-3">
          <input
            type="file"
            id="fileInput1"
            class="file-input"
            @change="(e) => handleFile(e, 'image', fileName)"
          />
          <label for="fileInput1" class="file-label">
            <i class="bi bi-upload"></i> Datei auswählen
          </label>
          <span v-if="!fileName" class="file-name">Keine Datei ausgewählt</span>
          <span v-if="fileName" class="file-name">{{ fileName }}</span>
        </div>
        <div class="file-upload mb-3">
          <input
            type="file"
            id="fileInput2"
            class="file-input"
            @change="(e) => handleFile(e, 'image2', fileName2)"
          />
          <label for="fileInput2" class="file-label">
            <i class="bi bi-upload"></i> Datei auswählen
          </label>
          <span v-if="!fileName2" class="file-name">Keine Datei ausgewählt</span>
          <span v-if="fileName2" class="file-name">{{ fileName2 }}</span>
        </div>
      </div>
    </div>

    <QuillEditor v-model:content="description" content-type="html" />
    <button class="btn-tertiary-me mt-3" @click="submit">Hinzufügen</button>

    <div v-if="isLoading" class="spinner-wrapper">
      <div class="spinner"></div>
      <span>Uploading...</span>
    </div>
    <p v-if="error">{{ error }}</p>
    <hr class="border-white mt-5" />
    <AdminAllProjects class="mt-5" />
  </div>
</template>
<style scoped></style>
<script>
const apirUrl = import.meta.env.VITE_API
export default {
  components: { AdminAllProjects },
  data() {
    return {
      title: '',
      description: '',
      image: null,
      image2: null,
      gh: '',
      liveUrl: '',

      error: '',
      isLoading: false,
      fileName: '',
      fileName2: '',
    }
  },
  methods: {
    handleFile(event, field, fileName) {
      this[field] = event.target.files[0]
      fileName = this[field] ? this[field].name : ''

      if (field === 'image') {
        this.fileName = fileName
      } else if (field === 'image2') {
        this.fileName2 = fileName
      }
    },

    async submit() {
      this.isLoading = true
      this.error = ''
      try {
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('image', this.image)
        formData.append('image2', this.image2)
        formData.append('description', this.description)
        formData.append('gh', this.gh)
        formData.append('liveUrl', this.liveUrl)

        const res = await fetch(apirUrl + '/api/projects/', {
          method: 'POST',
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            // KEIN Content-Type hier! fetch setzt ihn automatisch korrekt für FormData.
          },
          body: formData,
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.detail || JSON.stringify(data))
        }

        this.title = ''
        this.image = null
        this.image2 = null
        this.description = ''
        this.gh = ''
        this.liveUrl = ''
        this.error = ''
        console.log('Projekt erstellt:', data)
      } catch (err) {
        this.error = err.message
        console.error('Fehler beim Erstellen:', err)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
