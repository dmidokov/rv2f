<template>
  <button class="ok-button">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "ButtonOK",
  props: ["buttonText"],
}
</script>

<style scoped>
.ok-button {
  background: var(--button-background-ok-dark);
  outline: none;
  width: 200px;
}
</style>