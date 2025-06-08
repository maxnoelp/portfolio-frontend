<template>
  <div>
    <h2 class="mt-5 mb-3">Skills</h2>
    <div class="row mb-5">
      <div class="col-12 col-lg-10">
        <div class="form-custom mb-3">
          <input type="text" v-model="skill" placeholder="Skill Name" id="skill" class="w-100" />
          <label for="skill">Skill Name</label>
        </div>
        <div class="file-upload mb-3">
          <input type="file" id="fileInput" class="file-input" @change="handleFile" />
          <label for="fileInput" class="file-label">
            <i class="bi bi-upload"></i> Datei auswählen
          </label>
          <span v-if="!fileName" class="file-name">Keine Datei ausgewählt</span>
          <span v-if="fileName" class="file-name">{{ fileName }}</span>
        </div>
        <button class="btn-tertiary-me mt-3" @click="submit">Hinzufügen</button>

        <div v-if="isLoading" class="spinner-wrapper">
          <div class="spinner"></div>
          <span>Uploading...</span>
        </div>

        <p v-if="error">{{ error }}</p>
      </div>
    </div>
    <hr class="border-white" />
    <AdminAllSkills ref="skillsList" />
  </div>
</template>

<style></style>

<script>
import AdminAllSkills from './AdminAllSkills.vue'

const apiUrl = import.meta.env.VITE_API
export default {
  components: { AdminAllSkills },
  data() {
    return {
      skill: '',
      image: null,
      error: '',
      isLoading: false,
      fileName: '',
    }
  },
  methods: {
    handleFile(event) {
      this.image = event.target.files[0]
      this.fileName = this.image ? this.image.name : ''
    },

    async submit() {
      this.isLoading = true
      this.error = ''
      try {
        const formData = new FormData()
        formData.append('name', this.skill)
        formData.append('image', this.image)

        const res = await fetch(apiUrl + '/api/skills/', {
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
        this.$refs.skillsList.fetchSkills()
        this.skill = ''
        this.image = null
        this.error = ''
        this.fileName = ''
        console.log('Skill erstellt:', data)
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
