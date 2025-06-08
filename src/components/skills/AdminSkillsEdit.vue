<template>
  <div class="col-12 col-lg-10">
    <div class="form-custom mb-3">
      <input type="text" v-model="form.name" placeholder="Skill Name" id="skill" class="w-100" />
      <label for="skill">Skill Name</label>
    </div>
    <div>
      <div class="file-upload mb-3">
        <input type="file" id="fileInput" class="file-input" @change="handleFile" />
        <label for="fileInput" class="file-label">
          <i class="bi bi-upload"></i> Datei auswählen
        </label>
        <span v-if="!fileName" class="file-name">Datei auswählen</span>
        <span v-if="fileName" class="file-name">{{ fileName }}</span>
      </div>
      <small>(Wenn keine neue Datei benötigt wird, dann auch keine einfügen!)</small>
    </div>
    <div class="d-flex gap-3">
      <button class="btn btn-success mt-3" @click="save">Speichern</button>
      <p v-if="error">{{ error }}</p>
      <button class="btn btn-danger mt-3" @click="$emit('stopEditing')">Abbrechen</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['skill'],
  data() {
    return {
      form: {
        name: this.skill.name,
        image: null,
      },
      fileName: '',
      error: null,
    }
  },
  methods: {
    handleFile(event) {
      const file = event.target.files[0]
      if (file) {
        this.form.image = file
        this.fileName = file.name
      }
    },
    async save() {
      const formData = new FormData()
      formData.append('name', this.form.name)
      if (this.form.image instanceof File) {
        formData.append('image', this.form.image)
      }

      const res = await fetch(`${import.meta.env.VITE_API}/api/skills/${this.skill.id}/`, {
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
<style lang=""></style>
