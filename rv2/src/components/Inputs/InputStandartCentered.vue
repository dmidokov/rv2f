<template>
  <div class="modal-input">
    <input-standart
        class="input"
        v-model="value"
        :placeholder="placeholder"
        :inputid="inputid"
    />
  </div>
</template>

<script>
import InputStandart from "../Inputs/InputStandart.vue";
export default {
  name: "InputStandartCentered",
  props: ["placeholder", "inputid"],
  components: {InputStandart},
  data() {
    return {
      value: ""
    }
  }
}
</script>

<style scoped>
.modal-input {
  justify-content: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  display: flex;
  align-items: center;
  margin-top: 13px;
  margin-bottom: 13px;
  color: var(--text-black);
}
</style>