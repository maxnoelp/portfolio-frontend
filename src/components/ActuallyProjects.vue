<template>
  <div>
    <h2>Projects</h2>
    <div v-if="projectOne">
      <h3 class="">{{ projectOne.name }}</h3>
      <p>{{ prData }}</p>
      <p>{{ relData }}</p>
    </div>
  </div>
</template>
<script>
const apirUrlOne = import.meta.env.VITE_API_1
const apirUrlTwo = import.meta.env.VITE_API_2
export default {
  data() {
    return {
      projectOne: null,
      projectTwo: null,
      prData: null,
      relData: null,
      mergeData: null,
    }
  },
  methods: {
    async fetchOne() {
      const res = await fetch(apirUrlOne, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      })
      const data = await res.json()
      console.log(data)
      this.projectOne = data
      this.onePullUrl = data.pull_url
    },
    async fetchTwo() {
      const res = await fetch(apirUrlTwo, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      })
      const data = await res.json()
      console.log('2', data)

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      }

      const prUrl = data.pulls_url.replace('{/number}', '?state=all')
      const relUrl = data.releases_url.replace('{/id}', '')
      const [prsRes, releasesRes] = await Promise.all([
        fetch(prUrl, { headers }),
        fetch(relUrl, { headers }),
      ])

      const allPRs = await prsRes.json()
      const releases = await releasesRes.json()

      this.prData = allPRs
      this.relData = releases

      this.projectOne = data
    },
  },
  created() {
    this.fetchOne()
    this.fetchTwo()
  },
}
</script>
<style lang=""></style>
