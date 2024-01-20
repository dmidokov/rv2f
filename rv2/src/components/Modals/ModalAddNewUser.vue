<template>

  <div class="modal modal-shadow" v-if="show" id="addOrganizationModal">
    <div class="modal-content-clock">
      <div class="modal-tabs-block">
        <div data-id="service-tab" class="modal-tabs-selected" @click="tabClick" data-type="service">Service</div>
        <div data-id="employee-tab" @click="tabClick" data-type="employee">Employee</div>
      </div>
      <div name="tab-content" id="service-tab">
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
      </div>
      <div name="tab-content" id="employee-tab" class="modal-tab-content-hide">
        <div class="modal-centered">
          <input-standard
              v-model="employeeName"
              placeholder="Employee Name"
              @keyup="translitToEng"
              id="employee-name"
          />
        </div>
        <div class="modal-centered">
          <input-standard
              v-model="employeeLastName"
              placeholder="Employee Last Name"
              @keyup="translitToEng"
              id="employee-last-name"
          />
        </div>
        <div class="modal-centered">
          <input-standard
              v-model="employeeLogin"
              placeholder="Employee Login"
              id="employee-login"
          />
        </div>
      </div>
      <div class="modal-centered">
        <button-add :button-text="addUserText" @click="addUser"/>
      </div>
    </div>
    <div class="modal-close-button" @click="closeModal">
      <img src="/icons/close-icon-red.svg" alt="close">
    </div>
  </div>
</template>

<script>

import InputStandard from "../Inputs/InputStandart.vue";
import InputStandardCentered from "../Inputs/InputStandartCentered.vue";
import ButtonAdd from "../Buttons/ButtonAdd.vue";
import {Users} from "../../js/Users";
import {Helpers} from "../../js/Helpers";

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
      userTypeSelected: "service",
      employeeName: "",
      employeeLastName: "",
      employeeLogin: ""
    }
  },
  methods: {
    showModal() {
      this.show = true;
      this.userTypeSelected = "service"
    },
    closeModal() {
      this.show = false;
    },
    async addUser() {
      let result = await new Users().create({
        "name": this.userName.trim(),
        "password": this.userPassword.trim(),
        "employeeName": this.employeeName.trim(),
        "employeeLastName": this.employeeLastName.trim(),
        "employeeLogin": document.getElementById("employee-login").value.trim(),
        "type": this.userTypeSelected
      })
      if (result) {
        this.$emit('userAdded')
        this.closeModal()
      } else {
        console.log("Not added")
      }
    },
    tabClick(event) {
      let items = document.getElementsByClassName("modal-tabs-selected")
      let itemsArray = [...items]

      itemsArray.map(item => {
        item.classList.remove("modal-tabs-selected")
      })

      items = document.getElementsByName("tab-content")
      itemsArray = [...items]

      itemsArray.map(item => {
        item.classList.add("modal-tab-content-hide")
      })

      event.target.classList.add("modal-tabs-selected")

      let tabName = event.target.getAttribute("data-id")
      this.userTypeSelected = event.target.getAttribute("data-type")

      document
          .getElementById(tabName)
          .classList
          .remove("modal-tab-content-hide")
    },
    translitToEng() {
      let lastName = document.getElementById("employee-last-name").value
      let name = document.getElementById("employee-name").value

      document.getElementById("employee-login").value = Helpers.rusTranslitToEng(name.substring(0, 1)) + "." + Helpers.rusTranslitToEng(lastName)
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
  -webkit-box-shadow: 0 0 36px 27px var(--background-accent-themed-rgba-first);
  -moz-box-shadow: 0 0 36px 27px var(--background-accent-themed-rgba-first);
  box-shadow: 0 0 36px 27px var(--background-accent-themed-rgba-first);
}

.modal-centered {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.modal-tabs-block {
  display: flex;
  flex-direction: row;
  padding-left: 80px;
}

.modal-tabs-block div {
  padding: 0 0 10px 0;
  margin: 0 10px 10px 10px;
  cursor: pointer;
}

.modal-tabs-block div:hover {
  font-weight: bold;
}

.modal-tabs-selected {
  border-bottom: 2px solid var(--background-accent-themed)
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

.modal-tab-content-hide {
  display: none;
}
</style>