<template>

  <div class="modal modal-shadow" v-if="show" id="addBranchModal">
    <div class="modal-content-clock">
      <div class="modal-header">
        <div>New Branch</div>
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="branchName"
            placeholder="Name"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="branchAddress"
            placeholder="Address"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="branchPhone"
            placeholder="Phone"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <input-standard
            v-model="branchWorkTime"
            placeholder="Work Time"
            inputid="id-1"
        />
      </div>
      <div class="modal-centered">
        <button-add :button-text="addBranchText" @click="addBranch"/>
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
import {Branches} from "../../js/Branches";

export default {
  name: "ModalAddNewBranch",
  components: {ButtonAdd, InputStandard: InputStandard, InputStandardCentered: InputStandardCentered},
  emits: ['myEvent'],
  data() {
    return {
      show: false,
      branchName: "",
      branchAddress: "",
      branchPhone: "",
      branchWorkTime: "",
      addBranchText: "Add",
    }
  },
  methods: {
    showModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    async addBranch() {
      let result = await new Branches().create({
        "name": this.branchName.trim(),
        "address": this.branchAddress.trim(),
        "phone": this.branchPhone.trim(),
        "workTime": this.branchWorkTime.trim()
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