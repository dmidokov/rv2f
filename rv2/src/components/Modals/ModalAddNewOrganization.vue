<template>

  <div class="modal modal-shadow" v-if="show" id="addOrganizationModal">
    <div class="modal-content-clock">
      <div class="modal-header">
        <div>New Organization</div>
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="orgName"
            placeholder="Name"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="orgHost"
            placeholder="Host"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="orgAdminName"
            placeholder="Admin Name"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="orgAdminPassword"
            placeholder="Admin Password"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <button-add :button-text="addOrgText" @click="addOrganization"/>
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
import {Organizations} from "../../js/Organizations";

export default {
  name: "ModalAddNewOrganization",
  components: {ButtonAdd, InputStandard: InputStandard, InputStandardCentered: InputStandardCentered},
  emits: ['myEvent'],
  data() {
    return {
      show: false,
      orgName: "",
      orgHost: "",
      orgAdminName: "",
      orgAdminPassword: "",
      addOrgText: "Add",
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
      let result = await new Organizations().create({
        "name": this.orgName.trim(),
        "host": this.orgHost.trim(),
        "user-name": this.orgAdminName.trim(),
        "user-pass": this.orgAdminPassword.trim()
      })
      if (result) {
        this.$emit('orgAdded')
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
  height: 500px;
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