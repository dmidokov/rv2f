<template>
  <div>
    <button @click="handler" v-bind:data-id="dataid">
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ActionButton18",
  props: ['action', 'title', 'dataid'],
  methods: {
    handler(event) {
      this.action(event)
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
}

button {
  font-size : 18px;
}

button:hover {
  background: var(--background-accent-themed-rgba-first);
}

button:active {
  box-shadow: var(--background-accent-themed-rgba-first)
}

</style>