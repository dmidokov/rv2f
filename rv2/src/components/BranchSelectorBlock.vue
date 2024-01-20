<template>
  <button class="branch-selector-block" @click="selectBranch">
      {{ name }}
  </button>
</template>

<script>
import {Branches} from "../js/Branches";

export default {
  name: "BranchSelectorBlock",
  props: ["name", "branchId"],
  methods: {
    async selectBranch(event) {
      let branchId = event.target.getAttribute("data-branch-id")
      await (new Branches()).setUserActiveBranch(branchId)
    }
  }
}
</script>

<style scoped>
.branch-selector-block {
  width: 300px;
  height: 300px;
  background: var(--background-content);
  border-radius: 20px;
  border: 2px solid var(--stroke-separatot-primary);
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  color: var(--text-input)
}

</style>