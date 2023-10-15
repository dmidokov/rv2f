<template>
    <input
        class="input"
        v-model="value"
        :placeholder="placeholder"
        :id="inputid"
    >
</template>

<script>
export default {
  name: "InputStandart",
  props: ["placeholder", "inputid", "orgName"],
  data() {
    return {
      value: ""
    }
  }
}
</script>

<style scoped>


.input {
  width: 345px;
  height: 43px;
  box-sizing: border-box;
  background: var(--background-secondary);
  border: 1px solid var(--stroke-field-border-alpha);
  border-radius: 10px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  padding-left: 15px;
  color: var(--text-input);
  outline: none;
}
</style>