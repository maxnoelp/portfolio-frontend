<template>
  <div class="mb-5">
    <h2 class="mt-5 mb-3">Skills bearbeiten</h2>
    <div v-if="!editSkills" class="row row-cols-2 row-cols-lg-4">
      <div class="col" v-for="skill in skills" :key="skill.id">
        <div class="card">
          <div class="d-flex justify-content-center">
            <img :src="skill.image" alt="..." width="64" height="64" />
          </div>
          <div class="card-body text-center">
            <h5 class="">{{ skill.name }}</h5>
            <a href="#" class="btn btn-danger me-2" @click="deleteSkill(skill.id)"
              ><i class="bi bi-trash"></i
            ></a>
            <a href="#" class="btn btn-warning" @click="startEditing(skill)"
              ><i class="bi bi-pencil"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <AdminSkillsEdit v-else :skill="editSkills" @stopEditing="stopEditing" />
  </div>
</template>
<script>
import AdminSkillsEdit from './AdminSkillsEdit.vue'
const apiUrl = import.meta.env.VITE_API
export default {
  components: { AdminSkillsEdit },
  data() {
    return {
      skills: [],
      editSkills: null,
      form: {
        name: '',
        image: null,
      },
    }
  },
  methods: {
    async fetchSkills() {
      const res = await fetch(apiUrl + '/api/skills/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      const data = await res.json()
      this.skills = data
    },
    async deleteSkill(id) {
      await fetch(apiUrl + '/api/skills/' + id + '/', {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      this.fetchSkills()
    },
    startEditing(skill) {
      this.editSkills = skill
    },
    stopEditing() {
      this.editSkills = null
      this.fetchSkills()
    },
  },
  created() {
    this.fetchSkills()
  },
}
</script>
<style lang=""></style>
