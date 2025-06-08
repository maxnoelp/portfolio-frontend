<template>
  <div class="img-bg h-100">
    <div class="container bg-custom-main h-100 border-start border-end border-2 border-black">
      <h1>Admin</h1>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'projects' }"
            @click="activeTab = 'projects'"
            href="#"
          >
            Projects
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'skills' }"
            @click="activeTab = 'skills'"
            href="#"
          >
            Skills
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'link' }"
            @click="activeTab = 'link'"
            href="#"
          >
            Link
          </a>
        </li>
      </ul>

      <AdminSkills v-if="activeTab === 'skills'" />
      <AdminProjects v-if="activeTab === 'projects'" />
    </div>
  </div>
</template>

<script>
import AdminSkills from '@/components/skills/AdminSkills.vue'
import AdminProjects from '@/components/projects/AdminProjects.vue'

export default {
  components: { AdminSkills, AdminProjects },
  data() {
    return {
      activeTab: 'home',
    }
  },
}
</script>

<style>
.bg-custom-main {
  background-color: var(--color-secondary);
}
</style>
