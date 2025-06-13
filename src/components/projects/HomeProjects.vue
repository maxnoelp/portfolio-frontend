<template>
  <div class="container my-5">
    <h2>Projects</h2>
    <div class="radio-inputs my-3">
      <label class="radio">
        <input
          type="radio"
          name="radio"
          :checked="selectedSkillId === null"
          @change="selectedSkillId = null"
        />
        <span class="name">All</span>
      </label>
      <label
        class="radio"
        v-for="skill in skills"
        :key="skill.id"
        :checked="selectedSkillId === skill.name"
        @change="selectedSkillId = skill.name"
      >
        <input type="radio" name="radio" />
        <span class="name">{{ skill.name }}</span>
      </label>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6" v-for="project in filterProjects" :key="project.id">
        <div class="card h-100">
          <img :src="project.image" alt="" class="img-fluid w-100" style="max-height: 400px" />
          <div class="content">
            <p class="heading m-0">{{ project.title }}</p>
            <div class="d-flex flex-row gap-3">
              <div class="tag-container" v-for="tag in project.tags" :key="tag">
                <img :src="tag.image" class="text-white" height="40" width="40" />
              </div>
            </div>
            <p class="para" v-html="project.description"></p>
            <div class="d-flex gap-3 w-100">
              <a
                v-if="project.gh"
                :href="project.gh"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary-me w-100"
                >Github</a
              >
              <a
                v-if="project.live"
                :href="project.live"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary-me w-100"
                >Live Test</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const apirUrl = import.meta.env.VITE_API
export default {
  data() {
    return {
      projects: [],
      skills: [
        {
          id: 1,
          name: 'Python',
        },
        {
          id: 2,
          name: 'Django',
        },
        {
          id: 3,
          name: 'DjangoCMS',
        },
        {
          id: 4,
          name: 'Flet',
        },
        {
          id: 5,
          name: 'Vue.js',
        },
      ],
      selectedSkillId: null,
    }
  },
  computed: {
    filterProjects() {
      if (!this.selectedSkillId) return this.projects
      return this.projects.filter((project) =>
        project.tags.some((tag) => tag.name === this.selectedSkillId),
      )
    },
  },
  methods: {
    async getProjects() {
      const res = await fetch(apirUrl + '/api/projects/', {
        method: 'GET',
      })
      const data = await res.json()
      this.projects = data
      console.log(this.projects)
    },
  },
  created() {
    this.getProjects()
  },
}
</script>
<style scoped>
.card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  background: var(--color-dark);
  border: none;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 20px 20px 20px;
  gap: 10px;
  color: #e8e8e8;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.content .heading {
  font-weight: 700;
  font-size: 32px;
}

.content .para {
  line-height: 1.5;
}

.card:hover {
  box-shadow: 0 0 20px rgba(9, 117, 241, 0.8);
  border-color: #0974f1;
}

/* filter */
/* From Uiverse.io by Yaya12085 */
.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: var(--color-primary);
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  font-size: 14px;
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 0;
  color: var(--color-dark);
  transition: all 0.15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: var(--color-dark);
  color: var(--color-primary);
  font-weight: 600;
}

.tag-container {
  background-color: var(--color-primary);
  border-radius: 10px;

  height: 40px;
  width: 40px;
}
</style>
