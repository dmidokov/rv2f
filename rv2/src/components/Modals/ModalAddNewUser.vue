<template>

  <div class="modal modal-shadow" v-if="show" id="addOrganizationModal">
    <div class="modal-content-clock">
      <div class="modal-header">
        <div>New User</div>
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="userName"
            placeholder="Name"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="userPassword"
            placeholder="Password"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <button-add :button-text="addUserText" @click="addOrganization"/>
      </div>
    </div>
    <div class="modal-close-button" @click="closeModal">
      <img src="/icons/close-icon-red.svg">
    </div>
  </div>
</template>

<script>

import InputStandard from "../Inputs/InputStandart.vue";
import InputStandardCentered from "../Inputs/InputStandartCentered.vue";
import ButtonAdd from "../Buttons/ButtonAdd.vue";
import {Users} from "../../js/Users";

export default {
  name: "ModalAddNewOrganization",
  components: {ButtonAdd, InputStandard: InputStandard, InputStandardCentered: InputStandardCentered},
  emits: ['myEvent'],
  data() {
    return {
      show: false,
      userName: "",
      userPassword: "",
      orgAdminName: "",
      orgAdminPassword: "",
      addUserText: "Add",
    }
  },
  methods: {
    showModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    async addOrganization() {
      let result = await new Users().create({
        "name": this.userName.trim(),
        "password": this.userPassword.trim(),
      })
      if (result) {
        this.$emit('userAdded')
        this.closeModal()
      } else {
        console.log("Not added")
      }
    }
  }
}
</script>

<style scoped>
.modal {
  background: #535bf2;
  width: 500px;
  height: 400px;
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
  font-size: 32px;
  line-height: 38px;
  color: var(--text-black);
  margin-bottom: 13px;
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
  right: 10px;
  cursor: pointer;
}

.modal-close-button img {
  width: 48px;
  height: 48px;
}
</style>