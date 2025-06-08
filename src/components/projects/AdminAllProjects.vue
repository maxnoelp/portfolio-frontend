<template>
  <div>
    <h2>Projekte bearbeiten</h2>
    <div v-if="!editingProject" class="row row-cols-1 row-cols-lg-2 px-2">
      <div class="col card mb-3" v-for="project in projects" :key="project.id">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="project.image" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <div class="card-text" v-html="project.description"></div>
              <div class="d-flex gap-3 my-3">
                <a
                  v-if="project.gh"
                  :href="project.gh"
                  target="_blank"
                  rel="noopener"
                  class="custom-link"
                  >Github</a
                >
                <a
                  v-if="project.live"
                  :href="project.live"
                  target="_blank"
                  rel="noopener"
                  class="custom-link"
                  >Live</a
                >
              </div>
              <div class="d-flex gap-3">
                <button class="btn btn-danger" @click="deleteProject(project.id)">
                  Löschen <i class="bi bi-trash"></i>
                </button>
                <button class="btn btn-warning" @click="startEditing(project)">
                  Bearbeiten <i class="bi bi-pencil"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AdminEditProjects
      v-else
      :project="editingProject"
      @cancel="stopEditing"
      @saved="stopEditing"
    />
  </div>
</template>
<script>
import AdminEditProjects from './AdminEditProjects.vue'

const apirUrl = import.meta.env.VITE_API
export default {
  components: { AdminEditProjects },
  data() {
    return {
      projects: [],
      editingProject: null,
    }
  },
  methods: {
    async fetchProjects() {
      const res = await fetch(apirUrl + '/api/projects/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          // KEIN Content-Type hier! fetch setzt ihn automatisch korrekt für FormData.
        },
      })
      const data = await res.json()
      console.log(data)
      this.projects = data
      return data
    },
    async deleteProject(id) {
      const res = await fetch(`${apirUrl}/api/projects/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) {
        const error = await res.text()
        console.error('Fehler beim Löschen:', error)
        throw new Error('Löschen fehlgeschlagen')
      }

      // Optional: aktualisiere die lokale Projektliste
      this.projects = this.projects.filter((p) => p.id !== id)

      console.log('Projekt erfolgreich gelöscht')
    },
    startEditing(project) {
      this.editingProject = project
    },
    stopEditing() {
      this.editingProject = null
      this.fetchProjects()
    },
  },
  created() {
    this.fetchProjects()
  },
}
</script>
<style lang=""></style>
