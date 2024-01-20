<template>
  <div class="branch-selector-container">
    <div v-for="branch in branchesList">
      <BranchSelectorBlock
          :name="branch.name"
          :data-branch-id="branch.id"
      />
    </div>
  </div>
</template>

<script>
import {Branches} from "../js/Branches";
import BranchSelectorBlock from "./BranchSelectorBlock.vue";

export default {
  name: "BranchSelector",
  components: {BranchSelectorBlock},
  data() {
    return {
      branchesList: null,
    }
  },
  methods: {
    getUserBranches() {
      let branches = new Branches()
      branches.load().then(r => {
        this.branchesList = r
      })
    }
  },
  beforeMount() {
    this.getUserBranches()
  }
}
</script>

<style scoped>
.branch-selector-container {
  display: flex;
  flex-direction: row;
  width:100%;
  justify-content: flex-start;
}
</style>