<template>
  <div class="gg"> {{ branches }} </div>
</template>

<script>
import {Branches} from "../js/Branches";

export default {
  name: "Branches",
  data() {
    return {
      branches : ""
    }
  },
  methods: {
    loadBranches() {
      let org = new Branches()

      org.load().then(r => {
        for (let i in r) {
          if (r[i].hasOwnProperty("create-time") && r[i].hasOwnProperty("update-time")) {
            r[i]["create-time"] = new Date(r[i]["create-time"] * 1000).toLocaleString()
            r[i]["update-time"] = new Date(r[i]["update-time"] * 1000).toLocaleString()
          }
        }

        this.branches = r
      })
    },
  },
  beforeMount() {
    this.loadBranches()
  }
}
</script>

<style scoped>
.gg {
  color : black;
}
</style>