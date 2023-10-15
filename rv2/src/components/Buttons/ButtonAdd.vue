<template>
  <button class="ok-button">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "ButtonAdd",
  props: ["buttonText"],
}
</script>

<style scoped>
.ok-button {
  background: var(--button-background-themed);
  outline: none;
  width: 200px;
}
</style>