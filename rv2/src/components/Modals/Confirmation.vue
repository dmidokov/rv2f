<template>
  <div class="modal modal-shadow" v-if="show" id="addOrganizationModal">
    <div class="modal-header">
      {{ header }}
    </div>
    <div class="modal-centered">
      <button-o-k :button-text="confirmButtonTitle" @click="doAction"/>
    </div>
    <div class="modal-close-button" @click="closeModal">
      <img src="/icons/close-icon-red.svg">
    </div>
  </div>
</template>

<script>
import ButtonOK from "../Buttons/ButtonOK.vue";
import ButtonNo from "../Buttons/ButtonNo.vue";

export default {
  name: "Confirmation",
  components: {ButtonOK, ButtonNo},
  props: ['header', 'action', 'confirmButtonTitle'],
  emits: ['myEvent'],
  data() {
    return {
      show: false,
    }
  },
  methods: {
    showModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    doAction() {
      this.$props.action()
    }
  }
}
</script>

<style scoped>
.modal {
  background: #535bf2;
  position: absolute;
  margin: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background: var(--background-content);
  justify-content: center;
  border-radius: 10px;
  padding: 30px 50px;
  text-align: center;
}

.modal-shadow {
  -webkit-box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
  -moz-box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
  box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: var(--text-black);
  margin-bottom: 23px;
}

.modal-centered {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.modal-close-button {
  color: red;
  position: absolute;
  width: 48px;
  height: 48px;
  top: 10px;
  right: 0px;
  cursor: pointer;
}

.modal-close-button img {
  width: 30px;
  height: 30px;
}
</style>